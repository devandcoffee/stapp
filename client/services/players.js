import fetch from "isomorphic-unfetch";
import { BASE_URL, COMMON_HEADERS } from "./constants";
import handleErrors from "./handleErrors";

export const getPlayers = teamId =>
  fetch(`${BASE_URL}/teams/${teamId}/players`, {
    method: "GET",
    headers: COMMON_HEADERS
  }).then(handleErrors);

export const createPlayer = body =>
  fetch(`${BASE_URL}/players`, {
    method: "POST",
    headers: COMMON_HEADERS,
    body: JSON.stringify(body)
  }).then(handleErrors);

export const updatePlayer = (id, body) =>
  fetch(`${BASE_URL}/players/${id}`, {
    method: "PUT",
    headers: COMMON_HEADERS,
    body: JSON.stringify(body)
  }).then(handleErrors);

export const getPlayer = id =>
  fetch(`${BASE_URL}/players/${id}`, {
    method: "GET",
    headers: COMMON_HEADERS
  }).then(handleErrors);

export const deletePlayer = id =>
  fetch(`${BASE_URL}/players/${id}`, {
    method: "DELETE",
    headers: COMMON_HEADERS
  }).then(handleErrors);
