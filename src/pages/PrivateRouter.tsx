import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "src/redux/hooks";
const Employees = lazy(() => import("./Employees"));
const Teams = lazy(() => import("./Teams"));
const DailyReport = lazy(() => import("./DailyReport"));
const Projects = lazy(() => import("./Projects"));

export default function PrivateRouter() {
  const { roleName } = useAppSelector((state) => state.auth.profile.role);
  console.log(roleName);

  return (
    <Routes>
      {roleName !== "EMPLOYEE" ? (
        <Route path="/" element={<Employees />} />
      ) : null}
      {roleName !== "EMPLOYEE" ? (
        <Route path="/teams" element={<Teams />} />
      ) : null}
      {roleName !== "EMPLOYEE" ? (
        <Route path="/reports" element={<DailyReport />} />
      ) : (
        <Route path="/" element={<DailyReport />} />
      )}
      {roleName !== "EMPLOYEE" ? (
        <Route path="/projects" element={<Projects />} />
      ) : null}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
