import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PatientList from "./pages/PatientList";

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
}

export default App;
