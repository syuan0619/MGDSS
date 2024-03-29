import { LineChart } from "@mui/x-charts/LineChart";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { QMG } from "../../../types/Patient";
import "./Chart.css";

const patientQMG = [
  {
    doubleVision: 2,
    ptosis: 3,
    facialMuscle: 1,
    swallowing: 2,
    speakFluency: 3,
    rightArmHeight: 2,
    leftArmHeight: 2,
    vitalCapacity: 0,
    rightHandGrid: 2,
    leftHandGrid: 0,
    headLift: 2,
    rightLegHeight: 2,
    leftLegHeight: 1,
    sum: 26,
    testDate: "2024-03-19",
  },
  {
    doubleVision: 1,
    ptosis: 2,
    facialMuscle: 1,
    swallowing: 1,
    speakFluency: 2,
    rightArmHeight: 1,
    leftArmHeight: 1,
    vitalCapacity: 3,
    rightHandGrid: 1,
    leftHandGrid: 0,
    headLift: 0,
    rightLegHeight: 1,
    leftLegHeight: 1,
    sum: 13,
    testDate: "2024-03-20",
  },
  {
    doubleVision: 3,
    ptosis: 3,
    facialMuscle: 3,
    swallowing: 1,
    speakFluency: 1,
    rightArmHeight: 3,
    leftArmHeight: 3,
    vitalCapacity: 2,
    rightHandGrid: 1,
    leftHandGrid: 0,
    headLift: 2,
    rightLegHeight: 3,
    leftLegHeight: 3,
    sum: 39,
    testDate: "2024-03-22",
  },
  {
    doubleVision: 1,
    ptosis: 3,
    facialMuscle: 1,
    swallowing: 2,
    speakFluency: 3,
    rightArmHeight: 0,
    leftArmHeight: 1,
    vitalCapacity: 1,
    rightHandGrid: 2,
    leftHandGrid: 1,
    headLift: 3,
    rightLegHeight: 1,
    leftLegHeight: 3,
    sum: 13,
    testDate: "2024-03-25",
  },
  {
    doubleVision: 3,
    ptosis: 0,
    facialMuscle: 3,
    swallowing: 2,
    speakFluency: 1,
    rightArmHeight: 0,
    leftArmHeight: 0,
    vitalCapacity: 2,
    rightHandGrid: 1,
    leftHandGrid: 3,
    headLift: 3,
    rightLegHeight: 3,
    leftLegHeight: 1,
    sum: 39,
    testDate: "2024-03-29",
  },
];

const QMGData = patientQMG.map((item) => item.sum);
const QMGxLabels = patientQMG.map((item) => item.testDate);
const doubleVisionData = patientQMG.map((item) => item.doubleVision);
const ptosisData = patientQMG.map((item) => item.ptosis);
const facialMuscleData = patientQMG.map((item) => item.facialMuscle);
const swallowingData = patientQMG.map((item) => item.swallowing);
const speakFluencyData = patientQMG.map((item) => item.speakFluency);
const rightArmHeightData = patientQMG.map((item) => item.rightArmHeight);
const leftArmHeightData = patientQMG.map((item) => item.leftArmHeight);
const vitalCapacityData = patientQMG.map((item) => item.vitalCapacity);
const rightHandGridData = patientQMG.map((item) => item.rightHandGrid);
const leftHandGridData = patientQMG.map((item) => item.leftHandGrid);
const headLiftData = patientQMG.map((item) => item.headLift);
const rightLegHeightData = patientQMG.map((item) => item.rightLegHeight);
const leftLegHeightData = patientQMG.map((item) => item.leftLegHeight);

const QMGChart = ({
  setReplaceComponent,
  historyData,
}: {
  setReplaceComponent: (table: string) => void;
  historyData: QMG[];
}) => {
  console.log(historyData);
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
          <LineChart
            margin={{ top: 150 }}
            slotProps={{
              legend: {
                itemGap: 20,
                padding: -5,
                itemMarkHeight: 5,
              },
            }}
            width={700}
            height={500}
            series={[
              {
                curve: "linear",
                data: doubleVisionData,
                label: "doubleVision",
                color: "#FF204E",
              },
              {
                curve: "linear",
                data: ptosisData,
                label: "ptosis",
                color: "#F7418F",
              },
              {
                curve: "linear",
                data: facialMuscleData,
                label: "facialMuscle",
                color: "#E36414",
              },
              {
                curve: "linear",
                data: swallowingData,
                label: "swallowing",
                color: "#FFBB64",
              },
              {
                curve: "linear",
                data: speakFluencyData,
                label: "speakFluency",
                color: "#FAEF5D",
              },
              {
                curve: "linear",
                data: rightArmHeightData,
                label: "rightArmHeight",
                color: "#00DFA2",
              },
              {
                curve: "linear",
                data: leftArmHeightData,
                label: "leftArmHeight",
                color: "#0B666A",
              },
              {
                curve: "linear",
                data: vitalCapacityData,
                label: "vitalCapacity",
                color: "#2F58CD",
              },
              {
                curve: "linear",
                data: rightHandGridData,
                label: "rightHandGrid",
                color: "#80B3FF",
              },
              {
                curve: "linear",
                data: leftHandGridData,
                label: "leftHandGrid",
                color: "#9400FF",
              },
              {
                curve: "linear",
                data: headLiftData,
                label: "headLift",
                color: "#E26EE5",
              },
              {
                curve: "linear",
                data: rightLegHeightData,
                label: "rightLegHeight",
                color: "#7C81AD",
              },
              {
                curve: "linear",
                data: leftLegHeightData,
                label: "leftLegHeight",
                color: "#706233",
              },
            ]}
            xAxis={[{ scaleType: "point", data: QMGxLabels }]}
          />
        </div>
      </div>
    </div>
  );
};

const QMGSmallChart = ({ historyData }: { historyData: QMG[] }) => {
  console.log(historyData);
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
            data: QMGData,
            label: "sum score",
            color: "#008dda",
          },
        ]}
        xAxis={[{ scaleType: "point", data: QMGxLabels }]}
      />
    </div>
  );
};
export { QMGChart, QMGSmallChart };
