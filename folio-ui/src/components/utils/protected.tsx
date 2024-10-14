import { useGlobalSignal } from "../context/state.context";
import { User } from "../types/user.type";
import { PropsWithChildren } from "react";

type ProtectedProps = PropsWithChildren & {
  allowedRoles: User["roles"];
};
const currentUser = useGlobalSignal("user");

export default function Protected({ allowedRoles, children }: ProtectedProps) {
  if (currentUser.value === undefined) {
    return <div>Loading...</div>;
  }
  const roles = (currentUser.value as User).roles;
  const allowed = allowedRoles?.reduce((acc: boolean, value: string) => {
    if (acc || roles.includes(value)) {
      return true;
    }
    return false;
  }, false);

  if (currentUser.value === null || (allowedRoles && allowed)) {
    return <div>Permission denied</div>;
  }

  return <>{children}</>;
}
