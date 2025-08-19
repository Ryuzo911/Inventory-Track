import apiUser, { LoginPayload } from "@/utils/apis/apiUser"
import { useMutation } from "@tanstack/react-query"

const useLogin = () => {
    return useMutation({
        mutationFn: async (payload: LoginPayload) => apiUser.login(payload)
    });
};

export default useLogin;