import { LineChart } from "@mui/x-charts/LineChart";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import "./Chart.css";
import { BloodTest } from "../../../types/Patient";

const patientBlood = [
  {
    testDate: "2024-04-02",
    ACHR: 150,
    TSH: 130,
    freeThyroxine: 120,
    ANA: 121,
    uricAcid: 129,
  },
  {
    testDate: "2024-04-21",
    ACHR: 132,
    TSH: 124,
    freeThyroxine: 112,
    ANA: 147,
    uricAcid: 137,
  },
];
const ACHRData = patientBlood.map((item) => item.ACHR);
const TSHData = patientBlood.map((item) => item.TSH);

const freeThyroxineData = patientBlood.map((item) => item.freeThyroxine);

const ANAData = patientBlood.map((item) => item.ANA);

const uricAcidData = patientBlood.map((item) => item.uricAcid);

const BloodTestxLabels = patientBlood.map((item) => item.testDate);

const BloodTestChart = ({
  setReplaceComponent,
  historyData,
}: {
  setReplaceComponent: (table: string) => void;
  historyData: BloodTest[];
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
          <p>BloodTest</p>
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
                data: ACHRData,
                label: "ACHR",
                color: "#FF204E",
              },
              {
                curve: "linear",
                data: TSHData,
                label: "TSH",
                color: "#E36414",
              },
              {
                curve: "linear",
                data: freeThyroxineData,
                label: "freeThyroxine",
                color: "#FFBB64",
              },
              {
                curve: "linear",
                data: ANAData,
                label: "ANA",
                color: "#00DFA2",
              },
              {
                curve: "linear",
                data: uricAcidData,
                label: "uricAcid",
                color: "#687EFF",
              },
            ]}
            xAxis={[{ scaleType: "point", data: BloodTestxLabels }]}
          />
        </div>
      </div>
    </div>
  );
};

const BloodTestSmallChart = () => {
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
            data: ACHRData,
            label: "ACHR",
            color: "#008dda",
          },
        ]}
        xAxis={[{ scaleType: "point", data: BloodTestxLabels }]}
      />
    </div>
  );
};
export { BloodTestChart, BloodTestSmallChart };
