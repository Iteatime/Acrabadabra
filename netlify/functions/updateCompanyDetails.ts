import { Handler } from "@netlify/functions";
import { getCompanies } from "./utils/getCollection";

export const handler: Handler = async (event, context) => {
  const company = await (
    await getCompanies()
  ).findOneAndUpdate(
    {
      ownerId: event.queryStringParameters.id,
    },
    {
      $set: {
        ...JSON.parse(event.body),
        ownerId: event.queryStringParameters.id,
      },
    },
    {
      upsert: true,
      returnDocument: "after",
    }
  );

  delete company.value._id;

  return {
    statusCode: 200,
    body: JSON.stringify(company.value),
  };
};
