import "./inquiryPage.css";
import { Patient } from "../../types/Patient";
import Menu from "./components/Menu";
import Left from "./components/Left";
import Right from "./components/Right";
import ADL from "./table/ADL";
import BloodTest from "./table/BloodTest";
import EMG from "./table/EMG";
import MG from "./table/MG";
import QMG from "./table/QMG";
import QOL from "./table/QOL";
import Thymus from "./table/Thymus";
import Visit from "./table/Visit";
import { QOLChart } from "./chart/QOL";
import { QMGChart } from "./chart/QMG";
import { MGChart } from "./chart/MG";
import { ADLChart } from "./chart/ADL";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import { VisitChart } from "./chart/Visit";
import { ThymusChart } from "./chart/Thymus";
import { BloodTestChart } from "./chart/BloodTest";
import { EMGChart } from "./chart/EMG";

const InquiryPage = () => {
  //權限
  const navigate = useNavigate();
  const userData = sessionStorage.getItem("userData");
  useEffect(() => {
    if (!userData) {
      alert("請先登入!");
      navigate("/");
    }
  });
  const [replaceComponent, setReplaceComponent] = useState("");
  const routeParams = useParams();

  //get patients data
  const [patients, setPatients] = useState<Patient>();
  const [selectedDate, setSelectedDate] = useState<string>(
    `${routeParams.selectedDate}`
  );

  //get SELECTEED DATE patient
  // const [selectedDatePatient, setSelectedDatePatient]=useState<Patient>();

  const data = async () => {
    const response = await api.get(`/inquiry/${routeParams.id}`);
    setPatients(response.data);
  };

  useEffect(() => {
    data();
  }, []);

  return (
    <div className="inquiry-all">
      <div className="inquiry-menu">
        <Menu selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </div>
      <div className="inquiry-left-right-flex">
        <div className="inquiry-left">
          {patients && <Left info={patients.info} />}
        </div>
        <div className="inquiry-right">
          {patients &&
            (() => {
              switch (replaceComponent) {
                case "ADLtable":
                  {
                    return (
                      <ADL
                        setReplaceComponent={setReplaceComponent}
                        selectedDate={selectedDate}
                      />
                    );
                  }
                  break;

                case "BloodTesttable":
                  {
                    return (
                      <BloodTest
                        setReplaceComponent={setReplaceComponent}
                        selectedDate={selectedDate}
                      />
                    );
                  }

                  break;
                case "EMGtable":
                  {
                    return (
                      <EMG
                        setReplaceComponent={setReplaceComponent}
                        selectedDate={selectedDate}
                      />
                    );
                  }
                  break;

                case "MGtable":
                  {
                    return (
                      <MG
                        setReplaceComponent={setReplaceComponent}
                        selectedDate={selectedDate}
                      />
                    );
                  }
                  break;

                case "QMGtable":
                  {
                    return (
                      <QMG
                        setReplaceComponent={setReplaceComponent}
                        selectedDate={selectedDate}
                      />
                    );
                  }
                  break;

                case "QOLtable":
                  {
                    return (
                      <QOL
                        setReplaceComponent={setReplaceComponent}
                        selectedDate={selectedDate}
                      />
                    );
                  }
                  break;

                case "Thymustable":
                  {
                    return (
                      <Thymus
                        setReplaceComponent={setReplaceComponent}
                        selectedDate={selectedDate}
                      />
                    );
                  }
                  break;

                case "Visittable":
                  {
                    return (
                      <Visit
                        setReplaceComponent={setReplaceComponent}
                        selectedDate={selectedDate}
                      />
                    );
                  }
                  break;

                case "QMGchart":
                  {
                    return (
                      <QMGChart
                        setReplaceComponent={setReplaceComponent}
                        historyData={patients.QMG}
                      />
                    );
                  }
                  break;

                case "ADLchart":
                  {
                    return (
                      <ADLChart
                        setReplaceComponent={setReplaceComponent}
                        historyData={patients.ADL}
                      />
                    );
                  }
                  break;

                case "MGchart":
                  {
                    return (
                      <MGChart
                        setReplaceComponent={setReplaceComponent}
                        historyData={patients.MG}
                      />
                    );
                  }
                  break;

                case "QOLchart":
                  {
                    return (
                      <QOLChart
                        setReplaceComponent={setReplaceComponent}
                        historyData={patients.QOL}
                      />
                    );
                  }
                  break;

                case "Visitchart":
                  {
                    return (
                      <VisitChart
                        setReplaceComponent={setReplaceComponent}
                        historyData={patients.visit}
                      />
                    );
                  }
                  break;

                case "Thymuschart":
                  {
                    return (
                      <ThymusChart
                        setReplaceComponent={setReplaceComponent}
                        historyData={patients.thymus}
                      />
                    );
                  }
                  break;

                case "BloodTestchart":
                  {
                    return (
                      <BloodTestChart
                        setReplaceComponent={setReplaceComponent}
                        historyData={patients.bloodTest}
                      />
                    );
                  }
                  break;

                case "EMGchart":
                  {
                    return (
                      <EMGChart
                        setReplaceComponent={setReplaceComponent}
                        historyData={patients.EMG}
                      />
                    );
                  }
                  break;

                default:
                  {
                    return (
                      <Right
                        setReplaceComponent={setReplaceComponent}
                        patient={patients}
                      />
                    );
                  }
                  break;
              }
            })()}
        </div>
      </div>
    </div>
  );
};
export default InquiryPage;
