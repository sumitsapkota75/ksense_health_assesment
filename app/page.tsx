"use client";
import { ErrorDisplay } from "@/components/error";
import { columns } from "@/components/table";
import { getPatientLists } from "@/services/patient";
import getPatientScore from "@/services/patient_score";
import { useQuery } from "@tanstack/react-query";
import { Pagination, Table } from "antd";
import { useEffect, useState } from "react";
export default function Home() {
  const [patientQueryParams, setPatientQueryParams] = useState({
    page: 1,
    limit: 5,
  });

  const {
    data: patientData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [
      "patient_data",
      patientQueryParams.page,
      patientQueryParams.limit,
    ],
    queryFn: getPatientLists,
    retry: false,
  });
  console.log("patient data", patientData);

  useEffect(() => {
    getPatientScore(patientData?.data)
  }, [patientData])
  

  if (error) {
    return <ErrorDisplay error={error} refetch={refetch} />;
  }
  return (
    <div className="flex-row min-h-screen p-20 justify-center bg-zinc-50 font-sans dark:bg-black">
      <Table
        rowKey={"patient_id"}
        columns={columns}
        loading={isLoading}
        dataSource={patientData?.data}
        pagination={false}
      />
      <div className="pagination pt-5">
        <Pagination
          align="end"
          showTotal={(total) => `Total ${total} items`}
          total={patientData?.pagination?.total || 0}
          current={patientQueryParams.page}
          pageSize={patientQueryParams.limit}
          onChange={(page, pageSize) =>
            setPatientQueryParams({ page, limit: pageSize })
          }
        />
      </div>
    </div>
  );
}


