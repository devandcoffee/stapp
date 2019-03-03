import fetch from "isomorphic-unfetch";

import { BASE_URL, COMMON_HEADERS } from "./constants";
import handleErrors from "./handleErrors";

export const login = body =>
  fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: COMMON_HEADERS,
    body: JSON.stringify(body)
  }).then(handleErrors);
