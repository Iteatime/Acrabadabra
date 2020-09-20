import faunadb from 'faunadb';
import httpResponse, { HTTP_CREATED, HTTP_NO_CONTENT, HTTP_BAD_REQUEST, HTTP_METHOD_NOT_ALLOWED, HTTP_SERVER_ERROR } from './common/httpResponse';
import {environment} from "../environments/environment";
const Cryptr = require('cryptr');

const q = faunadb.query;
const client = new faunadb.Client({
  secret: environment.FAUNADB_SECRET
});

console.log('CIRCLECI', environment.CIRCLECI);
console.log('NETLIFY', environment.NETLIFY);

const cryptr = new Cryptr(environment.CRYPTR_KEY);

const encryptMissionId = (missionData) => {
  const object = JSON.parse(JSON.stringify(missionData));
  return cryptr.encrypt(object.ref['@ref'].id)
}

// Function
exports.handler = async (event, context) => {
  const { body, httpMethod } = event;

  // Parse data if needed
  let data;
  if (['POST', 'PUT'].includes(httpMethod)) {
    data = JSON.parse(body);
  }

  // Parse ID from request URL
  let id;
  let userId;
  let uri = event.path;
  let match;
  if (match = uri.match(/^\/\.netlify\/functions(.+)$/)) {
    uri = match[1];
  }
  match = uri.match(/^\/missions\/(.+)$/);
  if (match) {
    id = match[1];
    // If a user ID was passed, catch it
    if (match = id.match(/^user\/(.+)$/)) {
      // If method doesn't allow for a user ID, throw an error
      if (httpMethod !== 'GET') {
        return httpResponse(`Method ${httpMethod} doesn't allow for a user ID`, HTTP_BAD_REQUEST);
      }
      userId = match[1];
    } else {
      // Otherwise, it's a mission ID, decrypt it
      try {
        id = cryptr.decrypt(id);
      // If decryption failed, throw an error
      } catch(error) {
        return httpResponse({message: 'Error while decrypting mission ID', error}, HTTP_BAD_REQUEST);
      }
    }
  // If no mission ID was found but method requires one, throw an error
  } else if (['PUT', 'DELETE'].includes(httpMethod)) {
    return httpResponse('No mission ID specified', HTTP_BAD_REQUEST);
  }


  let payload;
  let result;

  try {
    switch(httpMethod) {
      case 'GET':
        // If a user ID was specified, get all missions created by that user
        if (userId) {
          try {
            // Get refs of all missions
            result = await client.query(q.Paginate(q.Match(q.Index("mission_by_missionCreator"), userId)));
          } catch(error) {
            console.error(error);
          }
          // Get actual missions from refs
          result = await client.query(result.data.map( ref => q.Get(ref)));
        // Otherwise, if a mission ID was specified, get that specific mission
        } else if (id) {
          try {
            // Get mission
            result = await client.query(q.Get(q.Ref(q.Class("missions"), id)));
          } catch(error) {
            // If no mission with the specified ID was found, return a 'no content' response instead of throwing error
            if (error.name === 'NotFound') {
              return httpResponse('', HTTP_NO_CONTENT);
            } else {
              throw error;
            }
          }
        // Otherwise, return all missions
        } else {
          // Get refs of all missions
          result = await client.query(q.Paginate(q.Match(q.Ref("indexes/all_missions"))));
          // Get actual missions from refs
          result = await client.query(result.data.map( ref => q.Get(ref)));
        }
        // Encrypt IDs of all missions
        if (Array.isArray(result)) {
          result = result.map(object => {
            return {
              id: encryptMissionId(object),
              ...object.data,
            };
          });
        } else {
          result = {
            id: encryptMissionId(result),
            ...result.data,
          }
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
