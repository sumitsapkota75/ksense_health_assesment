"use client";
import { ErrorDisplay } from "@/components/error";
import { columns } from "@/components/table";
import { getAllPatients } from "@/services/patient";
import getPatientScore from "@/services/patient_score";
import { IPatientWithTags } from "@/services/types";
import { Pagination, Table } from "antd";
import { useEffect, useState } from "react";
export default function Home() {
  const [patientList, setPatientList] = useState<IPatientWithTags[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  useEffect(() => {
    const loadAllData = async () => {
      try {
        setIsLoading(true);
        const allPatients = await getAllPatients();
        const patientsWithTags = getPatientScore(allPatients);
        setPatientList(patientsWithTags);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };
    loadAllData();
  }, []);
  console.log({patientList})
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = patientList.slice(startIndex, endIndex);

  if (error) {
    return <ErrorDisplay error={error} />;
  }
  return (
    <div className="flex-row min-h-screen p-20 justify-center bg-zinc-50 font-sans dark:bg-black">
      <Table
        rowKey={"patient_id"}
        columns={columns}
        loading={isLoading}
        dataSource={paginatedData}
        pagination={false}
      />
      <div className="pagination pt-5">
        <Pagination
          align="end"
          showTotal={(total) => `Total ${total} items`}
          total={patientList?.length}
          current={currentPage}
          pageSize={pageSize}
          onChange={(page, size) => {
            setCurrentPage(page);
            setPageSize(size);
          }}
          showSizeChanger
          pageSizeOptions={["5", "10", "20"]}
        />
      </div>
    </div>
  );
}
