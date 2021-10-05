import { request } from "graphql-request";

export const fetcher = (query:any, variables:any) =>
  request("/api/graphql", query, variables);
