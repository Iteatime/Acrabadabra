import { Handler } from "@netlify/functions";
import { getCompanies } from "./utils/getCollection";

export const handler: Handler = async (event) => {
  const companies = await (
    await getCompanies()
  )
    .find({
      ownerId: event.queryStringParameters.id,
    })
    .toArray();

  companies.forEach((e) => delete e._id);

  return {
    statusCode: 200,
    body: JSON.stringify(companies),
  };
};
