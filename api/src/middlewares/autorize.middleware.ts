import { NextFunction, Request, Response } from "express";
import { routePermissions } from "../utils/routePermissions";
import { RolePermissionService } from "../services/role_permissions.service";

export async function authorize(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const rolePermissionsService = new RolePermissionService();
  try {
    const userId = req.user.id; // Assuming user ID is set in previous auth middleware
    const userRoute = req.path; // Current route

    // Fetch the required permission for the route
    const requiredPermission = routePermissions[userRoute];
    if (!requiredPermission) {
      return next(); // No specific permission required for this route, so allow access
    }

    // Fetch user role and permissions
    // const permissions: Record<string, string>[] =
    //   rolePermissionsService.getUserRolePermissions(userId);

    // // Check if user has the required permission
    // if (!permissions.includes(requiredPermission)) {
    //   return res.status(403).json({ error: "Forbidden" });
    // }

    // // Attach roles and permissions to the request object for later use if needed
    // req.user.roles = roles;
    // req.user.permissions = permissions;

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
}
