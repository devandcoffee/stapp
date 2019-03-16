import fetch from "isomorphic-unfetch";
import { BASE_URL, COMMON_HEADERS } from "./constants";
import handleErrors from "./handleErrors";

export const getTeams = tournamentId =>
  fetch(`${BASE_URL}/tournaments/${tournamentId}/teams`, {
    method: "GET",
    headers: COMMON_HEADERS
  }).then(handleErrors);

export const createTeam = body =>
  fetch(`${BASE_URL}/teams`, {
    method: "POST",
    headers: COMMON_HEADERS,
    body: JSON.stringify(body)
  }).then(handleErrors);

export const updateTeam = (id, body) =>
  fetch(`${BASE_URL}/teams/${id}`, {
    method: "PUT",
    headers: COMMON_HEADERS,
    body: JSON.stringify(body)
  }).then(handleErrors);

export const getTeam = id =>
  fetch(`${BASE_URL}/teams/${id}`, {
    method: "GET",
    headers: COMMON_HEADERS
  }).then(handleErrors);

export const deleteTeam = id =>
  fetch(`${BASE_URL}/teams/${id}`, {
    method: "DELETE",
    headers: COMMON_HEADERS
  }).then(handleErrors);
