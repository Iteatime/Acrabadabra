import { Handler } from "@netlify/functions";
import { getMissions } from "./utils/getCollection";

export const handler: Handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      await (
        await getMissions()
      )
        .find({
          creatorId: event.queryStringParameters.id,
        })
        .toArray()
    ),
  };
};
