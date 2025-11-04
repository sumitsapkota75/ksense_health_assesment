// Columns definition
export const columns = [
  {
    title: "Patient ID",
    dataIndex: "patient_id",
    key: "patient_id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Blood Pressure",
    dataIndex: "blood_pressure",
    key: "blood_pressure",
  },
  {
    title: "Temperature",
    dataIndex: "temperature",
    key: "temperature",
  },
  {
    title: "Visit Date",
    dataIndex: "visit_date",
    key: "visit_date",
  },
  {
    title: "Diagnosis",
    dataIndex: "diagnosis",
    key: "diagnosis",
  },
  {
    title: "Medications",
    dataIndex: "medications",
    key: "medications",
  },
  {
      title: "Status",
      dataIndex: "tags",
      render: (tags: string[]) =>
        tags?.map((tag) => (
          <span
            key={tag}
            className={`px-2 py-1 mr-2 rounded text-white ${
              tag === "High-Risk"
                ? "bg-red-500"
                : tag === "Fever"
                ? "bg-orange-400"
                : "bg-gray-500"
            }`}
          >
            {tag}
          </span>
        )),
    },
];
