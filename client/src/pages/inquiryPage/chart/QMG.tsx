import { LineChart } from "@mui/x-charts/LineChart";
import { useState } from "react";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { QMG } from "../../../types/Patient";
import "./Chart.css";

const QMGChart = ({
  setReplaceComponent,
  historyData,
}: {
  setReplaceComponent: (table: string) => void;
  historyData: QMG[];
}) => {
  const QMGChart_xLabels = historyData.map((item) => item.testDate);
  const QMGChart_doubleVisionData = historyData.map(
    (item) => item.doubleVision
  );
  const QMGChart_ptosisData = historyData.map((item) => item.ptosis);
  const QMGChart_facialMuscleData = historyData.map(
    (item) => item.facialMuscle
  );
  const QMGChart_swallowingData = historyData.map((item) => item.swallowing);
  const QMGChart_speakFluencyData = historyData.map(
    (item) => item.speakFluency
  );
  const QMGChart_rightArmHeightData = historyData.map(
    (item) => item.rightArmHeight
  );
  const QMGChart_leftArmHeightData = historyData.map(
    (item) => item.leftArmHeight
  );
  const QMGChart_vitalCapacityData = historyData.map(
    (item) => item.vitalCapacity
  );
  const QMGChart_rightHandGridData = historyData.map(
    (item) => item.rightHandGrid
  );
  const QMGChart_leftHandGridData = historyData.map(
    (item) => item.leftHandGrid
  );
  const QMGChart_headLiftData = historyData.map((item) => item.headLift);
  const QMGChart_rightLegHeightData = historyData.map(
    (item) => item.rightLegHeight
  );
  const QMGChart_leftLegHeightData = historyData.map(
    (item) => item.leftLegHeight
  );

  const QMGData = [
    {
      curve: "linear",
      data: QMGChart_doubleVisionData,
      label: "doubleVision",
      color: "#FF204E",
    },
    {
      curve: "linear",
      data: QMGChart_ptosisData,
      label: "ptosis",
      color: "#F7418F",
    },
    {
      curve: "linear",
      data: QMGChart_facialMuscleData,
      label: "facialMuscle",
      color: "#E36414",
    },
    {
      curve: "linear",
      data: QMGChart_swallowingData,
      label: "swallowing",
      color: "#FFBB64",
    },
    {
      curve: "linear",
      data: QMGChart_speakFluencyData,
      label: "speakFluency",
      color: "#37B5B6",
    },
    {
      curve: "linear",
      data: QMGChart_rightArmHeightData,
      label: "rightArmHeight",
      color: "#00DFA2",
    },
    {
      curve: "linear",
      data: QMGChart_leftArmHeightData,
      label: "leftArmHeight",
      color: "#0B666A",
    },
    {
      curve: "linear",
      data: QMGChart_vitalCapacityData,
      label: "vitalCapacity",
      color: "#2F58CD",
    },
    {
      curve: "linear",
      data: QMGChart_rightHandGridData,
      label: "rightHandGrid",
      color: "#80B3FF",
    },
    {
      curve: "linear",
      data: QMGChart_leftHandGridData,
      label: "leftHandGrid",
      color: "#9400FF",
    },
    {
      curve: "linear",
      data: QMGChart_headLiftData,
      label: "headLift",
      color: "#E26EE5",
    },
    {
      curve: "linear",
      data: QMGChart_rightLegHeightData,
      label: "rightLegHeight",
      color: "#7C81AD",
    },
    {
      curve: "linear",
      data: QMGChart_leftLegHeightData,
      label: "leftLegHeight",
      color: "#706233",
    },
  ];

  const [a, setA] =
    useState<{ curve: string; data: number[]; label: string; color: string }[]>(
      QMGData
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
    const tarData = QMGData.find((item) => item.label === label);
    if (tarData) {
      addToSelected(tarData);
    }
  };

  //selectAll
  const handleSelectAll = () => {
    setA(QMGData);
  };

  const handleChecked = (label: string) => {
    if (a.length == QMGData.length) {
      return true;
    } else if (a.some((item) => item.label !== label) == false) {
      return false;
    }
  };
  const QMGCheckbox = QMGData.map((item, index) => (
    <>
      <label style={{ color: item.color }} key={index}>
        <input
          type="checkbox"
          name={item.label}
          onChange={() => {
            selectData(item.label);
            handleChecked(item.label);
          }}
          defaultChecked={true}
          checked={handleChecked("item")}
        />
        {item.label}
      </label>
    </>
  ));

  const cancelChecked = () => {
    if (a.length < QMGData.length) {
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
          <p>QMG</p>
        </div>
        <div className="chart-footer">
          <div className="chart-footer-chart">
            <LineChart
              margin={{ top: 30 }}
              slotProps={{
                legend: {
                  itemGap: 15,
                  padding: -5,
                  itemMarkHeight: 5,
                  hidden: true,
                },
              }}
              width={600}
              height={500}
              series={a}
              xAxis={[{ scaleType: "point", data: QMGChart_xLabels }]}
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
              {QMGCheckbox}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const QMGSmallChart = ({ historyData }: { historyData: QMG[] }) => {
  const QMGSmallChart_Data = historyData.map((item) => item.sum);
  const QMGSmallChart_xLabels = historyData.map((item) => item.testDate);

  return (
    <div>
      <LineChart
        slotProps={{
          legend: {
            itemMarkHeight: 5,
          },
        }}
        width={400}
        height={300}
        series={[
          {
            curve: "linear",
            data: QMGSmallChart_Data,
            label: "sum score",
            color: "#008dda",
          },
        ]}
        xAxis={[{ scaleType: "point", data: QMGSmallChart_xLabels }]}
      />
    </div>
  );
};
export { QMGChart, QMGSmallChart };

// const patientQMG = [
//   {
//     doubleVision: 2,
//     ptosis: 3,
//     facialMuscle: 1,
//     swallowing: 2,
//     speakFluency: 3,
//     rightArmHeight: 2,
//     leftArmHeight: 2,
//     vitalCapacity: 0,
//     rightHandGrid: 2,
//     leftHandGrid: 0,
//     headLift: 2,
//     rightLegHeight: 2,
//     leftLegHeight: 1,
//     sum: 26,
//     testDate: "2024-03-19",
//   },
//   {
//     doubleVision: 1,
//     ptosis: 2,
//     facialMuscle: 1,
//     swallowing: 1,
//     speakFluency: 2,
//     rightArmHeight: 1,
//     leftArmHeight: 1,
//     vitalCapacity: 3,
//     rightHandGrid: 1,
//     leftHandGrid: 0,
//     headLift: 0,
//     rightLegHeight: 1,
//     leftLegHeight: 1,
//     sum: 13,
//     testDate: "2024-03-20",
//   },
//   {
//     doubleVision: 3,
//     ptosis: 3,
//     facialMuscle: 3,
//     swallowing: 1,
//     speakFluency: 1,
//     rightArmHeight: 3,
//     leftArmHeight: 3,
//     vitalCapacity: 2,
//     rightHandGrid: 1,
//     leftHandGrid: 0,
//     headLift: 2,
//     rightLegHeight: 3,
//     leftLegHeight: 3,
//     sum: 39,
//     testDate: "2024-03-22",
//   },
//   {
//     doubleVision: 1,
//     ptosis: 3,
//     facialMuscle: 1,
//     swallowing: 2,
//     speakFluency: 3,
//     rightArmHeight: 0,
//     leftArmHeight: 1,
//     vitalCapacity: 1,
//     rightHandGrid: 2,
//     leftHandGrid: 1,
//     headLift: 3,
//     rightLegHeight: 1,
//     leftLegHeight: 3,
//     sum: 13,
//     testDate: "2024-03-25",
//   },
//   {
//     doubleVision: 3,
//     ptosis: 0,
//     facialMuscle: 3,
//     swallowing: 2,
//     speakFluency: 1,
//     rightArmHeight: 0,
//     leftArmHeight: 0,
//     vitalCapacity: 2,
//     rightHandGrid: 1,
//     leftHandGrid: 3,
//     headLift: 3,
//     rightLegHeight: 3,
//     leftLegHeight: 1,
//     sum: 39,
//     testDate: "2024-03-29",
//   },
// ];

// const QMGData = patientQMG.map((item) => item.sum);
// const QMGxLabels = patientQMG.map((item) => item.testDate);
// const doubleVisionData = patientQMG.map((item) => item.doubleVision);
// const ptosisData = patientQMG.map((item) => item.ptosis);
// const facialMuscleData = patientQMG.map((item) => item.facialMuscle);
// const swallowingData = patientQMG.map((item) => item.swallowing);
// const speakFluencyData = patientQMG.map((item) => item.speakFluency);
// const rightArmHeightData = patientQMG.map((item) => item.rightArmHeight);
// const leftArmHeightData = patientQMG.map((item) => item.leftArmHeight);
// const vitalCapacityData = patientQMG.map((item) => item.vitalCapacity);
// const rightHandGridData = patientQMG.map((item) => item.rightHandGrid);
// const leftHandGridData = patientQMG.map((item) => item.leftHandGrid);
// const headLiftData = patientQMG.map((item) => item.headLift);
// const rightLegHeightData = patientQMG.map((item) => item.rightLegHeight);
// const leftLegHeightData = patientQMG.map((item) => item.leftLegHeight);
