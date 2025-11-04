import { IErrorDisplayProps } from "@/services/types";
import { Alert, Button } from "antd";
import { AxiosError, isAxiosError } from "axios";

// This function checks the error and generates the custom message
const getErrorMessage = (error: unknown): string => {
  // 1. Check if it's an Axios error (for network/HTTP status issues)
  if (isAxiosError(error)) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      const status = axiosError.response.status;
      switch (status) {
        case 429:
          return "Too many requests. Please wait a moment and try again. (Error 429)";
        case 502:
          return "The server is currently unavailable (Bad Gateway). Please try again. (Error 502)";
        case 503:
          return "The service is temporarily overloaded (Service Unavailable). Please try again. (Error 503)";
        default:
          return `An error occurred: ${axiosError.response.statusText} (Error ${status})`;
      }
    } else if (axiosError.request) {
      return "Network error: The server could not be reached. Please check your connection.";
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred. Please try again.";
};



export const ErrorDisplay = ({ error }: IErrorDisplayProps) => {
  const errorMessage = getErrorMessage(error);

  return (
    <div className="flex-row min-h-screen p-20 justify-center bg-zinc-50 font-sans dark:bg-black">
      <Alert
        message="Error Fetching Data"
        description={errorMessage}
        type="error"
        showIcon
        action={
          <Button size="small" danger onClick={()=>{}}>
            Retry
          </Button>
        }
      />
    </div>
  );
};