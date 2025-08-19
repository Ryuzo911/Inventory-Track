import apiUser, { RegisterPayload } from "@/utils/apis/apiUser"
import { useMutation } from "@tanstack/react-query"

const useRegister = () => {
    return useMutation({
        mutationFn: async (payload: RegisterPayload) => apiUser.register(payload)
    })
}

export default useRegister;