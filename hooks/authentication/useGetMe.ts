import { User } from "@/utils/types/user"
import apiUser from "@/utils/apis/apiUser"
import { useQuery } from "@tanstack/react-query"

export const useGetMe = () => {
    return useQuery<User>({
        queryKey: ["profile"],
        queryFn: async () => apiUser.getMe(),
    });
};

