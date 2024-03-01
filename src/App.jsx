import { Box, Divider } from "@mui/material";
import { useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import styles from "./App.module.css";
import ProtectedRoute from "./components/common/guards/ProtectedRoute";
import Header from "./components/common/header/Header";
import Loader from "./components/common/loader/Loader";
import Sidebar from "./components/common/sidebar/Sidebar";
import AdminDashboard from "./components/pages/admin/dashboard/AdminDashboard";
import AllExams from "./components/pages/admin/exams/AllExams";
import AdminLogin from "./components/pages/admin/login/AdminLogin";
import Settings from "./components/pages/admin/settings/Settings";
import AllUsers from "./components/pages/admin/users/AllUsers";
import RouteError from "./components/pages/error/RouteError";
import Home from "./components/pages/home/Home";
import StudentDashboard from "./components/pages/student/dashboard/StudentDashboard";
import StudentEnrollment from "./components/pages/student/enrollment/StudentEnrollment";
import ExamWindow from "./components/pages/student/exams/ExamWindow";
import StudentLogin from "./components/pages/student/login/StudentLogin";
import StudentSignup from "./components/pages/student/signup/StudentSignup";
import TeacherDashboard from "./components/pages/teacher/dashboard/TeacherDashboard";
import AddExam from "./components/pages/teacher/exams/AddExam";
import EnrollStudents from "./components/pages/teacher/exams/EnrollStudents";
import Questions from "./components/pages/teacher/exams/Questions";
import TeacherExams from "./components/pages/teacher/exams/TeacherExams";
import TeacherLogin from "./components/pages/teacher/login/TeacherLogin";
import TeacherSingup from "./components/pages/teacher/signup/TeacherSingup";
import AppContext from "./store/AppContext";
import StudentEmailVerification from "./components/pages/student/verification/StudentEmailVerification";
import TeacherEmailVerification from "./components/pages/teacher/verification/TeacherEmailVerification";
import EditExam from "./components/pages/teacher/exams/EditExam";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="student">
      <Route path="login" element={<StudentLogin />} />
      <Route path="signup" element={<StudentSignup />} />
      <Route path="enroll/:enrollmentId" element={<StudentEnrollment />} />
      <Route path="verify/:email" element={<StudentEmailVerification />} />
      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="exams/:examId/window"
        element={
          <ProtectedRoute>
            <ExamWindow />
          </ProtectedRoute>
        }
      />
    </Route>
    <Route path="teacher">
      <Route path="signup" element={<TeacherSingup />} />
      <Route path="login" element={<TeacherLogin />} />
      <Route path="verify/:email" element={<TeacherEmailVerification />} />
      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="exams"
        element={
          <ProtectedRoute>
            <TeacherExams />
          </ProtectedRoute>
        }
      />
      <Route
        path="exams/add"
        element={
          <ProtectedRoute>
            <AddExam />
          </ProtectedRoute>
        }
      />
      <Route
        path="exams/:examId/edit"
        element={
          <ProtectedRoute>
            <EditExam />
          </ProtectedRoute>
        }
      />
      <Route
        path="exams/:examId/questions"
        element={
          <ProtectedRoute>
            <Questions />
          </ProtectedRoute>
        }
      />
      <Route
        path="exams/:examId/enroll"
        element={
          <ProtectedRoute>
            <EnrollStudents />
          </ProtectedRoute>
        }
      />
    </Route>
    <Route path="admin">
      <Route path="login" element={<AdminLogin />} />
      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="exams"
        element={
          <ProtectedRoute>
            <AllExams />
          </ProtectedRoute>
        }
      />
      <Route
        path="users"
        element={
          <ProtectedRoute>
            <AllUsers />
          </ProtectedRoute>
        }
      />
      <Route
        path="settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
    </Route>
    <Route path="*" element={<RouteError />} />
  </Routes>
);

function App() {
  const { loggedIn, isLoading } = useContext(AppContext);
  const location = useLocation();
  if (location.pathname.match(/^\/student\/enroll\/(.+)$/)) {
    return (
      <>
        <Loader isLoading={isLoading} />
        <Box sx={{ padding: "1rem" }}>
          <AppRoutes />
        </Box>
      </>
    );
  }
  return (
    <Box
      sx={{
        display: `${loggedIn ? "flex" : "block"}`,
        height: "100vh",
      }}
    >
      <Loader isLoading={isLoading} />
      {loggedIn && <Sidebar />}
      <div className={styles["container"]}>
        {loggedIn && (
          <>
            <Header />
            <Divider />
          </>
        )}
        <Box sx={{ padding: "1rem" }}>
          <AppRoutes />
        </Box>
      </div>
    </Box>
  );
}

export default App;
