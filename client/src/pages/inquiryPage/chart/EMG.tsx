import { LineChart } from "@mui/x-charts/LineChart";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import "./Chart.css";
import { EMG } from "../../../types/Patient";
const patientEMG = [
  {
    testDate: "2024-04-13",
    imgPath: "string",
    RNS: {
      musclePart: "string",
      preActivation: [2, 5, 7],
      postActivation: [3, 4, 8],
    },
  },
  {
    testDate: "2024-04-23",
    imgPath: "string",
    RNS: {
      musclePart: "string",
      preActivation: [3, 4, 5],
      postActivation: [2, 6, 5],
    },
  },
  {
    testDate: "2024-05-21",
    imgPath: "string",
    RNS: {
      musclePart: "string",
      preActivation: [3, 2, 5],
      postActivation: [2, 5, 5],
    },
  },
];

const EMGxLabels = patientEMG.map((item) => item.testDate);
const preData = patientEMG
  .map((item) => ({
    preActivation: item.RNS.preActivation,
  }))
  .map((x) => x.preActivation[1]);

const postData = patientEMG
  .map((item) => ({
    postActivation: item.RNS.postActivation,
  }))
  .map((x) => x.postActivation[1]);
const EMGChart = ({
  setReplaceComponent,
  historyData,
}: {
  setReplaceComponent: (table: string) => void;
  historyData: EMG[];
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
          <p>EMG</p>
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
                data: preData,
                label: "preActivation",
              },
              {
                curve: "linear",
                data: postData,
                label: "postActivation",
              },
            ]}
            xAxis={[{ scaleType: "point", data: EMGxLabels }]}
          />
        </div>
      </div>
    </div>
  );
};

const EMGSmallChart = ({ historyData }: { historyData: EMG[] }) => {
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
            data: preData,
            label: "amp",
            color: "#008dda",
          },
        ]}
        xAxis={[{ scaleType: "point", data: EMGxLabels }]}
      />
    </div>
  );
};
export { EMGChart, EMGSmallChart };
