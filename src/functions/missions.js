// FaunaDB setup
import faunadb from 'faunadb';

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
});

// Cryptr setup
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPTR_KEY);

// Project imports
import httpResponse, { HTTP_CREATED, HTTP_NO_CONTENT, HTTP_BAD_REQUEST, HTTP_METHOD_NOT_ALLOWED, HTTP_SERVER_ERROR } from './common/httpResponse';

const encryptMissionId = (missionData) => {
  const object = JSON.parse(JSON.stringify(missionData));
  return cryptr.encrypt(object.ref['@ref'].id)
}

// Function
exports.handler = async (event, context) => {
  const { body, httpMethod } = event;
  return httpResponse(event.path);

  // Parse data if needed
  let data;
  if (['POST', 'PUT'].includes(httpMethod)) {
    data = JSON.parse(body);
  }

  // Parse ID from request URL
  let id;
  const match = event.path.match(/^\/missions\/(.+)$/);
  if (match) {
    // If an ID was found, decrypt it
    try {
      id = cryptr.decrypt(match[1]);
    // If decryption failed, throw an error
    } catch(error) {
      console.log(error);
      return httpResponse({message: 'Error while decrypting mission ID', error}, HTTP_BAD_REQUEST);
    }
  // If not ID was found but method requires one, throw an error
  } else if (['PUT', 'DELETE'].includes(httpMethod)) {
    return httpResponse('No mission ID specified', HTTP_BAD_REQUEST);
  }

  let payload;
  let result;

  try {
    switch(httpMethod) {
      case 'GET':
        if (id) {
          try {
            // Get mission
            result = await client.query(q.Get(q.Ref(q.Class("missions"), id)));
          } catch(error) {
            if (error.name === 'NotFound') {
              return httpResponse('', HTTP_NO_CONTENT);
            } else {
              throw error;
            }
          }
          // Encrypt IDs of mission before sending it back
          result = {
            id: encryptMissionId(result),
            ...result.data,
          }
        } else {
          // Get refs of all missions
          result = await client.query(q.Paginate(q.Match(q.Ref("indexes/all_missions"))));
          // Get actual missions from refs
          result = await client.query(result.data.map( ref => q.Get(ref)));
          // Encrypt IDs of all missions
          result = result.map(object => {
            return {
              id: encryptMissionId(object),
              ...object.data,
            };
          });
        }
        return httpResponse(result);

      case 'POST':
        payload = { data };
        result = await client.query(q.Create(q.Ref("classes/missions"), payload));
        // Encrypt IDs of mission before sending it back
        result = {
          id: encryptMissionId(result),
          ...result.data,
        }
        return httpResponse(result, HTTP_CREATED);

      case 'PUT':
        payload = { data };
        result = await client.query(q.Update(q.Ref(`classes/missions/${id}`), payload));
        // Encrypt IDs of mission before sending it back
        result = {
          id: encryptMissionId(result),
          ...result.data,
        }
        return httpResponse(result);

      case 'DELETE':
        result = await client.query(q.Delete(q.Ref(`classes/missions/${id}`)));
        return httpResponse('', HTTP_NO_CONTENT);

      default:
        return httpResponse(`Cannot ${httpMethod} /missions`, HTTP_METHOD_NOT_ALLOWED);
    }
  } catch(error) {
    console.error(error);
    return httpResponse({message: 'Database error', error}, HTTP_SERVER_ERROR)
  }
}
