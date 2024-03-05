import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "src/redux/hooks";
const Employees = lazy(() => import("./Employees"));
const Teams = lazy(() => import("./Teams"));
const DailyReport = lazy(() => import("./DailyReport"));
const Projects = lazy(() => import("./Projects"));

export default function PrivateRouter() {
  const role = useAppSelector((state) => state.auth.profile.role.roleName);
  console.log(role);

  return (
    <Routes>
      {role !== "EMPLOYEE" ? (
        <Route path="/" element={<Employees />} />
      ) : null}
      {role !== "EMPLOYEE" ? (
        <Route path="/teams" element={<Teams />} />
      ) : null}
      {role !== "EMPLOYEE" ? (
        <Route path="/reports" element={<DailyReport />} />
      ) : (
        <Route path="/" element={<DailyReport />} />
      )}
      {role !== "EMPLOYEE" ? (
        <Route path="/projects" element={<Projects />} />
      ) : null}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
