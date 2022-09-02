import { Handler } from "@netlify/functions";
import { getCompanies, getMissions } from "./utils/getCollection";

export const handler: Handler = async (event) => {
  const data = {
    ...JSON.parse(event.body),
    creatorId: event.queryStringParameters.id,
  };
  const mission = await (await getMissions()).insertOne(data);

  return {
    statusCode: 200,
    body: JSON.stringify({
      ...data,
      id: mission.insertedId,
    }),
  };
};
