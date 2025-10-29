import apiUser from "@/utils/apis/apiUser";
import { useEffect, useState } from "react";

type PermissionMap = Record<string, boolean>;

export const usePermissions = () => {
  const [permissions, setPermissions] = useState<PermissionMap>({});
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        setLoading(true);
        const data = await apiUser.getPermissions();
        console.log("Fetched permissions:", data);

        const perms: PermissionMap = data?.permissions ?? {};
        const userRole = data?.role ?? null;

        setPermissions(perms);
        setRole(userRole);
      } catch (err) {
        console.error("Failed to load permissions:", err);
        setPermissions({});
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, []);

  const hasPermission = (perm: string): boolean => {
    return Boolean(permissions?.[perm]);
  };

  return {
    permissions,
    role,
    loading,
    hasPermission,
  };
};
