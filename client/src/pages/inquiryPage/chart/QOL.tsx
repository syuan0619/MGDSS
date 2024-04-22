import { LineChart } from "@mui/x-charts/LineChart";
import { useState } from "react";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { QOL } from "../../../types/Patient";
import "./Chart.css";

const QOLChart = ({
  setReplaceComponent,
  historyData,
}: {
  setReplaceComponent: (table: string) => void;
  historyData: QOL[];
}) => {
  const QOLChart_xLabels = historyData.map((item) => item.testDate);
  const QOLChart_frustrationData = historyData.map((item) => item.frustration);
  const QOLChart_eyeUsingData = historyData.map((item) => item.eyeUsing);
  const QOLChart_eatingData = historyData.map((item) => item.eating);
  const QOLChart_socialData = historyData.map((item) => item.social);
  const QOLChart_entertainmentData = historyData.map(
    (item) => item.entertainment
  );
  const QOLChart_fullfillFamilyNeedsData = historyData.map(
    (item) => item.fullfillFamilyNeeds
  );
  const QOLChart_plansNecessityData = historyData.map(
    (item) => item.plansNecessity
  );
  const QOLChart_jobStateData = historyData.map((item) => item.jobState);
  const QOLChart_speakingData = historyData.map((item) => item.speaking);
  const QOLChart_drivingData = historyData.map((item) => item.driving);
  const QOLChart_depressionData = historyData.map((item) => item.depression);
  const QOLChart_walkingData = historyData.map((item) => item.walking);
  const QOLChart_beingInPublicPlacesData = historyData.map(
    (item) => item.beingInPublicPlaces
  );
  const QOLChart_overwhelmData = historyData.map((item) => item.overwhelm);
  const QOLChart_freshenUpData = historyData.map((item) => item.freshenUp);
  const QOLData = [
    {
      curve: "linear",
      data: QOLChart_frustrationData,
      label: "frustration",
      color: "#FF204E",
    },
    {
      curve: "linear",
      data: QOLChart_eyeUsingData,
      label: "eyeUsing",
      color: "#F7418F",
    },
    {
      curve: "linear",
      data: QOLChart_eatingData,
      label: "eating",
      color: "#E36414",
    },
    {
      curve: "linear",
      data: QOLChart_socialData,
      label: "social",
      color: "#FFBB64",
    },
    {
      curve: "linear",
      data: QOLChart_entertainmentData,
      label: "entertainment",
      color: "#37B5B6",
    },
    {
      curve: "linear",
      data: QOLChart_fullfillFamilyNeedsData,
      label: "fullfillFamilyNeeds",
      color: "#00DFA2",
    },
    {
      curve: "linear",
      data: QOLChart_plansNecessityData,
      label: "plansNecessity",
      color: "#0B666A",
    },
    {
      curve: "linear",
      data: QOLChart_jobStateData,
      label: "jobState",
      color: "#2F58CD",
    },
    {
      curve: "linear",
      data: QOLChart_speakingData,
      label: "speaking",
      color: "#80B3FF",
    },
    {
      curve: "linear",
      data: QOLChart_drivingData,
      label: "driving",
      color: "#9400FF",
    },
    {
      curve: "linear",
      data: QOLChart_depressionData,
      label: "depression",
      color: "#E26EE5",
    },
    {
      curve: "linear",
      data: QOLChart_walkingData,
      label: "walking",
      color: "#7C81AD",
    },
    {
      curve: "linear",
      data: QOLChart_beingInPublicPlacesData,
      label: "beingInPublicPlaces",
      color: "#706233",
    },
    {
      curve: "linear",
      data: QOLChart_overwhelmData,
      label: "overwhelm",
      color: "#EAD7BB",
    },
    {
      curve: "linear",
      data: QOLChart_freshenUpData,
      label: "freshenUp",
      color: "#F4EAE0",
    },
  ];
  const [a, setA] =
    useState<{ curve: string; data: number[]; label: string; color: string }[]>(
      QOLData
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
    const tarData = QOLData.find((item) => item.label === label);
    if (tarData) {
      addToSelected(tarData);
    }
  };

  //selectAll
  const handleSelectAll = () => {
    if (a.length !== QOLData.length) {
      setA(QOLData);
    } else {
      setA([]);
    }
  };

  const handleChecked = (label: string) => {
    if (a.length == QOLData.length) {
      return true;
    } else if (a.some((item) => item.label !== label) == false) {
      return false;
    }
  };

  const QOLCheckbox = QOLData.map((item, index) => (
    <>
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
    </>
  ));

  const cancelChecked = () => {
    if (a.length < QOLData.length) {
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
          <p>QOL</p>
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
              xAxis={[{ scaleType: "point", data: QOLChart_xLabels }]}
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
              {QOLCheckbox}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const QOLSmallChart = ({ historyData }: { historyData: QOL[] }) => {
  const QOLSmallChart_Data = historyData.map((item) => item.sum);
  const QOLSmallChart_xLabels = historyData.map((item) => item.testDate);

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
            data: QOLSmallChart_Data,
            label: "sum score",
            color: "#008dda",
          },
        ]}
        xAxis={[{ scaleType: "point", data: QOLSmallChart_xLabels }]}
      />
    </div>
  );
};
export { QOLChart, QOLSmallChart };

