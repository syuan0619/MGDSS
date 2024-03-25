import { LineChart } from "@mui/x-charts";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import "./Chart.css";

const patientThymus = [
  {
    testDate: "2023-11-29",
    thymusStatus: 0,
    thymusDescription: "thymusDescription",
  },
  {
    testDate: "2023-11-30",
    thymusStatus: 2,
    thymusDescription: "thymusDescription",
  },
];

const ThymusData = patientThymus.map((item) => item.thymusStatus);
const ThymusxLabels = patientThymus.map((item) => item.testDate);

const ThymusChart = ({
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
                data: ThymusData,
                label: "thymusStatus",
                color: "#008dda",
              },
            ]}
            xAxis={[{ scaleType: "point", data: ThymusxLabels }]}
          />
        </div>
      </div>
    </div>
  );
};

const ThymusSmallChart = () => {
  return (
    <div>
      <LineChart
        width={400}
        height={300}
        series={[
          {
            curve: "linear",
            data: ThymusData,
            label: "thymusStatus",
            color: "#008dda",
          },
        ]}
        xAxis={[{ scaleType: "point", data: ThymusxLabels }]}
      />
    </div>
  );
};
export { ThymusChart, ThymusSmallChart };
