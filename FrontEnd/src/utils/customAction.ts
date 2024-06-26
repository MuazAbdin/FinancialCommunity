import { ActionFunctionArgs, redirect } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { fetcher } from "./fetcher";
import { toast } from "react-toastify";
import { HTTPError } from "./cutomErrors";

interface ICustomAcionFunctionArgs extends ActionFunctionArgs {
  url: string;
  preSubmitValidator?: (fields: any) => {
    msg: string;
    data: {
      name: string;
      value: any;
      message: string;
    }[];
  };
  specialErrors?: number[];
  successMessage?: string;
  redirectPath?: string;
  returnDataOnSuccess?: boolean;
}

export async function customAction({
  params,
  request,
  url,
  successMessage = "Submitted successfully",
  redirectPath = "",
  preSubmitValidator,
  specialErrors = [],
  returnDataOnSuccess = false,
}: ICustomAcionFunctionArgs) {
  const fd = await request.formData();
  const data = Object.fromEntries(
    [...fd.entries()].filter((entry) => entry[0] !== "submit")
  );
  // console.log(data);
  if (preSubmitValidator) {
    const preSubmitValidation = preSubmitValidator(data);
    // console.log(preSubmitValidation);
    if (preSubmitValidation.msg === "Invalid inputs")
      return preSubmitValidation;
  }

  try {
    const response = await fetcher(url, {
      method: request.method,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (specialErrors.includes(response.status)) {
        const responseData = await response.json();
        toast.error(responseData?.msg || "Something went wrong");
        return responseData;
      }
      throw new HTTPError(response);
    }

    const responseData = await response.json();
    toast.success(responseData?.msg || successMessage);
    if (returnDataOnSuccess) return responseData;
    return redirect(redirectPath);
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message);
      throw error;
    }
    console.log(error);
    return error;
  }
}
