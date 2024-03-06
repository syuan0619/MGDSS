import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/loginPage/LoginPage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import PatientList from "./pages/patientListPage/PatientList";
import Backstage from "./pages/backstagePage/Backstage";
import VisitPage from "./pages/visitPage/VisitPage";
import UploadOCR from "./pages/visitPage/components/UploadOCR";
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
            </Routes>
        </BrowserRouter>
    );
}

export default App;
