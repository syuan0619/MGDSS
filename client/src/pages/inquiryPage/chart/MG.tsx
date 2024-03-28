import { LineChart } from "@mui/x-charts";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { MG } from "../../../types/Patient";
import "./Chart.css";

const patientMG = [
  {
    testDate: "2024-03-21",
    ptosis: 0,
    doubleVision: 1,
    eyeClosure: 2,
    talking: 3,
    chewing: 2,
    swallowing: 0,
    breathing: 0,
    neckFlexion: 1,
    shoulderAbduction: 0,
    hipFlexion: 3,
    sum: 0,
  },
  {
    testDate: "2024-03-31",
    ptosis: 3,
    doubleVision: 1,
    eyeClosure: 3,
    talking: 0,
    chewing: 0,
    swallowing: 2,
    breathing: 1,
    neckFlexion: 2,
    shoulderAbduction: 3,
    hipFlexion: 2,
    sum: 18,
  },
  {
    testDate: "2024-04-13",
    ptosis: 1,
    doubleVision: 2,
    eyeClosure: 1,
    talking: 2,
    chewing: 2,
    swallowing: 1,
    breathing: 2,
    neckFlexion: 0,
    shoulderAbduction: 0,
    hipFlexion: 3,
    sum: 11,
  },
  {
    testDate: "2024-05-23",
    ptosis: 2,
    doubleVision: 1,
    eyeClosure: 3,
    talking: 1,
    chewing: 2,
    swallowing: 3,
    breathing: 0,
    neckFlexion: 2,
    shoulderAbduction: 3,
    hipFlexion: 1,
    sum: 18,
  },
];

const MGData = patientMG.map((item) => item.sum);
const MGxLabels = patientMG.map((item) => item.testDate);
const ptosisData = patientMG.map((item) => item.ptosis);
const doubleVisionData = patientMG.map((item) => item.doubleVision);
const eyeClosureData = patientMG.map((item) => item.eyeClosure);
const talkingData = patientMG.map((item) => item.talking);
const chewingData = patientMG.map((item) => item.chewing);
const swallowingData = patientMG.map((item) => item.swallowing);
const breathingData = patientMG.map((item) => item.breathing);
const neckFlexionData = patientMG.map((item) => item.neckFlexion);
const shoulderAbductionData = patientMG.map((item) => item.shoulderAbduction);
const hipFlexionData = patientMG.map((item) => item.hipFlexion);

const MGChart = ({
  setReplaceComponent,
  historyData,
}: {
  setReplaceComponent: (table: string) => void;
  historyData: MG[];
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
          <p>MG</p>
        </div>
        <div className="chart-footer">
          <LineChart
            margin={{ top: 100 }}
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
                data: ptosisData,
                label: "ptosis",
                color: "#5356FF",
              },
              {
                curve: "linear",
                data: doubleVisionData,
                label: "doubleVision",
                color: "#7C93C3",
              },
              {
                curve: "linear",
                data: eyeClosureData,
                label: "eyeClosure",
                color: "#2D46B9",
              },
              {
                curve: "linear",
                data: talkingData,
                label: "talking",
                color: "#0096FF",
              },
              {
                curve: "linear",
                data: chewingData,
                label: "chewing",
                color: "#7469B6",
              },
              {
                curve: "linear",
                data: swallowingData,
                label: "swallowing",
                color: "#836FFF",
              },
              {
                curve: "linear",
                data: breathingData,
                label: "breathing",
                color: "#81689D",
              },
              {
                curve: "linear",
                data: neckFlexionData,
                label: "neckFlexion",
                color: "#BC7AF9",
              },
              {
                curve: "linear",
                data: shoulderAbductionData,
                label: "shoulderAbduction",
                color: "#86A7FC",
              },
              {
                curve: "linear",
                data: hipFlexionData,
                label: "hipFlexion",
                color: "#40679E",
              },
            ]}
            xAxis={[{ scaleType: "point", data: MGxLabels }]}
          />
        </div>
      </div>
    </div>
  );
};

const MGSmallChart = ({ historyData }: { historyData: MG[] }) => {
  console.log(historyData);
  return (
    <div>
      <LineChart
        width={400}
        height={300}
        series={[
          {
            curve: "linear",
            data: MGData,
            label: "sum score",
            color: "#008dda",
          },
        ]}
        xAxis={[{ scaleType: "point", data: MGxLabels }]}
      />
    </div>
  );
};
export { MGSmallChart, MGChart };
