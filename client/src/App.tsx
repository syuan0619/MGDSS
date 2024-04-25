import { BrowserRouter, Route, Routes } from "react-router-dom";

import RegisterPage from "./pages/registerPage/RegisterPage";
import Inquiry from "./pages/inquiryPage/InquiryPage";
import PatientList from "./pages/patientListPage/PatientList";
import Backstage from "./pages/backstagePage/Backstage";
import LoginPage from "./pages/loginPage/LoginPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/patient" element={<PatientList />}></Route>
        <Route path="/backstage" element={<Backstage />}></Route>
        <Route path="/inquiry/:id/:selectedDate" element={<Inquiry />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
