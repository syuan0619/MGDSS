import { LineChart } from "@mui/x-charts/LineChart";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import "./Chart.css";
import { EMG } from "../../../types/Patient";
const patientEMG = [
  {
    testDate: "2024-04-13",
    imgPath: "string",
    RNS: 2.5,
  },
  {
    testDate: "2024-04-23",
    imgPath: "string",
    RNS: 1.5,
  },
];

const EMGxLabels = patientEMG.map((item) => item.testDate);
const EMGData = patientEMG.map((item) => item.RNS);

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
                data: EMGData,
                label: "talking",
                color: "#5356FF",
              },
            ]}
            xAxis={[{ scaleType: "point", data: EMGxLabels }]}
          />
        </div>
      </div>
    </div>
  );
};

const EMGSmallChart = () => {
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
            data: EMGData,
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
