import { getBPScore } from "@/helpers/bp_score";
import { IPatientListData } from "./types";
import { getTemperatureScore } from "@/helpers/temp_score";
import { getAgeScore } from "@/helpers/age_score";

const getPatientScore = (patients: IPatientListData[] | undefined) => {
  return patients?.map((patient) => {
    // calculate the risk with bp
    const bpScore = getBPScore(patient.blood_pressure)
    // calculate with temperature
    const tempScore = getTemperatureScore(patient.temperature)
    // calculate with age
    const ageScore = getAgeScore(patient.age)

    const totalRiskScore = bpScore + tempScore + ageScore;
    console.log({totalRiskScore})
    return {
      patient_id: patient.patient_id,
      totalRiskScore: totalRiskScore,
    };

  });
};

export default getPatientScore;
