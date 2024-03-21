import { LineChart } from "@mui/x-charts/LineChart";

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

const QOL = () => {
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
export default QOL;
