import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PatientList from "./pages/PatientList";
<<<<<<< Updated upstream
import "./style/App.css"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />}></Route>
                <Route path="/register" element={<RegisterPage />}></Route>
                <Route path="/patient" element={<PatientList />}></Route>
            </Routes>
        </BrowserRouter>
    );
=======
import OCRPage from "./pages/OCRPage";
import Records from "./pages/Records";

import "./style/App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/patient" element={<PatientList />}></Route>
        <Route path="/OCR" element={<OCRPage />}></Route>
        <Route path="/records" element={<Records />}></Route>
      </Routes>
    </BrowserRouter>
  );
>>>>>>> Stashed changes
}

export default App;
