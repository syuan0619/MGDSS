import { LineChart } from "@mui/x-charts/LineChart";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import "./Chart.css";
import { EMG } from "../../../types/Patient";
import * as React from "react";
import { Tab, Tabs } from "@mui/material";
import { useState } from "react";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <div>{children}</div>}
    </div>
  );
}

const EMGChart = ({
  setReplaceComponent,
  historyData,
}: {
  setReplaceComponent: (table: string) => void;
  historyData: EMG[];
}) => {
  //pre and post data
  const postXLabel = [1, 2, 3, 4].map((x) => x);
  const EMGxLabels = historyData.map((item) => item.testDate);
  const nasalisPreData = historyData.map(
    (item) => item["nasalis"]["preActivation"] as unknown as null
  );
  const abdPreData = historyData.map(
    (item) => item["abd"]["preActivation"] as unknown as null
  );
  const trapeziusPreData = historyData.map(
    (item) => item["trapezius"]["preActivation"] as unknown as null
  );

  //tab
  const [value, setValue] = React.useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  //date
  const dateOptions = historyData.map((item) => (
    <option value={item.testDate}>{item.testDate}</option>
  ));
  const [selectedOption, setSelectedOption] = useState("");
  const ChangeDate = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedOption(event.target.value);
  };

  //select date
  const tarData = historyData.filter(
    (item) => item.testDate === selectedOption
  );
  const tarNasalisData =
    tarData[0]?.nasalis?.postActivation?.map(
      (item) => item as unknown as null
    ) ?? [];
  const tarAbdData =
    tarData[0]?.abd?.postActivation?.map((item) => item as unknown as null) ??
    [];
  const tarTrapeziusData =
    tarData[0]?.trapezius?.postActivation?.map(
      (item) => item as unknown as null
    ) ?? [];

  console.log(
    "nasalis:",
    tarNasalisData,
    "abd",
    tarAbdData,
    "trapezius",
    tarTrapeziusData
  );
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
          <p>EMG</p>
        </div>
        <div className="chart-footer" style={{ flexDirection: "column" }}>
          <div
            style={{
              height: "100%",
              margin: "3vh",
            }}
          >
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Pre Activation" {...a11yProps(0)} />
              <Tab label="Post Activation" {...a11yProps(1)} />
            </Tabs>
          </div>
          <TabPanel value={value} index={0}>
            <LineChart
              margin={{ top: 50 }}
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
                  data: nasalisPreData,
                  label: "Nasalis",
                  connectNulls: true,
                },
                {
                  curve: "linear",
                  data: abdPreData,
                  label: "Abd",
                  connectNulls: true,
                },
                {
                  curve: "linear",
                  data: trapeziusPreData,
                  label: "Trapezius",
                  connectNulls: true,
                },
              ]}
              xAxis={[{ scaleType: "point", data: EMGxLabels }]}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div
              style={{
                position: "absolute",
                top: "30vh",
                right: "5vw",
                width: "12vw",
                height: "5vh",
              }}
            >
              <select
                value={selectedOption}
                onChange={ChangeDate}
                style={{ width: "100%", height: "100%" }}
              >
                {dateOptions}
              </select>
            </div>

            <LineChart
              margin={{ top: 50 }}
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
                  data: tarNasalisData,
                  label: "Nasalis",
                },
                {
                  curve: "linear",
                  data: tarAbdData,
                  label: "Abd",
                },
                {
                  curve: "linear",
                  data: tarTrapeziusData,
                  label: "Trapezius",
                },
              ]}
              xAxis={[{ scaleType: "point", data: postXLabel }]}
            />
          </TabPanel>
        </div>
      </div>
    </div>
  );
};

const EMGSmallChart = ({ historyData }: { historyData: EMG[] }) => {
  //pre and post data
  const EMGxLabels = historyData.map((item) => item.testDate);
  const nasalisPreData = historyData.map(
    (item) => item["nasalis"]["preActivation"] as unknown as null
  );
  const abdPreData = historyData.map(
    (item) => item["abd"]["preActivation"] as unknown as null
  );
  const trapeziusPreData = historyData.map(
    (item) => item["trapezius"]["preActivation"] as unknown as null
  );

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
            data: nasalisPreData,
            label: "Nasalis",
          },
          {
            curve: "linear",
            data: abdPreData,
            label: "Abd",
            connectNulls: true,
          },
          {
            curve: "linear",
            data: trapeziusPreData,
            label: "Trapezius",
            connectNulls: true,
          },
        ]}
        xAxis={[{ scaleType: "point", data: EMGxLabels }]}
      />
    </div>
  );
};
export { EMGChart, EMGSmallChart };
