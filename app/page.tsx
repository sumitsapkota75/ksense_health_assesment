"use client";
import { ErrorDisplay } from "@/components/error";
import { columns } from "@/components/table";
import { getAllPatients, submitPatientData } from "@/services/patient";
import getPatientScore from "@/services/patient_score";
import { IPatientWithTags } from "@/services/types";
import { Button, message, Modal, Pagination, Table } from "antd";
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
  const handleSubmit = async () => {
    try {
      if (patientList.length === 0) {
        message.warning("No patient data available to submit.");
        return;
      }

      setIsLoading(true);
      const res = await submitPatientData(patientList);
      if (res?.success) {
      const result = res.results;
      const breakdown = result.breakdown;
      const feedback = result.feedback;

      // 🧩 Build message content dynamically
      const content = `
        🩺 Assessment Summary
        -------------------------
        ✅ Overall Score: ${result.score}/${result.score} (${result.percentage}%)
        📊 Status: ${result.status}
        🧮 Attempt: ${result.attempt_number}/${result.max_attempts}
        -------------------------
        🔹 High-Risk Patients: ${breakdown.high_risk.correct}/${breakdown.high_risk.submitted}
        🔹 Fever Patients: ${breakdown.fever.correct}/${breakdown.fever.submitted}
        🔹 Data Quality Issues: ${breakdown.data_quality.correct}/${breakdown.data_quality.submitted}
        -------------------------
        ${feedback.strengths.length > 0 ? feedback.strengths.join("\n") : ""}
      `;

      Modal.success({
        title: "🎉 Assessment Submitted Successfully!",
        content: (
          <div style={{ whiteSpace: "pre-line", marginTop: "10px" }}>
            {content}
          </div>
        ),
        okText: "Great!",
      });
    } else {
      message.warning(res?.message || "Unexpected response from server.");
    }
      
    } catch (err) {
      console.error(err);
      message.error("Failed to submit patient data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return <ErrorDisplay error={error} />;
  }
  return (
    <div className="flex-row min-h-screen p-20 justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex items-center space-x-4">
          <Button
          type="primary"
          onClick={handleSubmit}
          loading={isLoading}
          className="ml-4"
        >
          Submit Request
        </Button>
        </div>
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
