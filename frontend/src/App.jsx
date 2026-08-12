import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/student/StudentDashboard"
import PlacementDashboard from "./pages/placement_cell/PlacementDashboard"
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard"

import PublishAptitudeTest from "./pages/placement_cell/PublishAptitudeTest";
import DepartmentStatistics from "./pages/placement_cell/DepartmentStatistics";
import AptitudeTestList from "./pages/student/AptitudeTestList";
import AptitudeTestRunner from "./pages/student/AptitudeTestRunner";
import AptitudeTestResult from "./pages/student/AptitudeTestResult";

import PublishCodingTest from "./pages/placement_cell/PublishCodingTest";
import CodingTestManage from "./pages/placement_cell/CodingTestManage";
import CodingTestList from "./pages/student/CodingTestList";
import CodingTestRunner from "./pages/student/CodingTestRunner";
import CodingTestResult from "./pages/student/CodingTestResult";

import StudentSkills from "./pages/student/StudentSkills";
import StudentRoadmap from "./pages/student/StudentRoadmap";

function App() {


  return (

    <BrowserRouter>


      <Routes>


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

         <Route
         path="/student-dashboard"
         element={
           <ProtectedRoute allowedRoles={["STUDENT"]}>
             <StudentDashboard/>
           </ProtectedRoute>
         }
         />


         <Route
         path="/placement-dashboard"
         element={
           <ProtectedRoute allowedRoles={["PLACEMENT_CELL"]}>
             <PlacementDashboard/>
           </ProtectedRoute>
         }
         />


         <Route
         path="/admin-dashboard"
         element={
           <ProtectedRoute allowedRoles={["ADMIN"]}>
             <AdminDashboard/>
           </ProtectedRoute>
         }
         />

         {/* Aptitude Evaluation - placement */}
         <Route
         path="/placement/aptitude-tests/publish"
         element={
           <ProtectedRoute allowedRoles={["PLACEMENT_CELL"]}>
             <PublishAptitudeTest/>
           </ProtectedRoute>
         }
         />

         {/* Aptitude Evaluation - student */}
         <Route
         path="/student/aptitude-tests"
         element={
           <ProtectedRoute allowedRoles={["STUDENT"]}>
             <AptitudeTestList/>
           </ProtectedRoute>
         }
         />

         <Route
         path="/student/aptitude-tests/:testId/take"
         element={
           <ProtectedRoute allowedRoles={["STUDENT"]}>
             <AptitudeTestRunner/>
           </ProtectedRoute>
         }
         />

         <Route
         path="/student/aptitude-tests/:testId/result"
         element={
           <ProtectedRoute allowedRoles={["STUDENT"]}>
             <AptitudeTestResult/>
           </ProtectedRoute>
         }
         />

         {/* Coding Assessment - placement */}
         <Route
         path="/placement/coding-tests/publish"
         element={
           <ProtectedRoute allowedRoles={["PLACEMENT_CELL"]}>
             <PublishCodingTest/>
           </ProtectedRoute>
         }
         />

         <Route
         path="/placement/coding-tests/manage"
         element={
           <ProtectedRoute allowedRoles={["PLACEMENT_CELL"]}>
             <CodingTestManage/>
           </ProtectedRoute>
         }
         />
<Route
  path="/placement/stats"
  element={
    <ProtectedRoute allowedRoles={["PLACEMENT_CELL"]}>
      <DepartmentStatistics />
    </ProtectedRoute>
  }
/>
         {/* Coding Assessment - student */}
         <Route
         path="/student/coding-tests"
         element={
           <ProtectedRoute allowedRoles={["STUDENT"]}>
             <CodingTestList/>
           </ProtectedRoute>
         }
         />

         <Route
         path="/student/coding-tests/:testId/take"
         element={
           <ProtectedRoute allowedRoles={["STUDENT"]}>
             <CodingTestRunner/>
           </ProtectedRoute>
         }
         />

         <Route
         path="/student/coding-tests/:testId/result"
         element={
           <ProtectedRoute allowedRoles={["STUDENT"]}>
             <CodingTestResult/>
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

         {/* Student Roadmap */}
         <Route
           path="/student/roadmap"
           element={
             <ProtectedRoute allowedRoles={["STUDENT"]}>
               <StudentRoadmap />
             </ProtectedRoute>
           }
         />

      </Routes>


    </BrowserRouter>

  );

}


export default App;