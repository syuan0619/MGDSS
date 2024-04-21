import { LineChart } from "@mui/x-charts/LineChart";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import "./Chart.css";
import { BloodTest } from "../../../types/Patient";
import { useState } from "react";

const BloodTestChart = ({
  setReplaceComponent,
  historyData,
}: {
  setReplaceComponent: (table: string) => void;
  historyData: BloodTest[];
}) => {
  const BloodTestChart_ACHRData = historyData.map((item) => item.ACHR);
  const BloodTestChart_TSHData = historyData.map((item) => item.TSH);
  const BloodTestChart_freeThyroxineData = historyData.map(
    (item) => item.freeThyroxine
  );
  const BloodTestChart_ANAData = historyData.map((item) => item.ANA);
  const BloodTestChart_uricAcidData = historyData.map((item) => item.uricAcid);
  const BloodTestChart_xLabels = historyData.map((item) => item.testDate);
  const BloodData = [
    {
      curve: "linear",
      data: BloodTestChart_ACHRData,
      label: "ACHR",
      color: "#FF204E",
    },
    {
      curve: "linear",
      data: BloodTestChart_TSHData,
      label: "TSH",
      color: "#E36414",
    },
    {
      curve: "linear",
      data: BloodTestChart_freeThyroxineData,
      label: "freeThyroxine",
      color: "#FFBB64",
    },
    {
      curve: "linear",
      data: BloodTestChart_ANAData,
      label: "ANA",
      color: "#00DFA2",
    },
    {
      curve: "linear",
      data: BloodTestChart_uricAcidData,
      label: "uricAcid",
      color: "#687EFF",
    },
  ];

  const [a, setA] =
    useState<{ curve: string; data: number[]; label: string; color: string }[]>(
      BloodData
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
    const tarData = BloodData.find((item) => item.label === label);
    if (tarData) {
      addToSelected(tarData);
    }
  };

  //selectAll
  const handleSelectAll = () => {
    if (a.length !== BloodData.length) {
      setA(BloodData);
    } else {
      setA([]);
    }
  };
  const handleChecked = (label: string) => {
    if (a.length == BloodData.length) {
      return true;
    } else if (a.some((item) => item.label !== label) == false) {
      return false;
    }
  };
  const BloodCheckbox = BloodData.map((item, index) => (
    <label style={{ color: item.color }} key={index}>
      <input
        type="checkbox"
        name={item.label}
        onChange={() => {
          selectData(item.label);
          handleChecked(item.label);
        }}
        checked={a.some((selectedItem) => selectedItem.label === item.label)}
      />
      {item.label}
    </label>
  ));
  const cancelChecked = () => {
    if (a.length < BloodData.length) {
      return false;
    } else {
      return true;
    }
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
          <p>BloodTest</p>
        </div>
        <div className="chart-footer">
          <div className="chart-footer-chart">
            <LineChart
              margin={{ top: 30 }}
              slotProps={{
                legend: {
                  itemGap: 12,
                  padding: -5,
                  itemMarkHeight: 5,
                  hidden: true,
                },
              }}
              width={600}
              height={500}
              series={a}
              xAxis={[{ scaleType: "point", data: BloodTestChart_xLabels }]}
            />
          </div>
          <div className="chart-footer-checkbox">
            <div className="chart-footer-checkbox-inner">
              <label>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  defaultChecked={true}
                  checked={cancelChecked()}
                />
                全選
              </label>
              {BloodCheckbox}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BloodTestSmallChart = ({ historyData }: { historyData: BloodTest[] }) => {
  const BloodTestSmallChart_xLabels = historyData.map((item) => item.testDate);
  const BloodTestSmallChart_ACHRData = historyData.map((item) => item.ACHR);

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
            data: BloodTestSmallChart_ACHRData,
            label: "ACHR",
            color: "#008dda",
          },
        ]}
        xAxis={[{ scaleType: "point", data: BloodTestSmallChart_xLabels }]}
      />
    </div>
  );
};
export { BloodTestChart, BloodTestSmallChart };

// const patientBlood = [
//   {
//     testDate: "2024-04-02",
//     ACHR: 150,
//     TSH: 130,
//     freeThyroxine: 120,
//     ANA: 121,
//     uricAcid: 129,
//   },
//   {
//     testDate: "2024-04-21",
//     ACHR: 132,
//     TSH: 124,
//     freeThyroxine: 112,
//     ANA: 147,
//     uricAcid: 137,
//   },
// ];
// const ACHRData = patientBlood.map((item) => item.ACHR);
// const TSHData = patientBlood.map((item) => item.TSH);

// const freeThyroxineData = patientBlood.map((item) => item.freeThyroxine);

// const ANAData = patientBlood.map((item) => item.ANA);

// const uricAcidData = patientBlood.map((item) => item.uricAcid);

// const BloodTestxLabels = patientBlood.map((item) => item.testDate);
