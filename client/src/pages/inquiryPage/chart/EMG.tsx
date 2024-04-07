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
    imgPath: "string",
    RNS: [
      ["Right Abd dig min(man)", -2.6, -1.03, -5.4, -5.1, -5.0],
      ["Right Trapezius", -12.1, -10.9],
    ],
  },

  {
    testDate: "2024-05-02",
    imgPath: "string",
    RNS: [
      ["Right Abd dig min(man)", 3.2, 2.3, 2.1, 1.95, 2.0],
      ["Right Trapezius", -14.1, -12.6],
    ],
  },
];
//pre and post data
const postXLabel = [1, 2, 3, 4].map((x) => x);
const EMGxLabels = patientEMG.map((item) => item.testDate);
const firstPreData = patientEMG.map((item) => item.RNS[0][1] as number);
const firstName = patientEMG.map((item) => item.RNS[0][0] as string)[0];
const secPreData = patientEMG.map((item) => item.RNS[1][1] as number);
const secName = patientEMG.map((item) => item.RNS[1][0] as string)[0];

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
  console.log(historyData);

  //tab
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
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
  const tarDate = selectedOption;
  const tarData = patientEMG.filter((item) => item.testDate === tarDate);
  const firstPostData =
    tarData[0]?.["RNS"]?.[0]
      ?.slice(2)
      ?.map((item) => item as unknown as number) ?? [];

  const secPostData =
    tarData[0]?.["RNS"]?.[1]
      ?.slice(2)
      ?.map((item) => item as unknown as number) ?? [];

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
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
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
                  data: firstPreData,
                  label: firstName,
                },
                {
                  curve: "linear",
                  data: secPreData,
                  label: secName,
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
                value={tarDate}
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
                  data: firstPostData,
                  label: firstName,
                  color: "#008dda",
                },
                {
                  curve: "linear",
                  data: secPostData,
                  label: secName,
                  color: "#008dda",
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
  console.log(historyData);
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
            data: firstPreData,
            label: firstName,
            color: "#008dda",
          },
        ]}
        xAxis={[{ scaleType: "point", data: EMGxLabels }]}
      />
    </div>
  );
};
export { EMGChart, EMGSmallChart };
