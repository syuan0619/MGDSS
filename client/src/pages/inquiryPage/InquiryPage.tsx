import "./inquiryPage.css";
import Menu from "./components/Menu";
import Left from "./components/Left";
import Right from "./components/Right";
import TableADL from "./table/ADL";
import TableBloodTest from "./table/BloodTest";
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
import { ADL, BloodTest, Patient } from "../../types/Patient.ts";
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
  useEffect(() => {
    getAllData();
  }, []);

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
  const [BloodTestScore, setBloodTestScore] = useState<BloodTest>({
    testDate: selectedDate,
    ACHR: 0,
    TSH: 0,
    freeThyroxine: 0,
    ANA: 0,
    uricAcid: 0,
  });

  useEffect(() => {
    setADLscore({ ...ADLscore, testDate: selectedDate });
  }, [selectedDate]);

  //compare with default/selectedDate PATIENT to finish inquiry
  const finishInquiry = async () => {
    console.log("finishInquiry");
    const [changeTable, notChangeTable] = checkChangeTable();
    console.log("changeTable", changeTable);
    console.log("notChangeTable", notChangeTable);
    // const confirmResult = confirm(
    //   `以下表格尚未填寫或儲存： ${notChangeTable}\n確定要送出嗎？`
    // );
    // if (confirmResult) {
    //   changeTable.forEach(async (each) => {
    //     await api.post(`/inquiry/${routeParams.id}/${each}`).then((res) => {
    //       console.log(each, ":\n", res.data);
    //     });
    //   });
    // }
  };

  const checkChangeTable = () => {
    const changeTable: string[] = [];
    const notChangeTable: string[] = [];
    changeOrNot.changeADL
      ? changeTable.push("ADL")
      : notChangeTable.push("ADL");
    changeOrNot.changeBloodTest
      ? changeTable.push("BloodTest")
      : notChangeTable.push("BloodTest");
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
      ? changeTable.push("Thymus")
      : notChangeTable.push("Thymus");
    changeOrNot.changeVisit
      ? changeTable.push("Visit")
      : notChangeTable.push("Visit");
    return [changeTable, notChangeTable];
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
                        BloodTestScore={BloodTestScore}
                        setBloodTestScore={setBloodTestScore}
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
