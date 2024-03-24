import { margin } from "@mui/system";
import { LineChart } from "@mui/x-charts/LineChart";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import "./Chart.css";

const patientQOL = [
  {
    frustration: 2,
    eyeUsing: 2,
    eating: 2,
    social: 2,
    entertainment: 2,
    fullfillFamilyNeeds: 2,
    plansNecessity: 2,
    jobState: 2,
    speaking: 2,
    driving: 2,
    depression: 2,
    walking: 2,
    beingInPublicPlaces: 2,
    overwhelm: 2,
    freshenUp: 2,
    sum: 30,
    testDate: "2024-03-09",
  },
  {
    frustration: 1,
    eyeUsing: 1,
    eating: 1,
    social: 1,
    entertainment: 1,
    fullfillFamilyNeeds: 1,
    plansNecessity: 1,
    jobState: 1,
    speaking: 1,
    driving: 1,
    depression: 2,
    walking: 2,
    beingInPublicPlaces: 2,
    overwhelm: 2,
    freshenUp: 2,
    sum: 20,
    testDate: "2024-03-15",
  },
  {
    frustration: 0,
    eyeUsing: 0,
    eating: 0,
    social: 0,
    entertainment: 0,
    fullfillFamilyNeeds: 0,
    plansNecessity: 0,
    jobState: 0,
    speaking: 0,
    driving: 0,
    depression: 0,
    walking: 0,
    beingInPublicPlaces: 0,
    overwhelm: 0,
    freshenUp: 1,
    sum: 1,
    testDate: "2024-04-29",
  },
];
const QOLData = patientQOL.map((item) => item.sum);
const QOLxLabels = patientQOL.map((item) => item.testDate);
const frustrationData = patientQOL.map((item) => item.frustration);
const eyeUsingData = patientQOL.map((item) => item.eyeUsing);
const eatingData = patientQOL.map((item) => item.eating);
const socialData = patientQOL.map((item) => item.social);
const entertainmentData = patientQOL.map((item) => item.entertainment);
const fullfillFamilyNeedsData = patientQOL.map(
  (item) => item.fullfillFamilyNeeds
);
const plansNecessityData = patientQOL.map((item) => item.plansNecessity);
const jobStateData = patientQOL.map((item) => item.jobState);
const speakingData = patientQOL.map((item) => item.speaking);
const drivingData = patientQOL.map((item) => item.driving);
const depressionData = patientQOL.map((item) => item.depression);
const walkingData = patientQOL.map((item) => item.walking);
const beingInPublicPlacesData = patientQOL.map(
  (item) => item.beingInPublicPlaces
);
const overwhelmData = patientQOL.map((item) => item.overwhelm);
const freshenUpData = patientQOL.map((item) => item.freshenUp);

// const QOLPoint = patientQOL.map((item) => {
//   typeof item === "number" ? Object.values(item) : null;
// });

const QOLChart = ({
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
          <p>QOL</p>
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
                data: QOLData,
                label: "sum score",

                color: "#008dda",
              },
              {
                curve: "linear",
                data: frustrationData,
                label: "frustration",
              },
              {
                curve: "linear",
                data: eyeUsingData,
                label: "eyeUsing",
              },
              {
                curve: "linear",
                data: eatingData,
                label: "eating",
              },
              {
                curve: "linear",
                data: socialData,
                label: "social",
              },
              {
                curve: "linear",
                data: entertainmentData,
                label: "entertainment",
              },
              {
                curve: "linear",
                data: fullfillFamilyNeedsData,
                label: "fullfillFamilyNeeds",
              },
              {
                curve: "linear",
                data: plansNecessityData,
                label: "plansNecessity",
              },
              {
                curve: "linear",
                data: jobStateData,
                label: "jobState",
              },
              {
                curve: "linear",
                data: speakingData,
                label: "speaking",
              },
              {
                curve: "linear",
                data: drivingData,
                label: "driving",
              },
              {
                curve: "linear",
                data: depressionData,
                label: "depression",
              },
              {
                curve: "linear",
                data: walkingData,
                label: "walking",
              },
              {
                curve: "linear",
                data: beingInPublicPlacesData,
                label: "beingInPublicPlaces",
              },
              {
                curve: "linear",
                data: overwhelmData,
                label: "overwhelm",
              },
              {
                curve: "linear",
                data: freshenUpData,
                label: "freshenUp",
              },
            ]}
            xAxis={[{ scaleType: "point", data: QOLxLabels }]}
          />
        </div>
      </div>
    </div>
  );
};

const QOLSmallChart = () => {
  return (
    <div>
      <LineChart
        width={400}
        height={300}
        series={[
          {
            curve: "linear",
            data: QOLData,
            label: "sum score",
            color: "#008dda",
          },
        ]}
        xAxis={[{ scaleType: "point", data: QOLxLabels }]}
      />
    </div>
  );
};
export { QOLChart, QOLSmallChart };
