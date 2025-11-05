import { IPatientWithTags } from "@/services/types";

export const buildPatientPostPayload = (patients: IPatientWithTags[]) => {
  const payload = {
    high_risk_patients: [] as string[],
    fever_patients: [] as string[],
    data_quality_issues: [] as string[],
  };

  patients.forEach((patient) => {
    const id = patient.patient_id?.trim();
    if (!id) return;

    if (patient.tags.includes("High-Risk")) {
      payload.high_risk_patients.push(id);
    }
    if (patient.tags.includes("Fever")) {
      payload.fever_patients.push(id);
    }
    if (patient.tags.includes("Data Quality Issue")) {
      payload.data_quality_issues.push(id);
    }
  });

  return payload;
};
