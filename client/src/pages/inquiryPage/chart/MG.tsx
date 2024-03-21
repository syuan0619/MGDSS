import { LineChart } from "@mui/x-charts";

const patientMG = [
  {
    testDate: "2024-03-21",
    ptosis: 0,
    doubleVision: 0,
    eyeClosure: 0,
    talking: 0,
    chewing: 0,
    swallowing: 0,
    breathing: 0,
    neckFlexion: 0,
    shoulderAbduction: 0,
    hipFlexion: 0,
    sum: 0,
  },
  {
    testDate: "2024-03-31",
    ptosis: 3,
    doubleVision: 3,
    eyeClosure: 3,
    talking: 3,
    chewing: 3,
    swallowing: 3,
    breathing: 3,
    neckFlexion: 3,
    shoulderAbduction: 3,
    hipFlexion: 3,
    sum: 30,
  },
];

const MGData = patientMG.map((item) => item.sum);
const MGxLabels = patientMG.map((item) => item.testDate);

const MG = () => {
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
export default MG;
