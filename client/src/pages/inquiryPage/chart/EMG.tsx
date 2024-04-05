import { LineChart } from "@mui/x-charts/LineChart";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import "./Chart.css";
import { EMG } from "../../../types/Patient";
import * as React from "react";
const patientEMG = [
  {
    testDate: "2024-04-13",
    imgPath: "string",
    RNS: [
      ["Right Abd dig min(man)", -2.6, -1.03, -5.4, -5.1, -5.0],
      ["Right Trapezius", -12.1, -10.9],
    ],
  },

  {
    testDate: "2024-05-02",
    imgPath: "string",
    RNS: [
      ["Right Abd dig min(man)", 3.2, 2.3, 2.1, 1.95, 2.0],
      ["Right Trapezius", -14.1, -12.6],
    ],
  },
];
const postXLabel = [1, 2, 3, 4].map((x) => x);
const EMGxLabels = patientEMG.map((item) => item.testDate);
const firstPreData = patientEMG.map((item) => item.RNS[0][1] as number);
const firstPostData = patientEMG[0]["RNS"][0]
  .slice(2)
  .map((item) => item as unknown as number);
const firstName = patientEMG.map((item) => item.RNS[0][0]);

const secPreData = patientEMG.map((item) => item.RNS[1][1] as number);
const secPostData1 = patientEMG.map((item) => item.RNS[1][2] as number);
const secName = patientEMG.map((item) => item.RNS[1][0]);

const EMGChart = ({
  setReplaceComponent,
  historyData,
}: {
  setReplaceComponent: (table: string) => void;
  historyData: EMG[];
}) => {
  console.log(historyData);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
                data: firstPostData,
                label: "post Activation",
              },
            ]}
            xAxis={[{ scaleType: "point", data: postXLabel }]}
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
            data: firstPreData,
            label: "firstName",
            color: "#008dda",
          },
        ]}
        xAxis={[{ scaleType: "point", data: EMGxLabels }]}
      />
    </div>
  );
};
export { EMGChart, EMGSmallChart };
