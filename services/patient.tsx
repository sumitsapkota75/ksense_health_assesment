import { QueryFunctionContext } from "@tanstack/react-query";
import { API } from "./api";
import { IPatientAPIResponseData, IPatientsQueryParams } from "./types";

const PATIENTS_BASE_URL = "/patients";

export const getPatientLists = async ({ queryKey }:QueryFunctionContext<[string,number,number]>):Promise<IPatientAPIResponseData> => {
  const [, page, limit] = queryKey;
  const params: IPatientsQueryParams = { page, limit };
  const response =  await API.get<IPatientAPIResponseData>(`${PATIENTS_BASE_URL}`, { params });
  console.log("respnose:",response)
  return response.data;
};
