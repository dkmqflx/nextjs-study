import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.SANITY_PROEJCT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: "2024-03-16", // use current date (YYYY-MM-DD) to target the latest API version
  token: process.env.SANITY_SECRET_TOKEN, // Only if you want to update content with the client
});
