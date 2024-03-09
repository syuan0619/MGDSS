import { BrowserRouter, Route, Routes } from "react-router-dom";

import RegisterPage from "./pages/registerPage/RegisterPage";
import Inquiry from "./pages/inquiryPage/InquiryPage";
import PatientList from "./pages/patientListPage/PatientList";
import Backstage from "./pages/backstagePage/Backstage";
import VisitPage from "./pages/inquiryPage/needToDelete/VisitPage";
import UploadOCR from "./pages/inquiryPage/needToDelete/UploadOCR";
import LoginPage from "./pages/loginPage/LoginPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/patient" element={<PatientList />}></Route>
        <Route path="/visit" element={<VisitPage />}></Route>
        <Route path="/backstage" element={<Backstage />}></Route>
        <Route path="/upload" element={<UploadOCR />}></Route>
        <Route path="/inquiry" element={<Inquiry />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
