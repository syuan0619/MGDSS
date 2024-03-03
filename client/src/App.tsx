import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PatientList from "./pages/PatientList";
import Backstage from "./pages/Backstage";
import VisitPage from "./pages/VisitPage";
import UploadOCR from "./pages/UploadOCR";
import "./style/App.css";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
