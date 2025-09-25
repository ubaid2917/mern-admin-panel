import React from "react";
import { Route, Routes, Navigate } from "react-router";
import Dashboard from "./components/Dashboard";
import List from "./pages/User/List";
import AddUser from "./pages/User/Add";
// import EditUser from "./pages/User/Edit";
import PatientList from "./pages/Patient/List";
import AddPatient from "./pages/Patient/Add";
import EditPatient from "./pages/Patient/Edit";
import Catgory from "./pages/Category/List";
import AppointmentList from "./pages/Appointment/List";
import AddAppointment from "./pages/Appointment/Add";
import EditAppointment from "./pages/Appointment/Edit";


const RoutesComp = () => { 
  
  return (
    <>
      <Routes>
         
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="users">
          <Route path="list" element={<List />} />
          <Route path="add" element={<AddUser />} />
          {/* <Route path="edit/:id" element={<EditUser />} /> */}
        </Route>

        <Route path="patients">
          <Route path="list" element={<PatientList />} />
          <Route path="add" element={<AddPatient />} />
          <Route path="edit/:id" element={<EditPatient />} />
        </Route>
        <Route path="appointments">
          <Route path="list" element={<AppointmentList />} />
          <Route path="add" element={<AddAppointment />} />
          <Route path="edit/:id" element={<EditAppointment />} />
        </Route>

        <Route path="/category" element={<Catgory />} />
      </Routes>
     
    </>
  );
};

export default RoutesComp;
