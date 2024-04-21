import { LineChart } from "@mui/x-charts/LineChart";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import "./Chart.css";
import { EMG } from "../../../types/Patient";
import * as React from "react";
import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
const patientEMG = [
  {
    testDate: "2024-04-13",
    image: "string",
    nasalis: {
      preActivation: [],
      postActivation: [],
    },
    abd: {
      preActivation: [-2.6],
      postActivation: [-1.03, -5.4, -5.1, -5.0],
    },
    trapezius: {
      preActivation: [-12.1],
      postActivation: [-10.9, -11.01, -11.3, -10.5],
    },
  },
  {
    testDate: "2024-04-22",
    image: "string",
    nasalis: {
      preActivation: [3.2],
      postActivation: [2.3, 2.1, 1.95, 2.0],
    },
    abd: {
      preActivation: [],
      postActivation: [],
    },
    trapezius: {
      preActivation: [-14.1],
      postActivation: [-12.6, -12.3, -11.8, -13.1],
    },
  },

  {
    testDate: "2024-05-02",
    image: "string",
    nasalis: {
      preActivation: [-9.4],
      postActivation: [-5.4, -10.7, -9.5, -9.3],
    },
    abd: {
      preActivation: [-4.6],
      postActivation: [3.3, -2.4, -6.0, -11.9],
    },
    trapezius: {
      preActivation: [],
      postActivation: [],
    },
  },
];
//pre and post data
const postXLabel = [1, 2, 3, 4].map((x) => x);
const EMGxLabels = patientEMG.map((item) => item.testDate);
const nasalisPreData = patientEMG.map(
  (item) => item.nasalis.preActivation[0] as unknown as null
);
const abdPreData = patientEMG.map(
  (item) => item.abd.preActivation[0] as unknown as null
);
const trapeziusPreData = patientEMG.map(
  (item) => item.trapezius.preActivation[0] as unknown as null
);
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
  //tab
  const [value, setValue] = React.useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  //////date
  const dateOptions = patientEMG.map((item) => (
    <option value={item.testDate}>{item.testDate}</option>
  ));
  const [selectedOption, setSelectedOption] = useState("");
  const ChangeDate = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedOption(event.target.value);
  };

  //select date
  const tarData = patientEMG.filter((item) => item.testDate === selectedOption);
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
    nasalisPreData,
    "abd",
    abdPreData,
    "trapezius",
    trapeziusPreData,
    tarNasalisData
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
            color: "#008dda",
          },
        ]}
        xAxis={[{ scaleType: "point", data: EMGxLabels }]}
      />
    </div>
  );
};
export { EMGChart, EMGSmallChart };
