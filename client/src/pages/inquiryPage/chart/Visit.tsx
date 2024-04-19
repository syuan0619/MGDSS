import { LineChart } from "@mui/x-charts";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import "./Chart.css";
import { Visit } from "../../../types/Patient";
import { useState } from "react";

const VisitChart = ({
  setReplaceComponent,
  historyData,
}: {
  setReplaceComponent: (table: string) => void;
  historyData: Visit[];
}) => {
  const VisitChart_pyridostigmineData = historyData.map(
    (item) => item.prescription.pyridostigmine
  );
  const VisitChart_compesoloneData = historyData.map(
    (item) => item.prescription.compesolone
  );
  const VisitChart_cellceptData = historyData.map(
    (item) => item.prescription.cellcept
  );
  const VisitChart_imuranData = historyData.map(
    (item) => item.prescription.imuran
  );
  const VisitChart_prografData = historyData.map(
    (item) => item.prescription.prograf
  );
  const VisitChart_selfAssessmentDaya = historyData.map(
    (item) => item.selfAssessment
  );
  const VisitChart_xLabels = historyData.map((item) => item.testDate);
  const VisitData = [
    {
      curve: "linear",
      data: VisitChart_pyridostigmineData,
      label: "pyridostigmine",
      color: "#FF204E",
    },
    {
      curve: "linear",
      data: VisitChart_compesoloneData,
      label: "compesolone",
      color: "#E36414",
    },
    {
      curve: "linear",
      data: VisitChart_cellceptData,
      label: "cellcept",
      color: "#0B666A",
    },
    {
      curve: "linear",
      data: VisitChart_imuranData,
      label: "imuran",
      color: "#2F58CD",
    },
    {
      curve: "linear",
      data: VisitChart_prografData,
      label: "prograf",
      color: "#9400FF",
    },
    {
      curve: "linear",
      data: VisitChart_selfAssessmentDaya,
      label: "selfAssessment",
      color: "#7C81AD",
    },
  ];
  const [a, setA] =
    useState<{ curve: string; data: number[]; label: string; color: string }[]>(
      VisitData
    );
  const addToSelected = (item: {
    curve: string;
    data: number[];
    label: string;
    color: string;
  }) => {
    const exist = a.some((tarData) => tarData.label === item.label);
    const deleteExist = a.filter((x) => x.label !== item.label);
    if (!exist) {
      setA([...a, item]);
    } else if (exist == true) {
      setA(deleteExist);
    }
  };

  const selectData = (label: string) => {
    const tarData = VisitData.find((item) => item.label === label);
    if (tarData) {
      addToSelected(tarData);
    }
  };

  //selectAll
  const handleSelectAll = () => {
    setA(VisitData);
  };
  const VisitCheckbox = VisitData.map((item, index) => (
    <>
      <label style={{ color: item.color }} key={index}>
        <input
          type="checkbox"
          name={item.label}
          defaultChecked={true}
          onChange={() => selectData(item.label)}
        />
        {item.label}
      </label>
    </>
  ));

  const cancelChecked = () => {
    if (a.length < VisitData.length) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="chart-bg">
      <div className="chart">
        <div className="chart-header">
          <button
            className="chart-backToRight"
            onClick={() => setReplaceComponent("right")}
          >
            <IoIosArrowDropleftCircle />
          </button>
          <p>Visit</p>
        </div>
        <div className="chart-footer">
          <div className="chart-footer-chart">
            <LineChart
              margin={{ top: 30 }}
              slotProps={{
                legend: {
                  itemGap: 12,
                  padding: -5,
                  itemMarkHeight: 5,
                  hidden: true,
                },
              }}
              width={600}
              height={500}
              series={a}
              xAxis={[{ scaleType: "point", data: VisitChart_xLabels }]}
            />
          </div>
          <div className="chart-footer-checkbox">
            <div className="chart-footer-checkbox-inner">
              <label>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  defaultChecked={true}
                  checked={cancelChecked()}
                />
                全選
              </label>
              {VisitCheckbox}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VisitSmallChart = ({ historyData }: { historyData: Visit[] }) => {
  const VisitSmallChart_xLabels = historyData.map((item) => item.testDate);
  const VisitSmallChart_imuranData = historyData.map(
    (item) => item.prescription.imuran
  );
  const VisitSmallChart_compesoloneData = historyData.map(
    (item) => item.prescription.compesolone
  );
  const VisitSmallChart_pyridostigmineData = historyData.map(
    (item) => item.prescription.pyridostigmine
  );
  return (
    <div>
      <LineChart
        slotProps={{
          legend: {
            itemGap: 20,
            itemMarkHeight: 5,
          },
        }}
        width={400}
        height={300}
        series={[
          {
            curve: "linear",
            data: VisitSmallChart_pyridostigmineData,
            label: "pyridostigmine",
            color: "#FF204E",
          },
          {
            curve: "linear",
            data: VisitSmallChart_compesoloneData,
            label: "compesolone",
            color: "#0B666A",
          },
          {
            curve: "linear",
            data: VisitSmallChart_imuranData,
            label: "imuran",
            color: "#9400FF",
          },
        ]}
        xAxis={[{ scaleType: "point", data: VisitSmallChart_xLabels }]}
      />
    </div>
  );
};
export { VisitSmallChart, VisitChart };

// const patientVisit = [
//   {
//     date: "2024-03-21",
//     treat: 0,
//     selfAssessment: 0,
//     note: "",
//     SBP: 0,
//     DBP: 0,
//     prescription: {
//       pyridostigmine: 2,
//       compesolone: 7,
//       cellcept: 5,
//       imuran: 5,
//       prograf: 3,
//     },
//     examination: {
//       ptosis: 1,
//       diplopia: 2,
//       dysphagia: 3,
//       dysarthria: 0,
//       dyspnea: 0,
//       limpWeakness: 0,
//       MGFAclassification: 0,
//     },
//   },
//   {
//     date: "2024-03-22",
//     treat: 0,
//     selfAssessment: 0,
//     note: "",
//     SBP: 0,
//     DBP: 0,
//     prescription: {
//       pyridostigmine: 1,
//       compesolone: 9,
//       cellcept: 1,
//       imuran: 7,
//       prograf: 0,
//     },
//     examination: {
//       ptosis: 0,
//       diplopia: 0,
//       dysphagia: 0,
//       dysarthria: 0,
//       dyspnea: 0,
//       limpWeakness: 0,
//       MGFAclassification: 0,
//     },
//   },
//   {
//     date: "2024-03-31",
//     treat: 0,
//     selfAssessment: 0,
//     note: "",
//     SBP: 0,
//     DBP: 0,
//     prescription: {
//       pyridostigmine: 9,
//       compesolone: 8,
//       cellcept: 3,
//       imuran: 7,
//       prograf: 2,
//     },
//     examination: {
//       ptosis: 0,
//       diplopia: 0,
//       dysphagia: 0,
//       dysarthria: 0,
//       dyspnea: 0,
//       limpWeakness: 0,
//       MGFAclassification: 0,
//     },
//   },
// ];

// const pyridostigmineData = patientVisit.map(
//   (item) => item.prescription.pyridostigmine
// );
// const compesoloneData = patientVisit.map(
//   (item) => item.prescription.compesolone
// );
// const cellceptData = patientVisit.map((item) => item.prescription.cellcept);
// const imuranData = patientVisit.map((item) => item.prescription.imuran);
// const prografData = patientVisit.map((item) => item.prescription.prograf);
// const selfAssessmentDaya = patientVisit.map((item) => item.selfAssessment);
// const VisitxLabels = patientVisit.map((item) => item.date);
