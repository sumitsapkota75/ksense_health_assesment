import { getBPScore } from "@/helpers/bp_score";
import { IPatientListData, IPatientWithTags } from "./types";
import { getTemperatureScore } from "@/helpers/temp_score";
import { getAgeScore } from "@/helpers/age_score";
import { isValidBP } from "@/helpers/bp_utils";
import { isValidTemp } from "@/helpers/temp_utils";
import { isValidAge } from "@/helpers/age_utils";

const getPatientScore = (patients: IPatientListData[] | undefined):IPatientWithTags[]  => {
  if (!patients || patients.length === 0) return [];
  return patients?.map((patient) => {
    const tags: string[] = [];
    const hasInvalidBP = !isValidBP(patient.blood_pressure);
    const hasInvalidTemp = !isValidTemp(patient.temperature)
    const hasInvalidAge = !isValidAge(patient.age)
    if (hasInvalidBP || hasInvalidTemp || hasInvalidAge) {
      tags.push("Data Quality Issue");
    }
    // calculate the risk with bp
    const bpScore = getBPScore(patient.blood_pressure)
    // calculate with temperature
    const tempScore = getTemperatureScore(patient.temperature)
    // calculate with age
    const ageScore = getAgeScore(patient.age)

    const totalRiskScore = bpScore + tempScore + ageScore;

    if (totalRiskScore >= 4) {
      tags.push("High-Risk");
    }
    const tempNumber = Number(patient.temperature);
    if (!isNaN(tempNumber) && tempNumber >= 99.6) {
      tags.push("Fever");
    }
    return {
      ...patient,
      tags,
    };

  });
};

export default getPatientScore;
