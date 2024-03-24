import { LineChart } from "@mui/x-charts/LineChart";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import "./Chart.css";

const patientADL = [
  {
    testDate: "2024-03-21",
    talking: 1,
    chewing: 2,
    swallowing: 1,
    breathing: 3,
    brushTeethOrCombHair: 1,
    ariseFromChair: 1,
    eyelid: 0,
    sum: 7,
  },
  {
    testDate: "2024-03-22",
    talking: 3,
    chewing: 2,
    swallowing: 1,
    breathing: 0,
    brushTeethOrCombHair: 3,
    ariseFromChair: 3,
    eyelid: 1,
    sum: 21,
  },
  {
    testDate: "2024-03-30",
    talking: 2,
    chewing: 3,
    swallowing: 3,
    breathing: 3,
    brushTeethOrCombHair: 2,
    ariseFromChair: 0,
    eyelid: 0,
    sum: 14,
  },
];

const ADLData = patientADL.map((item) => item.sum);
const ADLxLabels = patientADL.map((item) => item.testDate);
const talkingData = patientADL.map((item) => item.talking);
const chewingData = patientADL.map((item) => item.chewing);
const swallowingData = patientADL.map((item) => item.swallowing);
const breathingData = patientADL.map((item) => item.breathing);
const brushTeethOrCombHairData = patientADL.map(
  (item) => item.brushTeethOrCombHair
);
const ariseFromChairData = patientADL.map((item) => item.ariseFromChair);
const eyelidData = patientADL.map((item) => item.eyelid);

const ADLChart = ({
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
          <p>ADL</p>
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
                data: ADLData,
                label: "sum score",
                color: "#008dda",
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
                data: brushTeethOrCombHairData,
                label: "brushTeethOrCombHair",
              },
              {
                curve: "linear",
                data: ariseFromChairData,
                label: "ariseFromChair",
              },
              {
                curve: "linear",
                data: eyelidData,
                label: "eyelid",
              },
            ]}
            xAxis={[{ scaleType: "point", data: ADLxLabels }]}
          />
        </div>
      </div>
    </div>
  );
};

const ADLSmallChart = () => {
  return (
    <div>
      <LineChart
        width={400}
        height={300}
        series={[
          {
            curve: "linear",
            data: ADLData,
            label: "sum score",
            color: "#008dda",
          },
        ]}
        xAxis={[{ scaleType: "point", data: ADLxLabels }]}
      />
    </div>
  );
};
export { ADLSmallChart, ADLChart };
