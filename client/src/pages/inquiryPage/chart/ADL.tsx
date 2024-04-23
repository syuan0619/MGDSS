import { LineChart } from "@mui/x-charts/LineChart";
import { useState } from "react";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { ADL } from "../../../types/Patient";
import "./Chart.css";

const ADLChart = ({
  setReplaceComponent,
  historyData,
}: {
  setReplaceComponent: (table: string) => void;
  historyData: ADL[];
}) => {
  const ADLChart_xLabels = historyData.map((item) => item.testDate);
  const ADLChart_talkingData = historyData.map((item) => item.talking);
  const ADLChart_chewingData = historyData.map((item) => item.chewing);
  const ADLChart_swallowingData = historyData.map((item) => item.swallowing);
  const ADLChart_breathingData = historyData.map((item) => item.breathing);
  const ADLChart_brushTeethOrCombHairData = historyData.map(
    (item) => item.brushTeethOrCombHair
  );
  const ADLChart_ariseFromChairData = historyData.map(
    (item) => item.ariseFromChair
  );
  const ADLChart_eyelidData = historyData.map((item) => item.eyelid);
  const data = [
    {
      curve: "linear",
      data: ADLChart_talkingData,
      label: "talking",
      color: "#FF204E",
    },
    {
      curve: "linear",
      data: ADLChart_chewingData,
      label: "chewing",
      color: "#FF7ED4",
    },
    {
      curve: "linear",
      data: ADLChart_swallowingData,
      label: "swallowing",
      color: "#E36414",
    },
    {
      curve: "linear",
      data: ADLChart_breathingData,
      label: "breathing",
      color: "#FFBB64",
    },
    {
      curve: "linear",
      data: ADLChart_brushTeethOrCombHairData,
      label: "brushTeethOrCombHair",
      color: "#FAEF5D",
    },
    {
      curve: "linear",
      data: ADLChart_ariseFromChairData,
      label: "ariseFromChair",
      color: "#00DFA2",
    },
    {
      curve: "linear",
      data: ADLChart_eyelidData,
      label: "eyelid",
      color: "#0B666A",
    },
  ];
  const [a, setA] =
    useState<{ curve: string; data: number[]; label: string; color: string }[]>(
      data
    );
  const addToSelected = (item: {
    curve: string;
    data: number[];
    label: string;
    color: string;
  }) => {
    const exist = a.some((tarData) => tarData.label === item.label);
    const deleteExist = a.filter((x) => x.label !== item.label);
    if (!exist) {
      setA([...a, item]);
    } else if (exist == true) {
      setA(deleteExist);
    }
  };

  const selectData = (label: string) => {
    const tarData = data.find((item) => item.label === label);
    if (tarData) {
      addToSelected(tarData);
    }
  };
  const ADLCheckbox = data.map((item) => (
    <label style={{ color: item.color }}>
      <input
        type="checkbox"
        name={item.label}
        defaultChecked={true}
        onChange={() => selectData(item.label)}
      />
      {item.label}
    </label>
  ));

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
          <div className="chart-footer-chart">
            <LineChart
              margin={{ top: 30 }}
              slotProps={{
                legend: {
                  itemGap: 15,
                  padding: -5,
                  itemMarkHeight: 5,
                  hidden: true,
                },
              }}
              width={600}
              height={500}
              series={a}
              xAxis={[{ scaleType: "point", data: ADLChart_xLabels }]}
            />
          </div>
          <div className="chart-footer-checkbox">
            <div className="chart-footer-checkbox-inner">
              <label>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={cancelChecked()}
                />
                全選
              </label>
              {ADLCheckbox}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ADLSmallChart = ({ historyData }: { historyData: ADL[] }) => {
  const ADLSmallChart_Data = historyData.map((item) => item.sum);
  const ADLSmallChart_xLabels = historyData.map((item) => item.testDate);

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
            data: ADLSmallChart_Data,
            label: "sum score",
            color: "#008dda",
          },
        ]}
        xAxis={[{ scaleType: "point", data: ADLSmallChart_xLabels }]}
      />
    </div>
  );
};
export { ADLSmallChart, ADLChart };

// const patientADL = [
//   {
//     testDate: "2024-03-21",
//     talking: 1,
//     chewing: 2,
//     swallowing: 1,
//     breathing: 3,
//     brushTeethOrCombHair: 1,
//     ariseFromChair: 1,
//     eyelid: 0,
//     sum: 7,
//   },
//   {
//     testDate: "2024-03-22",
//     talking: 3,
//     chewing: 2,
//     swallowing: 1,
//     breathing: 0,
//     brushTeethOrCombHair: 3,
//     ariseFromChair: 3,
//     eyelid: 1,
//     sum: 21,
//   },
//   {
//     testDate: "2024-03-30",
//     talking: 2,
//     chewing: 3,
//     swallowing: 3,
//     breathing: 3,
//     brushTeethOrCombHair: 2,
//     ariseFromChair: 0,
//     eyelid: 0,
//     sum: 14,
//   },
// ];

// const ADLData = patientADL.map((item) => item.sum);
// const ADLxLabels = patientADL.map((item) => item.testDate);
// const talkingData = patientADL.map((item) => item.talking);
// const chewingData = patientADL.map((item) => item.chewing);
// const swallowingData = patientADL.map((item) => item.swallowing);
// const breathingData = patientADL.map((item) => item.breathing);
// const brushTeethOrCombHairData = patientADL.map(
//   (item) => item.brushTeethOrCombHair
// );
// const ariseFromChairData = patientADL.map((item) => item.ariseFromChair);
// const eyelidData = patientADL.map((item) => item.eyelid);
