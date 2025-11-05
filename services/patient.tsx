import { buildPatientPostPayload } from "@/helpers/patient_post_utils";
import { API } from "./api";
import { IPatientAPIResponseData } from "./types";
import { IPatientWithTags } from "./types";
/**
 * Fetches all patient data from the API with retry, deduplication,
 * and cleaning of invalid or inconsistent values.
 */
export const getAllPatients = async (): Promise<IPatientAPIResponseData["data"]> => {
  const allPatients: IPatientAPIResponseData["data"] = [];
  const seenIds = new Set<string>(); // Prevent duplicates by patient_id

  let page = 1;
  const limit = 20;
  let hasNext = true;
  const maxRetries = 3;

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  while (hasNext) {
    let retries = 0;
    let success = false;

    while (!success && retries < maxRetries) {
      try {
        const response = await API.get<IPatientAPIResponseData>("/patients", {
          params: { page, limit },
        });
        const responseData = response?.data;
        const pagination = responseData?.pagination;
        const data = Array.isArray(responseData?.data) ? responseData.data : [];

        for (const patient of data) {
          const id = patient.patient_id?.trim();
          if (id && !seenIds.has(id)) {
            seenIds.add(id);
            allPatients.push({ ...patient, patient_id: id });
          }
        }

        hasNext = pagination?.hasNext ?? false;
        page += 1;
        success = true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        retries += 1;

        // Handle rate limits or temporary server errors
        if ([429, 502, 503].includes(error?.response?.status)) {
          const waitTime = retries * 1000 * 2; // Exponential backoff
          console.warn(
            `API error ${error.response.status}. Retrying in ${waitTime}ms...`
          );
          await delay(waitTime);
        } else {
          console.error("Unhandled API error:", error);
          throw new Error("Failed to fetch patient data. Please try again later.");
        }
      }
    }

    if (!success) {
      console.error(`Failed to fetch page ${page} after ${maxRetries} retries.`);
      break;
    }
  }

  console.log(`Fetched ${allPatients.length} unique patients in total.`);
  return allPatients;
};


export const submitPatientData = async (patients: IPatientWithTags[]) => {
  const payload = buildPatientPostPayload(patients);
  console.log({payload})
  const response = await API.post("/submit-assessment", payload);
  return response.data;
};