// const patientQOL = [
//   {
//     frustration: 2,
//     eyeUsing: 2,
//     eating: 2,
//     social: 2,
//     entertainment: 2,
//     fullfillFamilyNeeds: 2,
//     plansNecessity: 2,
//     jobState: 2,
//     speaking: 2,
//     driving: 2,
//     depression: 0,
//     walking: 2,
//     beingInPublicPlaces: 1,
//     overwhelm: 3,
//     freshenUp: 3,
//     sum: 30,
//     testDate: "2024-03-09",
//   },
//   {
//     frustration: 2,
//     eyeUsing: 1,
//     eating: 3,
//     social: 1,
//     entertainment: 1,
//     fullfillFamilyNeeds: 1,
//     plansNecessity: 1,
//     jobState: 0,
//     speaking: 1,
//     driving: 1,
//     depression: 2,
//     walking: 2,
//     beingInPublicPlaces: 2,
//     overwhelm: 2,
//     freshenUp: 2,
//     sum: 20,
//     testDate: "2024-03-15",
//   },
//   {
//     frustration: 0,
//     eyeUsing: 3,
//     eating: 0,
//     social: 0,
//     entertainment: 2,
//     fullfillFamilyNeeds: 0,
//     plansNecessity: 1,
//     jobState: 1,
//     speaking: 3,
//     driving: 0,
//     depression: 0,
//     walking: 2,
//     beingInPublicPlaces: 0,
//     overwhelm: 0,
//     freshenUp: 1,
//     sum: 1,
//     testDate: "2024-04-29",
//   },
// ];
// const QOLData = patientQOL.map((item) => item.sum);
// const QOLxLabels = patientQOL.map((item) => item.testDate);
// const frustrationData = patientQOL.map((item) => item.frustration);
// const eyeUsingData = patientQOL.map((item) => item.eyeUsing);
// const eatingData = patientQOL.map((item) => item.eating);
// const socialData = patientQOL.map((item) => item.social);
// const entertainmentData = patientQOL.map((item) => item.entertainment);
// const fullfillFamilyNeedsData = patientQOL.map(
//   (item) => item.fullfillFamilyNeeds
// );
// const plansNecessityData = patientQOL.map((item) => item.plansNecessity);
// const jobStateData = patientQOL.map((item) => item.jobState);
// const speakingData = patientQOL.map((item) => item.speaking);
// const drivingData = patientQOL.map((item) => item.driving);
// const depressionData = patientQOL.map((item) => item.depression);
// const walkingData = patientQOL.map((item) => item.walking);
// const beingInPublicPlacesData = patientQOL.map(
//   (item) => item.beingInPublicPlaces
// );
// const overwhelmData = patientQOL.map((item) => item.overwhelm);
// const freshenUpData = patientQOL.map((item) => item.freshenUp);

// const QOLPoint = patientQOL.map((item) => {
//   typeof item === "number" ? Object.values(item) : null;
// });
