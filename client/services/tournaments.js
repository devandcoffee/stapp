import fetch from "isomorphic-unfetch";
import { BASE_URL, COMMON_HEADERS } from "./constants";
import handleErrors from "./handleErrors";

export const getTournaments = userId =>
  fetch(`${BASE_URL}/users/${userId}/tournaments`, {
    method: "GET",
    headers: COMMON_HEADERS
  }).then(handleErrors);

export const createTournament = body =>
  fetch(`${BASE_URL}/tournaments`, {
    method: "POST",
    headers: COMMON_HEADERS,
    body: JSON.stringify(body)
  }).then(handleErrors);

export const getTournament = id =>
  fetch(`${BASE_URL}/tournaments/${id}`, {
    method: "GET",
    headers: COMMON_HEADERS
  }).then(handleErrors);

export const deleteTournament = id =>
  fetch(`${BASE_URL}/tournaments/${id}`, {
    method: "DELETE",
    headers: COMMON_HEADERS
  }).then(handleErrors);
