import { LineChart } from "@mui/x-charts/LineChart";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import "./Chart.css";
const patientQMG = [
  {
    doubleVision: 2,
    ptosis: 3,
    facialMuscle: 2,
    swallowing: 2,
    speakFluency: 2,
    rightArmHeight: 2,
    leftArmHeight: 2,
    vitalCapacity: 2,
    rightHandGrid: 2,
    leftHandGrid: 2,
    headLift: 2,
    rightLegHeight: 2,
    leftLegHeight: 2,
    sum: 26,
    testDate: "2024-03-19",
  },
  {
    doubleVision: 1,
    ptosis: 2,
    facialMuscle: 1,
    swallowing: 1,
    speakFluency: 1,
    rightArmHeight: 1,
    leftArmHeight: 1,
    vitalCapacity: 1,
    rightHandGrid: 1,
    leftHandGrid: 1,
    headLift: 1,
    rightLegHeight: 1,
    leftLegHeight: 1,
    sum: 13,
    testDate: "2024-03-20",
  },
  {
    doubleVision: 3,
    ptosis: 3,
    facialMuscle: 3,
    swallowing: 3,
    speakFluency: 3,
    rightArmHeight: 3,
    leftArmHeight: 3,
    vitalCapacity: 3,
    rightHandGrid: 3,
    leftHandGrid: 3,
    headLift: 3,
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
}: {
  setReplaceComponent: (table: string) => void;
}) => {
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
                data: QMGData,
                label: "sum score",
                color: "#008dda",
              },
              {
                curve: "linear",
                data: doubleVisionData,
                label: "doubleVision",
              },
              {
                curve: "linear",
                data: ptosisData,
                label: "ptosis",
              },
              {
                curve: "linear",
                data: facialMuscleData,
                label: "facialMuscle",
              },
              {
                curve: "linear",
                data: swallowingData,
                label: "swallowing",
              },
              {
                curve: "linear",
                data: speakFluencyData,
                label: "speakFluency",
              },
              {
                curve: "linear",
                data: rightArmHeightData,
                label: "rightArmHeight",
              },
              {
                curve: "linear",
                data: leftArmHeightData,
                label: "leftArmHeight",
              },
              {
                curve: "linear",
                data: vitalCapacityData,
                label: "vitalCapacity",
              },
              {
                curve: "linear",
                data: rightHandGridData,
                label: "rightHandGrid",
              },
              {
                curve: "linear",
                data: leftHandGridData,
                label: "leftHandGrid",
              },
              {
                curve: "linear",
                data: headLiftData,
                label: "headLift",
              },
              {
                curve: "linear",
                data: rightLegHeightData,
                label: "rightLegHeight",
              },
              {
                curve: "linear",
                data: leftLegHeightData,
                label: "leftLegHeight",
              },
            ]}
            xAxis={[{ scaleType: "point", data: QMGxLabels }]}
          />
        </div>
      </div>
    </div>
  );
};

const QMGSmallChart = () => {
  return (
    <div>
      <LineChart
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
