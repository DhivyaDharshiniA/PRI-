// // import React from "react";
// //
// // import {
// //   BrowserRouter,
// //   Routes,
// //   Route,
// // } from "react-router-dom";
// //
// //
// // import Home from "./pages/Home";
// // import Login from "./pages/Login";
// // import Register from "./pages/Register";
// // import StudentDashboard from "./pages/student/StudentDashboard"
// // import PlacementDashboard from "./pages/placement_cell/PlacementDashboard"
// // import ProtectedRoute from "./components/ProtectedRoute";
// // import AdminDashboard from "./pages/admin/AdminDashboard"
// //
// // import PublishAptitudeTest from "./pages/placement_cell/PublishAptitudeTest";
// // import DepartmentStatistics from "./pages/placement_cell/DepartmentStatistics";
// // import AptitudeTestList from "./pages/student/AptitudeTestList";
// // import AptitudeTestRunner from "./pages/student/AptitudeTestRunner";
// // import AptitudeTestResult from "./pages/student/AptitudeTestResult";
// //
// // import PublishCodingTest from "./pages/placement_cell/PublishCodingTest";
// // import CodingTestManage from "./pages/placement_cell/CodingTestManage";
// // import CodingTestList from "./pages/student/CodingTestList";
// // import CodingTestRunner from "./pages/student/CodingTestRunner";
// // import CodingTestResult from "./pages/student/CodingTestResult";
// //
// // import StudentSkills from "./pages/student/StudentSkills";
// // import StudentRoadmap from "./pages/student/StudentRoadmap";
// //
// // function App() {
// //
// //
// //   return (
// //
// //     <BrowserRouter>
// //
// //
// //       <Routes>
// //
// //
// //         <Route
// //           path="/"
// //           element={<Home />}
// //         />
// //
// //
// //         <Route
// //           path="/login"
// //           element={<Login />}
// //         />
// //
// //
// //         <Route
// //           path="/register"
// //           element={<Register />}
// //         />
// //
// //          <Route
// //          path="/student-dashboard"
// //          element={
// //            <ProtectedRoute allowedRoles={["STUDENT"]}>
// //              <StudentDashboard/>
// //            </ProtectedRoute>
// //          }
// //          />
// //
// //
// //          <Route
// //          path="/placement-dashboard"
// //          element={
// //            <ProtectedRoute allowedRoles={["PLACEMENT_CELL"]}>
// //              <PlacementDashboard/>
// //            </ProtectedRoute>
// //          }
// //          />
// //
// //
// //          <Route
// //          path="/admin-dashboard"
// //          element={
// //            <ProtectedRoute allowedRoles={["ADMIN"]}>
// //              <AdminDashboard/>
// //            </ProtectedRoute>
// //          }
// //          />
// //
// //          {/* Aptitude Evaluation - placement */}
// //          <Route
// //          path="/placement/aptitude-tests/publish"
// //          element={
// //            <ProtectedRoute allowedRoles={["PLACEMENT_CELL"]}>
// //              <PublishAptitudeTest/>
// //            </ProtectedRoute>
// //          }
// //          />
// //
// //          {/* Aptitude Evaluation - student */}
// //          <Route
// //          path="/student/aptitude-tests"
// //          element={
// //            <ProtectedRoute allowedRoles={["STUDENT"]}>
// //              <AptitudeTestList/>
// //            </ProtectedRoute>
// //          }
// //          />
// //
// //          <Route
// //          path="/student/aptitude-tests/:testId/take"
// //          element={
// //            <ProtectedRoute allowedRoles={["STUDENT"]}>
// //              <AptitudeTestRunner/>
// //            </ProtectedRoute>
// //          }
// //          />
// //
// //          <Route
// //          path="/student/aptitude-tests/:testId/result"
// //          element={
// //            <ProtectedRoute allowedRoles={["STUDENT"]}>
// //              <AptitudeTestResult/>
// //            </ProtectedRoute>
// //          }
// //          />
// //
// //          {/* Coding Assessment - placement */}
// //          <Route
// //          path="/placement/coding-tests/publish"
// //          element={
// //            <ProtectedRoute allowedRoles={["PLACEMENT_CELL"]}>
// //              <PublishCodingTest/>
// //            </ProtectedRoute>
// //          }
// //          />
// //
// //          <Route
// //          path="/placement/coding-tests/manage"
// //          element={
// //            <ProtectedRoute allowedRoles={["PLACEMENT_CELL"]}>
// //              <CodingTestManage/>
// //            </ProtectedRoute>
// //          }
// //          />
// // <Route
// //   path="/placement/stats"
// //   element={
// //     <ProtectedRoute allowedRoles={["PLACEMENT_CELL"]}>
// //       <DepartmentStatistics />
// //     </ProtectedRoute>
// //   }
// // />
// //          {/* Coding Assessment - student */}
// //          <Route
// //          path="/student/coding-tests"
// //          element={
// //            <ProtectedRoute allowedRoles={["STUDENT"]}>
// //              <CodingTestList/>
// //            </ProtectedRoute>
// //          }
// //          />
// //
// //          <Route
// //          path="/student/coding-tests/:testId/take"
// //          element={
// //            <ProtectedRoute allowedRoles={["STUDENT"]}>
// //              <CodingTestRunner/>
// //            </ProtectedRoute>
// //          }
// //          />
// //
// //          <Route
// //          path="/student/coding-tests/:testId/result"
// //          element={
// //            <ProtectedRoute allowedRoles={["STUDENT"]}>
// //              <CodingTestResult/>
// //            </ProtectedRoute>
// //          }
// //          />
// //
// //          {/* Student Skills */}
// //          <Route
// //            path="/student/skills"
// //            element={
// //              <ProtectedRoute allowedRoles={["STUDENT"]}>
// //                <StudentSkills />
// //              </ProtectedRoute>
// //            }
// //          />
// //
// //          {/* Student Roadmap */}
// //          <Route
// //            path="/student/roadmap"
// //            element={
// //              <ProtectedRoute allowedRoles={["STUDENT"]}>
// //                <StudentRoadmap />
// //              </ProtectedRoute>
// //            }
// //          />
// //
// //       </Routes>
// //
// //
// //     </BrowserRouter>
// //
// //   );
// //
// // }
// //
// //
// // export default App;
//
//
// import React from "react";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
// } from "react-router-dom";
//
// // General
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
//
// // Common
// import ProtectedRoute from "./components/ProtectedRoute";
//
// // Student
// import StudentDashboard from "./pages/student/StudentDashboard";
// import AptitudeTestList from "./pages/student/AptitudeTestList";
// import AptitudeTestRunner from "./pages/student/AptitudeTestRunner";
// import AptitudeTestResult from "./pages/student/AptitudeTestResult";
// import StudentExternalProfiles from "./pages/student/StudentExternalProfiles";
// // import StudentProfile from "./pages/student/StudentProfile";
//
// import CodingTestList from "./pages/student/CodingTestList";
// import CodingTestRunner from "./pages/student/CodingTestRunner";
// import CodingTestResult from "./pages/student/CodingTestResult";
//
// import StudentSkills from "./pages/student/StudentSkills";
// import StudentRoadmap from "./pages/student/StudentRoadmap";
//
// // Placement Cell
// import PlacementDashboard from "./pages/placement_cell/PlacementDashboard";
// import PublishAptitudeTest from "./pages/placement_cell/PublishAptitudeTest";
// import DepartmentStatistics from "./pages/placement_cell/DepartmentStatistics";
//
// import PublishCodingTest from "./pages/placement_cell/PublishCodingTest";
// import CodingTestManage from "./pages/placement_cell/CodingTestManage";
//
// // Admin
// import AdminDashboard from "./pages/admin/AdminDashboard";
//
// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* =====================================================
//             GENERAL
//         ===================================================== */}
//
//         <Route
//           path="/"
//           element={<Home />}
//         />
//
//         <Route
//           path="/login"
//           element={<Login />}
//         />
//
//         <Route
//           path="/register"
//           element={<Register />}
//         />
//
//         {/* =====================================================
//             STUDENT DASHBOARD
//         ===================================================== */}
//
//         <Route
//           path="/student-dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["STUDENT"]}>
//               <StudentDashboard />
//             </ProtectedRoute>
//           }
//         />
//
//         {/* =====================================================
//             STUDENT - APTITUDE
//         ===================================================== */}
//
//         <Route
//           path="/student/aptitude-tests"
//           element={
//             <ProtectedRoute allowedRoles={["STUDENT"]}>
//               <AptitudeTestList />
//             </ProtectedRoute>
//           }
//         />
//
//         <Route
//           path="/student/aptitude-tests/:testId/take"
//           element={
//             <ProtectedRoute allowedRoles={["STUDENT"]}>
//               <AptitudeTestRunner />
//             </ProtectedRoute>
//           }
//         />
//
//         <Route
//           path="/student/aptitude-tests/:testId/result"
//           element={
//             <ProtectedRoute allowedRoles={["STUDENT"]}>
//               <AptitudeTestResult />
//             </ProtectedRoute>
//           }
//         />
//
//         {/* =====================================================
//             STUDENT - CODING
//         ===================================================== */}
//
//         <Route
//           path="/student/coding-tests"
//           element={
//             <ProtectedRoute allowedRoles={["STUDENT"]}>
//               <CodingTestList />
//             </ProtectedRoute>
//           }
//         />
//
//         <Route
//           path="/student/coding-tests/:testId/take"
//           element={
//             <ProtectedRoute allowedRoles={["STUDENT"]}>
//               <CodingTestRunner />
//             </ProtectedRoute>
//           }
//         />
//
//         <Route
//           path="/student/coding-tests/:testId/result"
//           element={
//             <ProtectedRoute allowedRoles={["STUDENT"]}>
//               <CodingTestResult />
//             </ProtectedRoute>
//           }
//         />
//
//         {/* =====================================================
//             STUDENT - SKILLS
//         ===================================================== */}
//
//         <Route
//           path="/student/skills"
//           element={
//             <ProtectedRoute allowedRoles={["STUDENT"]}>
//               <StudentSkills />
//             </ProtectedRoute>
//           }
//         />
//
//
// <Route
//   path="/student/external-profiles"
//   element={<StudentExternalProfiles />}
// />
//
// {/* <Route */}
// {/*   path="/student/profile" */}
// {/*   element={<StudentProfile />} */}
// {/* /> */}
//         {/* =====================================================
//             STUDENT - ROADMAP
//         ===================================================== */}
//
//         <Route
//           path="/student/roadmap"
//           element={
//             <ProtectedRoute allowedRoles={["STUDENT"]}>
//               <StudentRoadmap />
//             </ProtectedRoute>
//           }
//         />
//
//         {/* =====================================================
//             PLACEMENT DASHBOARD
//         ===================================================== */}
//
//         <Route
//           path="/placement-dashboard"
//           element={
//             <ProtectedRoute
//               allowedRoles={["PLACEMENT_CELL"]}
//             >
//               <PlacementDashboard />
//             </ProtectedRoute>
//           }
//         />
//
//         {/* =====================================================
//             PLACEMENT - APTITUDE
//         ===================================================== */}
//
//         <Route
//           path="/placement/aptitude-tests/publish"
//           element={
//             <ProtectedRoute
//               allowedRoles={["PLACEMENT_CELL"]}
//             >
//               <PublishAptitudeTest />
//             </ProtectedRoute>
//           }
//         />
//
//         {/* =====================================================
//             PLACEMENT - CODING
//         ===================================================== */}
//
//         <Route
//           path="/placement/coding-tests/publish"
//           element={
//             <ProtectedRoute
//               allowedRoles={["PLACEMENT_CELL"]}
//             >
//               <PublishCodingTest />
//             </ProtectedRoute>
//           }
//         />
//
//         <Route
//           path="/placement/coding-tests/manage"
//           element={
//             <ProtectedRoute
//               allowedRoles={["PLACEMENT_CELL"]}
//             >
//               <CodingTestManage />
//             </ProtectedRoute>
//           }
//         />
//
//         {/* =====================================================
//             PLACEMENT - STATISTICS
//         ===================================================== */}
//
//         <Route
//           path="/placement/stats"
//           element={
//             <ProtectedRoute
//               allowedRoles={["PLACEMENT_CELL"]}
//             >
//               <DepartmentStatistics />
//             </ProtectedRoute>
//           }
//         />
//
//         {/* =====================================================
//             ADMIN
//         ===================================================== */}
//
//         <Route
//           path="/admin-dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["ADMIN"]}>
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }
//
// export default App;
//
// import React from "react";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
// } from "react-router-dom";
//
// // General
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
//
// // Common
// import ProtectedRoute from "./components/ProtectedRoute";
//
// // Student
// import StudentDashboard from "./pages/student/StudentDashboard";
// import AptitudeTestList from "./pages/student/AptitudeTestList";
// import AptitudeTestRunner from "./pages/student/AptitudeTestRunner";
// import AptitudeTestResult from "./pages/student/AptitudeTestResult";
//
// import CodingTestList from "./pages/student/CodingTestList";
// import CodingTestRunner from "./pages/student/CodingTestRunner";
// import CodingTestResult from "./pages/student/CodingTestResult";
//
// import StudentSkills from "./pages/student/StudentSkills";
// import StudentRoadmap from "./pages/student/StudentRoadmap";
// import StudentExternalProfiles from "./pages/student/StudentExternalProfiles";
//
// // Placement
// import PlacementDashboard from "./pages/placement_cell/PlacementDashboard";
// import PublishAptitudeTest from "./pages/placement_cell/PublishAptitudeTest";
// import PublishCodingTest from "./pages/placement_cell/PublishCodingTest";
// import CodingTestManage from "./pages/placement_cell/CodingTestManage";
// import DepartmentStatistics from "./pages/placement_cell/DepartmentStatistics";
//
// // Admin
// import AdminDashboard from "./pages/admin/AdminDashboard";
//
// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//
//         {/* GENERAL */}
//
//         <Route
//           path="/"
//           element={<Home />}
//         />
//
//         <Route
//           path="/login"
//           element={<Login />}
//         />
//
//         <Route
//           path="/register"
//           element={<Register />}
//         />
//
//
//         {/* STUDENT DASHBOARD */}
//
//         <Route
//           path="/student-dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["STUDENT"]}>
//               <StudentDashboard />
//             </ProtectedRoute>
//           }
//         />
//
//
//         {/* STUDENT APTITUDE */}
//
//         <Route
//           path="/student/aptitude-tests"
//           element={
//             <ProtectedRoute allowedRoles={["STUDENT"]}>
//               <AptitudeTestList />
//             </ProtectedRoute>
//           }
//         />
//
//         <Route
//           path="/student/aptitude-tests/:testId/take"
//           element={
//             <ProtectedRoute allowedRoles={["STUDENT"]}>
//               <AptitudeTestRunner />
//             </ProtectedRoute>
//           }
//         />
//
//         <Route
//           path="/student/aptitude-tests/:testId/result"
//           element={
//             <ProtectedRoute allowedRoles={["STUDENT"]}>
//               <AptitudeTestResult />
//             </ProtectedRoute>
//           }
//         />
//
//
//         {/* STUDENT CODING */}
//
//         <Route
//           path="/student/coding-tests"
//           element={
//             <ProtectedRoute allowedRoles={["STUDENT"]}>
//               <CodingTestList />
//             </ProtectedRoute>
//           }
//         />
//
//         <Route
//           path="/student/coding-tests/:testId/take"
//           element={
//             <ProtectedRoute allowedRoles={["STUDENT"]}>
//               <CodingTestRunner />
//             </ProtectedRoute>
//           }
//         />
//
//         <Route
//           path="/student/coding-tests/:testId/result"
//           element={
//             <ProtectedRoute allowedRoles={["STUDENT"]}>
//               <CodingTestResult />
//             </ProtectedRoute>
//           }
//         />
//
//
//         {/* STUDENT SKILLS */}
//
//         <Route
//           path="/student/skills"
//           element={
//             <ProtectedRoute allowedRoles={["STUDENT"]}>
//               <StudentSkills />
//             </ProtectedRoute>
//           }
//         />
//
//
//         {/* STUDENT CODING PROFILES */}
//
//         <Route
//           path="/student/external-profiles"
//           element={
//             <ProtectedRoute allowedRoles={["STUDENT"]}>
//               <StudentExternalProfiles />
//             </ProtectedRoute>
//           }
//         />
//
//
//         {/* STUDENT ROADMAP */}
//
//         <Route
//           path="/student/roadmap"
//           element={
//             <ProtectedRoute allowedRoles={["STUDENT"]}>
//               <StudentRoadmap />
//             </ProtectedRoute>
//           }
//         />
//
//
//         {/* PLACEMENT DASHBOARD */}
//
//         <Route
//           path="/placement-dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["PLACEMENT_CELL"]}>
//               <PlacementDashboard />
//             </ProtectedRoute>
//           }
//         />
//
//
//         {/* PLACEMENT APTITUDE */}
//
//         <Route
//           path="/placement/aptitude-tests/publish"
//           element={
//             <ProtectedRoute allowedRoles={["PLACEMENT_CELL"]}>
//               <PublishAptitudeTest />
//             </ProtectedRoute>
//           }
//         />
//
//
//         {/* PLACEMENT CODING */}
//
//         <Route
//           path="/placement/coding-tests/publish"
//           element={
//             <ProtectedRoute allowedRoles={["PLACEMENT_CELL"]}>
//               <PublishCodingTest />
//             </ProtectedRoute>
//           }
//         />
//
//
//
//         <Route
//           path="/placement/coding-tests/manage"
//           element={
//             <ProtectedRoute allowedRoles={["PLACEMENT_CELL"]}>
//               <CodingTestManage />
//             </ProtectedRoute>
//           }
//         />
//
//
//         {/* PLACEMENT STATISTICS */}
//
//         <Route
//           path="/placement/stats"
//           element={
//             <ProtectedRoute allowedRoles={["PLACEMENT_CELL"]}>
//               <DepartmentStatistics />
//             </ProtectedRoute>
//           }
//         />
//
//
//         {/* ADMIN */}
//
//         <Route
//           path="/admin-dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["ADMIN"]}>
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />
//
//       </Routes>
//     </BrowserRouter>
//   );
// }
//
// export default App;


