import "./inquiryPage.css";
import Menu from "./components/Menu";
import Left from "./components/Left";
import Right from "./components/Right";
import TableADL from "./table/ADL";
import TableBloodTest from "./table/BloodTest";
import TableEMG from "./table/EMG";
import TableMG from "./table/MG";
import TableQMG from "./table/QMG";
import TableQOL from "./table/QOL";
import TableThymus from "./table/Thymus";
import TableVisit from "./table/Visit";
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
import {
  ADL,
  BloodTest,
  MG,
  Patient,
  QMG,
  QOL,
  Thymus,
  Visit,
  noImageType,
} from "../../types/Patient.ts";
import typeChange from "../../types/Change.ts";

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
    setPatients(response.data);
  };

  //select date & 確認有無更動過
  const [selectedDate, setSelectedDate] = useState<string>(
    `${routeParams.selectedDate}`
  );
  const [changeOrNot, setChangeOrNot] = useState<typeChange>({
    changeADL: false,
    changeBloodTest: false,
    changeEMG: false,
    changeMG: false,
    changeQMG: false,
    changeQOL: false,
    changeThymus: false,
    changeVisit: false,
  });

  //manage all tables
  const [ADLscore, setADLscore] = useState<ADL>({
    testDate: selectedDate,
    talking: 0,
    chewing: 0,
    swallowing: 0,
    breathing: 0,
    brushTeethOrCombHair: 0,
    ariseFromChair: 0,
    doubleVision: 0,
    eyelid: 0,
    sum: 0,
  });
  const [bloodTestscore, setbloodTestscore] = useState<BloodTest>({
    testDate: selectedDate,
    ACHR: 0,
    TSH: 0,
    freeThyroxine: 0,
    ANA: 0,
    uricAcid: 0,
  });
  const [MGscore, setMGscore] = useState<MG>({
    testDate: selectedDate,
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
  });
  const [QMGscore, setQMGscore] = useState<QMG>({
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
    testDate: selectedDate,
  });
  const [QOLscore, setQOLscore] = useState<QOL>({
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
    testDate: selectedDate,
  });
  const [thymusscore, setthymusscore] = useState<Thymus>({
    testDate: selectedDate,
    thymusStatus: 0,
    thymusDescription: "",
  });
  const [visitscore, setvisitscore] = useState<Visit>({
    testDate: selectedDate,
    treat: 0,
    selfAssessment: 0,
    note: "",
    SBP: 0,
    DBP: 0,
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
      description: 0,
    },
  });
  //EMG
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [recognizedResult, setRecognizedResult] = useState<string>("");
  const [modifiedResult, setModifiedResult] = useState<string>("");
  const [resultHeader, setResultHeader] = useState<noImageType>({
    testDate: selectedDate,
    nasalis: {
      preActivation: 0,
      postActivation: [],
    },
    abd: {
      preActivation: 0,
      postActivation: [],
    },
    trapezius: {
      preActivation: 0,
      postActivation: [],
    },
  });
  const [resultBody, setResultBody] = useState<Blob>();

  //確保日期有改到
  useEffect(() => {
    getAllData();
    setADLscore({ ...ADLscore, testDate: selectedDate });
    setbloodTestscore({ ...bloodTestscore, testDate: selectedDate });
    setMGscore({ ...MGscore, testDate: selectedDate });
    setQMGscore({ ...QMGscore, testDate: selectedDate });
    setQOLscore({ ...QOLscore, testDate: selectedDate });
    setthymusscore({ ...thymusscore, testDate: selectedDate });
    setvisitscore({ ...visitscore, testDate: selectedDate });
  }, [selectedDate]);

  //確認哪些table有改過
  const checkChangeTable = () => {
    const changeTable: string[] = [];
    const notChangeTable: string[] = [];
    changeOrNot.changeADL
      ? changeTable.push("ADL")
      : notChangeTable.push("ADL");
    changeOrNot.changeBloodTest
      ? changeTable.push("bloodTest")
      : notChangeTable.push("bloodTest");
    changeOrNot.changeEMG
      ? changeTable.push("EMG")
      : notChangeTable.push("EMG");
    changeOrNot.changeMG ? changeTable.push("MG") : notChangeTable.push("MG");
    changeOrNot.changeQMG
      ? changeTable.push("QMG")
      : notChangeTable.push("QMG");
    changeOrNot.changeQOL
      ? changeTable.push("QOL")
      : notChangeTable.push("QOL");
    changeOrNot.changeThymus
      ? changeTable.push("thymus")
      : notChangeTable.push("thymus");
    changeOrNot.changeVisit
      ? changeTable.push("visit")
      : notChangeTable.push("visit");
    return [changeTable, notChangeTable];
  };

  //finish inquiry
  const [finishOrNot, setFinishOrNot] = useState<boolean>(false);
  const finishInquiry = async () => {
    const [changeTable, notChangeTable] = checkChangeTable();
    console.log("changeTable", changeTable);
    console.log("notChangeTable", notChangeTable);
    const confirmResult = confirm(
      notChangeTable
        ? `以下表格尚未填寫或儲存：\n\n${notChangeTable}\n\n確定要送出嗎?`
        : "請確定表格中欄位已填寫完整"
    );
    if (confirmResult) {
      if (notChangeTable.includes("Visit")) {
        alert("Visit table為必填表格!\n\n如欲完成看診請務必將其填寫完整。");
      } else {
        changeTable.forEach(async (each) => {
          if (each === "EMG") {
            const formdata = new FormData();
            formdata.append("file", resultBody!);
            if (resultHeader && formdata) {
              await api
                .post(`/inquiry/${routeParams.id}/EMG`, formdata, {
                  headers: {
                    table: JSON.stringify(resultHeader),
                    "Access-Control-Expose-Headers": "table",
                  },
                })
                .then((res) => {
                  console.log(each, ":\n", res.data);
                })
                .catch((e) => {
                  console.log(e);
                });
            }
          } else {
            await api
              .post(`/inquiry/${routeParams.id}/${each}`, eval(`${each}score`))
              .then((res) => {
                console.log(each, ":\n", res.data);
              })
              .catch((e) => {
                console.log(e);
              });
          }
        });
      }
      setFinishOrNot(true);
    }
  };

  return (
    patients && (
      <div className="inquiry-all">
        <div className="inquiry-menu">
          <Menu
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            finishInquiry={finishInquiry}
            finishOrNot={finishOrNot}
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
                      <TableADL
                        setReplaceComponent={setReplaceComponent}
                        selectedDate={selectedDate}
                        ADLscore={ADLscore}
                        setADLscore={setADLscore}
                        getAllData={getAllData}
                        changeOrNot={changeOrNot}
                        setChangeOrNot={setChangeOrNot}
                      />
                    );
                  }
                  break;
                case "BloodTesttable":
                  {
                    return (
                      <TableBloodTest
                        setReplaceComponent={setReplaceComponent}
                        selectedDate={selectedDate}
                        bloodTestscore={bloodTestscore}
                        setbloodTestscore={setbloodTestscore}
                        getAllData={getAllData}
                        changeOrNot={changeOrNot}
                        setChangeOrNot={setChangeOrNot}
                      />
                    );
                  }

                  break;
                case "EMGtable":
                  {
                    return (
                      <TableEMG
                        setReplaceComponent={setReplaceComponent}
                        selectedDate={selectedDate}
                        previewUrl={previewUrl}
                        setPreviewUrl={setPreviewUrl}
                        recognizedResult={recognizedResult}
                        setRecognizedResult={setRecognizedResult}
                        modifiedResult={modifiedResult}
                        setModifiedResult={setModifiedResult}
                        setResultHeader={setResultHeader}
                        setResultBody={setResultBody}
                        getAllData={getAllData}
                        changeOrNot={changeOrNot}
                        setChangeOrNot={setChangeOrNot}
                      />
                    );
                  }
                  break;
                case "MGtable":
                  {
                    return (
                      <TableMG
                        setReplaceComponent={setReplaceComponent}
                        selectedDate={selectedDate}
                        MGscore={MGscore}
                        setMGscore={setMGscore}
                        getAllData={getAllData}
                        changeOrNot={changeOrNot}
                        setChangeOrNot={setChangeOrNot}
                      />
                    );
                  }
                  break;

                case "QMGtable":
                  {
                    return (
                      <TableQMG
                        setReplaceComponent={setReplaceComponent}
                        selectedDate={selectedDate}
                        QMGscore={QMGscore}
                        setQMGscore={setQMGscore}
                        getAllData={getAllData}
                        changeOrNot={changeOrNot}
                        setChangeOrNot={setChangeOrNot}
                      />
                    );
                  }
                  break;

                case "QOLtable":
                  {
                    return (
                      <TableQOL
                        setReplaceComponent={setReplaceComponent}
                        selectedDate={selectedDate}
                        QOLscore={QOLscore}
                        setQOLscore={setQOLscore}
                        getAllData={getAllData}
                        changeOrNot={changeOrNot}
                        setChangeOrNot={setChangeOrNot}
                      />
                    );
                  }
                  break;

                case "Thymustable":
                  {
                    return (
                      <TableThymus
                        setReplaceComponent={setReplaceComponent}
                        selectedDate={selectedDate}
                        thymusscore={thymusscore}
                        setthymusscore={setthymusscore}
                        getAllData={getAllData}
                        changeOrNot={changeOrNot}
                        setChangeOrNot={setChangeOrNot}
                      />
                    );
                  }
                  break;

                case "Visittable":
                  {
                    return (
                      <TableVisit
                        setReplaceComponent={setReplaceComponent}
                        selectedDate={selectedDate}
                        visitscore={visitscore}
                        setvisitscore={setvisitscore}
                        getAllData={getAllData}
                        changeOrNot={changeOrNot}
                        setChangeOrNot={setChangeOrNot}
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
