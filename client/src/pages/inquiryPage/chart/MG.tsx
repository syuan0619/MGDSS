import { LineChart } from "@mui/x-charts";
import { IoIosArrowDropleftCircle } from "react-icons/io";

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
          <p>MG</p>
        </div>
        <div className="chart-footer">
          <LineChart
            width={700}
            height={500}
            series={[
              {
                curve: "linear",
                data: MGData,
                label: "sum score",
                color: "#008dda",
              },
              {
                curve: "linear",
                data: ptosisData,
                label: "ptosis",
              },
              {
                curve: "linear",
                data: doubleVisionData,
                label: "doubleVision",
              },
              {
                curve: "linear",
                data: eyeClosureData,
                label: "eyeClosure",
              },
              {
                curve: "linear",
                data: talkingData,
                label: "talking",
              },
              {
                curve: "linear",
                data: chewingData,
                label: "chewing",
              },
              {
                curve: "linear",
                data: swallowingData,
                label: "swallowing",
              },
              {
                curve: "linear",
                data: breathingData,
                label: "breathing",
              },
              {
                curve: "linear",
                data: neckFlexionData,
                label: "neckFlexion",
              },
              {
                curve: "linear",
                data: shoulderAbductionData,
                label: "shoulderAbduction",
              },
              {
                curve: "linear",
                data: hipFlexionData,
                label: "hipFlexion",
              },
            ]}
            xAxis={[{ scaleType: "point", data: MGxLabels }]}
          />
        </div>
      </div>
    </div>
  );
};

const MGSmallChart = () => {
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
