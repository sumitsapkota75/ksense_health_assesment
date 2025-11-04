export interface IPatientListData {
  patient_id?: string;
  name?: string;
  age?: number;
  gender?: "M" | "F" | string;
  blood_pressure?: string;
  temperature?: number | string;
  diagnosis?: string;
  medications?: string;
  visit_date?: string;
}

export interface IMetaData {
  requestId?: string;
  timestamp?: string;
  version?: string;
}

export interface IPagination {
  hasNext: boolean;
  hasPrevious: boolean;
  limit?: number;
  page?: number;
  total: number;
  totalPages: number;
}

export interface IPatientsQueryParams {
  page?: string | number;
  limit?: string | number;
}

export interface IPatientAPIResponseData {
  pagination: IPagination;
  data: IPatientListData[];
  metadata: IMetaData;
}


export interface IErrorDisplayProps {
  error: unknown;
  refetch: () => void;
}