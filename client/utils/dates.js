import { format } from "date-fns";
import { INPUT_DATE } from "../constants/dates";

export const getISOString = s => {
  const d = new Date(s);
  return d.toISOString();
};

export const getDateString = isoString =>
  format(new Date(isoString), INPUT_DATE);