import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// ============================================================
// GENERAL
// ============================================================

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// ============================================================
// COMMON
// ============================================================

import ProtectedRoute from "./components/ProtectedRoute";

// ============================================================
// STUDENT
// ============================================================

import StudentDashboard from "./pages/student/StudentDashboard";
import AptitudeTestList from "./pages/student/AptitudeTestList";
import AptitudeTestRunner from "./pages/student/AptitudeTestRunner";
import AptitudeTestResult from "./pages/student/AptitudeTestResult";

import CodingTestList from "./pages/student/CodingTestList";
import CodingTestRunner from "./pages/student/CodingTestRunner";
import CodingTestResult from "./pages/student/CodingTestResult";

import StudentSkills from "./pages/student/StudentSkills";
import StudentRoadmap from "./pages/student/StudentRoadmap";
import StudentExternalProfiles from "./pages/student/StudentExternalProfiles";
import StudentProfile from "./pages/student/StudentProfile";

// ============================================================
// PLACEMENT CELL
// ============================================================

import PlacementDashboard from "./pages/placement_cell/PlacementDashboard";
import PublishAptitudeTest from "./pages/placement_cell/PublishAptitudeTest";
import PublishCodingTest from "./pages/placement_cell/PublishCodingTest";
import CodingTestManage from "./pages/placement_cell/CodingTestManage";
import DepartmentStatistics from "./pages/placement_cell/DepartmentStatistics";
import Reports from "./pages/placement_cell/Reports";

