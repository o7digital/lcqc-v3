import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '5cb6c30bbf0bf643747ce33b885d45241d9579a1', queries,  });
export default client;
  