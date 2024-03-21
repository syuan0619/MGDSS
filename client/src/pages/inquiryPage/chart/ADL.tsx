import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { blue } from "@mui/material/colors";

const patientADL = [
  {
    testDate: "2024-03-21",
    talking: 1,
    chewing: 1,
    swallowing: 1,
    breathing: 1,
    brushTeethOrCombHair: 1,
    ariseFromChair: 1,
    eyelid: 1,
    sum: 7,
  },
  {
    testDate: "2024-03-22",
    talking: 3,
    chewing: 3,
    swallowing: 3,
    breathing: 3,
    brushTeethOrCombHair: 3,
    ariseFromChair: 3,
    eyelid: 3,
    sum: 21,
  },
  {
    testDate: "2024-03-30",
    talking: 2,
    chewing: 2,
    swallowing: 2,
    breathing: 2,
    brushTeethOrCombHair: 2,
    ariseFromChair: 2,
    eyelid: 0,
    sum: 14,
  },
];

const ADLData = patientADL.map((item) => item.sum);
const ADLxLabels = patientADL.map((item) => item.testDate);

const ADL = () => {
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
export default ADL;
