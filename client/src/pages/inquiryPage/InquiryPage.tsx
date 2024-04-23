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

const defaultPatient = {
  info: {
    "ID#": "",
    name: "",
    DOB: "",
    sex: "",
    height: 0,
    weight: 0,
    other: "",
    attackDate: "",
    beginSymptom: "",
    otherHospitalRecord: {
      recentlyDate: "",
      totalTimes: 0,
    },
    otherDisease: [0],
    otherMedicine: [0],
  },
  ADL: {
    testDate: "",
    talking: 0,
    chewing: 0,
    swallowing: 0,
    breathing: 0,
    brushTeethOrCombHair: 0,
    ariseFromChair: 0,
    doubleVision: 0,
    eyelid: 0,
    sum: 0,
  },
  visit: {
    testDate: "",
    treat: 0,
    SBP: 0,
    DBP: 0,
    selfAssessment: 0,
    note: "",
    prescription: {
      pyridostigmine: 0,
      compesolone: 0,
      cellcept: 0,
      imuran: 0,
      prograf: 0,
    },
    examination: {
      ptosis: 0,
      diplopia: 0,
      dysphagia: 0,
      dysarthria: 0,
      dyspnea: 0,
      limpWeakness: 0,
    },
    MGFAclassification: "",
    status: {
      isWaiting: false,
      description: "",
    },
  },
  MG: {
    testDate: "",
    ptosis: 0,
    doubleVision: 0,
    eyeClosure: 0,
    talking: 0,
    chewing: 0,
    swallowing: 0,
    breathing: 0,
    neckFlexion: 0,
    shoulderAbduction: 0,
    hipFlexion: 0,
    sum: 0,
  },
  thymus: {
    testDate: "",
    thymusStatus: 0,
    thymusDescription: "",
  },
  bloodTest: {
    testDate: "",
    ACHR: 0,
    TSH: 0,
    freeThyroxine: 0,
    ANA: 0,
    uricAcid: 0,
  },
  QOL: {
    testDate: "",
    frustration: 0,
    eyeUsing: 0,
    eating: 0,
    social: 0,
    entertainment: 0,
    fullfillFamilyNeeds: 0,
    plansNecessity: 0,
    jobState: 0,
    speaking: 0,
    driving: 0,
    depression: 0,
    walking: 0,
    beingInPublicPlaces: 0,
    overwhelm: 0,
    freshenUp: 0,
    sum: 0,
  },
  QMG: {
    testDate: "",
    doubleVision: 0,
    ptosis: 0,
    facialMuscle: 0,
    swallowing: 0,
    speakFluency: 0,
    rightArmHeight: 0,
    leftArmHeight: 0,
    vitalCapacity: 0,
    rightHandGrid: 0,
    leftHandGrid: 0,
    headLift: 0,
    rightLegHeight: 0,
    leftLegHeight: 0,
    sum: 0,
  },
  EMG: {
    testDate: "",
    nasalis: {
      preActivation: 0,
      postActivation: [0],
    },
    abd: {
      preActivation: 0,
      postActivation: [0],
    },
    trapezius: {
      preActivation: 0,
      postActivation: [0],
    },
  },
};

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

  //get patient's all data
  const [patients, setPatients] = useState<Patient>();
  const getAllData = async () => {
    const response = await api.get(`/inquiry/${routeParams.id}`);
    console.log("getAllData: ", response.data);
    setPatients(response.data);
  };
  useEffect(() => {
    getAllData();
  }, []);

  //get SELECTED DATE patient & change date
  const [selectedDate, setSelectedDate] = useState<string>(
    `${routeParams.selectedDate}`
  );

  //compare with default/selectedDate PATIENT to finish inquiry
  const finishInquiry = () => {
    console.log("finishInquiry");
  };

  return (
    patients && (
      <div className="inquiry-all">
        <div className="inquiry-menu">
          <Menu
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            finishInquiry={finishInquiry}
          />
        </div>
        <div className="inquiry-left-right-flex">
          <div className="inquiry-left">
            <Left info={patients.info} />
          </div>
          <div className="inquiry-right">
            {(() => {
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
    )
  );
};
export default InquiryPage;
