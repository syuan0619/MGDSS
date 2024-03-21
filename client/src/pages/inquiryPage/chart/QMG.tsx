import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const patientQMG = [
  {
    doubleVision: 2,
    ptosis: 2,
    facialMuscle: 2,
    swallowing: 2,
    speakFluency: 2,
    rightArmHeight: 2,
    leftArmHeight: 2,
    vitalCapacity: 2,
    rightHandGrid: 2,
    leftHandGrid: 2,
    headLift: 2,
    rightLegHeight: 2,
    leftLegHeight: 2,
    sum: 26,
    testDate: "2024-03-19",
  },
  {
    doubleVision: 1,
    ptosis: 1,
    facialMuscle: 1,
    swallowing: 1,
    speakFluency: 1,
    rightArmHeight: 1,
    leftArmHeight: 1,
    vitalCapacity: 1,
    rightHandGrid: 1,
    leftHandGrid: 1,
    headLift: 1,
    rightLegHeight: 1,
    leftLegHeight: 1,
    sum: 13,
    testDate: "2024-03-20",
  },
  {
    doubleVision: 3,
    ptosis: 3,
    facialMuscle: 3,
    swallowing: 3,
    speakFluency: 3,
    rightArmHeight: 3,
    leftArmHeight: 3,
    vitalCapacity: 3,
    rightHandGrid: 3,
    leftHandGrid: 3,
    headLift: 3,
    rightLegHeight: 3,
    leftLegHeight: 3,
    sum: 39,
    testDate: "2024-03-22",
  },
  {
    doubleVision: 1,
    ptosis: 1,
    facialMuscle: 1,
    swallowing: 1,
    speakFluency: 1,
    rightArmHeight: 1,
    leftArmHeight: 1,
    vitalCapacity: 1,
    rightHandGrid: 1,
    leftHandGrid: 1,
    headLift: 1,
    rightLegHeight: 1,
    leftLegHeight: 1,
    sum: 13,
    testDate: "2024-03-25",
  },
  {
    doubleVision: 3,
    ptosis: 3,
    facialMuscle: 3,
    swallowing: 3,
    speakFluency: 3,
    rightArmHeight: 3,
    leftArmHeight: 3,
    vitalCapacity: 3,
    rightHandGrid: 3,
    leftHandGrid: 3,
    headLift: 3,
    rightLegHeight: 3,
    leftLegHeight: 3,
    sum: 39,
    testDate: "2024-03-29",
  },
];

const QMGData = patientQMG.map((item) => item.sum);
const QMGxLabels = patientQMG.map((item) => item.testDate);

const QMG = () => {
  return (
    <div>
      <LineChart
        width={400}
        height={300}
        series={[
          {
            curve: "linear",
            data: QMGData,
            label: "sum score",
            color: "#008dda",
          },
        ]}
        xAxis={[{ scaleType: "point", data: QMGxLabels }]}
      />
    </div>
  );
};
export default QMG;
