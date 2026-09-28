// import { Navigate } from "react-router-dom";
//
// const ROLE_HOME = {
//   STUDENT: "/student-dashboard",
//   PLACEMENT_CELL: "/placement-dashboard",
//   ADMIN: "/admin-dashboard",
// };
//
// export default function ProtectedRoute({ allowedRoles, children }) {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");
//
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }
//
//   if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(role)) {
//     return <Navigate to={ROLE_HOME[role] || "/login"} replace />;
//   }
//
//   return children;
// }

import React from "react";
import { Navigate } from "react-router-dom";

const ROLE_HOME = {
  STUDENT: "/student-dashboard",
  PLACEMENT_CELL: "/placement-dashboard",
  ADMIN: "/admin-dashboard",
};

export default function ProtectedRoute({
  allowedRoles,
  children,
}) {
  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("jwtToken") ||
    localStorage.getItem("accessToken");

  const storedRole =
    localStorage.getItem("role");

  const role =
    storedRole
      ? storedRole.trim().toUpperCase()
      : "";

  console.log(
    "ProtectedRoute:",
    {
      tokenExists: !!token,
      storedRole,
      normalizedRole: role,
      allowedRoles,
    }
  );

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (
    allowedRoles &&
    allowedRoles.length > 0 &&
    !allowedRoles.includes(role)
  ) {
    return (
      <Navigate
        to={
          ROLE_HOME[role] ||
          "/login"
        }
        replace
      />
    );
  }

  return children;
}