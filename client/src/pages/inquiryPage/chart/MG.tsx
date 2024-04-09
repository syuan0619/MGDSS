import { LineChart } from "@mui/x-charts";
import { useState } from "react";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { MG } from "../../../types/Patient";
import "./Chart.css";

const MGChart = ({
  setReplaceComponent,
  historyData,
}: {
  setReplaceComponent: (table: string) => void;
  historyData: MG[];
}) => {
  const MGChart_xLabels = historyData.map((item) => item.testDate);
  const MGChart_ptosisData = historyData.map((item) => item.ptosis);
  const MGChart_doubleVisionData = historyData.map((item) => item.doubleVision);
  const MGChart_eyeClosureData = historyData.map((item) => item.eyeClosure);
  const MGChart_talkingData = historyData.map((item) => item.talking);
  const MGChart_chewingData = historyData.map((item) => item.chewing);
  const MGChart_swallowingData = historyData.map((item) => item.swallowing);
  const MGChart_breathingData = historyData.map((item) => item.breathing);
  const MGChart_neckFlexionData = historyData.map((item) => item.neckFlexion);
  const MGChart_shoulderAbductionData = historyData.map(
    (item) => item.shoulderAbduction
  );
  const MGChart_hipFlexionData = historyData.map((item) => item.hipFlexion);

  const MGData = [
    {
      curve: "linear",
      data: MGChart_ptosisData,
      label: "ptosis",
      color: "#FF204E",
    },
    {
      curve: "linear",
      data: MGChart_doubleVisionData,
      label: "doubleVision",
      color: "#FF7ED4",
    },
    {
      curve: "linear",
      data: MGChart_eyeClosureData,
      label: "eyeClosure",
      color: "#E36414",
    },
    {
      curve: "linear",
      data: MGChart_talkingData,
      label: "talking",
      color: "#FFBB64",
    },
    {
      curve: "linear",
      data: MGChart_chewingData,
      label: "chewing",
      color: "#FAEF5D",
    },
    {
      curve: "linear",
      data: MGChart_swallowingData,
      label: "swallowing",
      color: "#00DFA2",
    },
    {
      curve: "linear",
      data: MGChart_breathingData,
      label: "breathing",
      color: "#0B666A",
    },
    {
      curve: "linear",
      data: MGChart_neckFlexionData,
      label: "neckFlexion",
      color: "#2F58CD",
    },
    {
      curve: "linear",
      data: MGChart_shoulderAbductionData,
      label: "shoulderAbduction",
      color: "#80B3FF",
    },
    {
      curve: "linear",
      data: MGChart_hipFlexionData,
      label: "hipFlexion",
      color: "#9400FF",
    },
  ];

  const [a, setA] =
    useState<{ curve: string; data: number[]; label: string; color: string }[]>(
      MGData
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
    const tarData = MGData.find((item) => item.label === label);
    if (tarData) {
      addToSelected(tarData);
    }
  };
  const MGCheckbox = MGData.map((item) => (
    <>
      <label>
        <input
          type="checkbox"
          name={item.label}
          defaultChecked={true}
          onChange={() => selectData(item.label)}
        />
        {item.label}
      </label>
    </>
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
          <p>MG</p>
        </div>
        <div className="chart-footer">
          <div className="chart-footer-chart">
            <LineChart
              margin={{ top: 100 }}
              slotProps={{
                legend: {
                  itemGap: 12,
                  padding: -5,
                  itemMarkHeight: 5,
                },
              }}
              width={600}
              height={500}
              series={a}
              xAxis={[{ scaleType: "point", data: MGChart_xLabels }]}
            />
          </div>
          <div className="chart-footer-checkbox">
            <div className="chart-footer-checkbox-inner">
              目前顯示:{MGCheckbox}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MGSmallChart = ({ historyData }: { historyData: MG[] }) => {
  const MGSmallChart_Data = historyData.map((item) => item.sum);
  const MGSmallChart_xLabels = historyData.map((item) => item.testDate);

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
            data: MGSmallChart_Data,
            label: "sum score",
            color: "#008dda",
          },
        ]}
        xAxis={[{ scaleType: "point", data: MGSmallChart_xLabels }]}
      />
    </div>
  );
};
export { MGSmallChart, MGChart };

// const patientMG = [
//   {
//     testDate: "2024-03-21",
//     ptosis: 0,
//     doubleVision: 1,
//     eyeClosure: 2,
//     talking: 3,
//     chewing: 2,
//     swallowing: 0,
//     breathing: 0,
//     neckFlexion: 1,
//     shoulderAbduction: 0,
//     hipFlexion: 3,
//     sum: 0,
//   },
//   {
//     testDate: "2024-03-31",
//     ptosis: 3,
//     doubleVision: 1,
//     eyeClosure: 3,
//     talking: 0,
//     chewing: 0,
//     swallowing: 2,
//     breathing: 1,
//     neckFlexion: 2,
//     shoulderAbduction: 3,
//     hipFlexion: 2,
//     sum: 18,
//   },
//   {
//     testDate: "2024-04-13",
//     ptosis: 1,
//     doubleVision: 2,
//     eyeClosure: 1,
//     talking: 2,
//     chewing: 2,
//     swallowing: 1,
//     breathing: 2,
//     neckFlexion: 0,
//     shoulderAbduction: 0,
//     hipFlexion: 3,
//     sum: 11,
//   },
//   {
//     testDate: "2024-05-23",
//     ptosis: 2,
//     doubleVision: 1,
//     eyeClosure: 3,
//     talking: 1,
//     chewing: 2,
//     swallowing: 3,
//     breathing: 0,
//     neckFlexion: 2,
//     shoulderAbduction: 3,
//     hipFlexion: 1,
//     sum: 18,
//   },
// ];

// const MGData = patientMG.map((item) => item.sum);
// const MGxLabels = patientMG.map((item) => item.testDate);
// const ptosisData = patientMG.map((item) => item.ptosis);
// const doubleVisionData = patientMG.map((item) => item.doubleVision);
// const eyeClosureData = patientMG.map((item) => item.eyeClosure);
// const talkingData = patientMG.map((item) => item.talking);
// const chewingData = patientMG.map((item) => item.chewing);
// const swallowingData = patientMG.map((item) => item.swallowing);
// const breathingData = patientMG.map((item) => item.breathing);
// const neckFlexionData = patientMG.map((item) => item.neckFlexion);
// const shoulderAbductionData = patientMG.map((item) => item.shoulderAbduction);
// const hipFlexionData = patientMG.map((item) => item.hipFlexion);