// ============================================================
// ADMIN
// ============================================================

import AdminDashboard from "./pages/admin/AdminDashboard";

// ============================================================
// APP
// ============================================================

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ======================================================
            GENERAL
        ====================================================== */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* ======================================================
            STUDENT
        ====================================================== */}

        {/* Student Dashboard */}

        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />


        {/* Student Profile */}

        <Route
          path="/student/profile"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <StudentProfile />
            </ProtectedRoute>
          }
        />


        {/* Student Aptitude Tests */}

        <Route
          path="/student/aptitude-tests"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <AptitudeTestList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/aptitude-tests/:testId/take"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <AptitudeTestRunner />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/aptitude-tests/:testId/result"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <AptitudeTestResult />
            </ProtectedRoute>
          }
        />


        {/* Student Coding Tests */}

        <Route
          path="/student/coding-tests"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <CodingTestList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/coding-tests/:testId/take"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <CodingTestRunner />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/coding-tests/:testId/result"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <CodingTestResult />
            </ProtectedRoute>
          }
        />


        {/* Student Skills */}

        <Route
          path="/student/skills"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <StudentSkills />
            </ProtectedRoute>
          }
        />


        {/* Student External Profiles */}

        <Route
          path="/student/external-profiles"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <StudentExternalProfiles />
            </ProtectedRoute>
          }
        />


        {/* Student Roadmap */}

        <Route
          path="/student/roadmap"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <StudentRoadmap />
            </ProtectedRoute>
          }
        />


        {/* ======================================================
            PLACEMENT CELL
        ====================================================== */}

        {/* Placement Dashboard */}

        <Route
          path="/placement-dashboard"
          element={
            <ProtectedRoute allowedRoles={["PLACEMENT_CELL"]}>
              <PlacementDashboard />
            </ProtectedRoute>
          }
        />


        {/* Publish Aptitude Test */}

        <Route
          path="/placement/aptitude-tests/publish"
          element={
            <ProtectedRoute allowedRoles={["PLACEMENT_CELL"]}>
              <PublishAptitudeTest />
            </ProtectedRoute>
          }
        />


        {/* Publish Coding Test */}

        <Route
          path="/placement/coding-tests/publish"
          element={
            <ProtectedRoute allowedRoles={["PLACEMENT_CELL"]}>
              <PublishCodingTest />
            </ProtectedRoute>
          }
        />


        {/* Coding Test Manage
            - All Tests
            - Pending Violations
            - Publish / Hide Marks
            - View Details
        */}

        <Route
          path="/placement/coding-tests/manage"
          element={
            <ProtectedRoute allowedRoles={["PLACEMENT_CELL"]}>
              <CodingTestManage />
            </ProtectedRoute>
          }
        />


        {/* Department Statistics */}

        <Route
          path="/placement/stats"
          element={
            <ProtectedRoute allowedRoles={["PLACEMENT_CELL"]}>
              <DepartmentStatistics />
            </ProtectedRoute>
          }
        />


        {/* Placement Reports */}

        <Route
          path="/placement/reports"
          element={
            <ProtectedRoute allowedRoles={["PLACEMENT_CELL"]}>
              <Reports />
            </ProtectedRoute>
          }
        />


        {/* ======================================================
            ADMIN
        ====================================================== */}

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
