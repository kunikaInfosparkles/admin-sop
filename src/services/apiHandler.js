// src/services/apiHandler.js
import { useState } from "react";
import { httpService } from "./httpService";

export const useApiHandler = () => {
    const [loading, setLoading] = useState(false);

    const callApi = async ({
        method = "get",
        url,
        data = null,
        navigate = null,
        onSuccess = null,
        onError = null,
        successMsg = "",
        errorMsg = "",
        withLoading = true,
    }) => {
        if (withLoading) setLoading(true);

        try {
            let response;

            switch (method.toLowerCase()) {
                case "get":
                    response = await httpService.get(url, navigate);
                    break;
                case "post":
                    response = await httpService.post(url, data, navigate);
                    break;
                case "patch":
                    response = await httpService.patch(url, data, navigate);
                    break;
                case "delete":
                    response = await httpService.delete(url, navigate);
                    break;
                default:
                    throw new Error("Invalid HTTP method");
            }

            if (response?.success) {
                if (successMsg) showMessage(successMsg, "success");
                if (onSuccess) onSuccess(response);
            }

            return response;
        } catch (err) {
            const apiMessage =
                err?.response?.data?.message || err?.message || "Something went wrong";
            showMessage(errorMsg || apiMessage, "error");

            if (onError) onError(err);
            return null;
        } finally {
            if (withLoading) setLoading(false);
        }
    };

    return { callApi, loading };
};
