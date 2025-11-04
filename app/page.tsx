"use client";
import { columns } from "@/components/table";
import { getPatientLists } from "@/services/patient";
import { useQuery } from "@tanstack/react-query";
import { Pagination, Table } from "antd";
import { useState } from "react";
export default function Home() {
  const [patientQueryParams, setPatientQueryParams] = useState({
    page: 1,
    limit: 5,
  });

  const { data: patientData, isLoading } = useQuery({
    queryKey: [
      "patient_data",
      patientQueryParams.page,
      patientQueryParams.limit,
    ],
    queryFn: getPatientLists,
  });
  console.log("patient data", patientData);

  return (
    <div className="flex-row min-h-screen p-20 justify-center bg-zinc-50 font-sans dark:bg-black">
      <Table
        rowKey={"patient_id"}
        columns={columns}
        dataSource={patientData?.data || []}
        loading={isLoading}
        pagination={false}
      />
      <Pagination
        className="pt-10"
        align="end"
        total={patientData?.pagination?.total || 0}
        current={patientQueryParams.page}
        pageSize={patientQueryParams.limit}
        onChange={(page, pageSize) =>
          setPatientQueryParams({ page, limit: pageSize })
        }
      />
    </div>
  );
}
