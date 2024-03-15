import { Button, Slider } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import "./QOL.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
];

const QOL = ({
  setReplaceComponent,
}: {
  setReplaceComponent: (table: string) => void;
}) => {
  const [qolScore, setQolScore] = useState({
    frustration: 0,
    eyeUsing: 0,
    eating: 0,
    social: 0,
    entertainment: 0,
    fullfillFamilyNeeds: 0,
    plansNecessity: 0,
    jobState: 0,
    speaking: 0,
    driving: 0,
    depression: 0,
    walking: 0,
    beingInPublicPlaces: 0,
    overwhelm: 0,
    freshenUp: 0,
    sum: 0,
  });

  const scoreQolInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQolScore({ ...qolScore, [e.target.name]: e.target.value });
  };

  let qolSum = 0;
  Object.values(qolScore)
    .slice(0, -1)
    .map((item) => (qolSum += item));
  qolScore["sum"] = qolSum;

  const onSubmitQolScore = () => {
    console.log(qolScore);
  };

  const blockLeft = Object.keys(qolScore)
    .slice(0, 5)
    .map((item) => (
      <>
        <div className="inquiry-table-QOL-content-sliderbox">
          {item}
          <Slider
            valueLabelDisplay="auto"
            defaultValue={0}
            max={2}
            marks={marks}
            onChange={scoreQolInput}
            name={item}
          />
        </div>
      </>
    ));

  const blockMid = Object.keys(qolScore)
    .slice(5, 10)
    .map((item) => (
      <>
        <div className="inquiry-table-QOL-content-sliderbox">
          {item}
          <Slider
            valueLabelDisplay="auto"
            defaultValue={0}
            max={2}
            marks={marks}
            onChange={scoreQolInput}
            name={item}
          />
        </div>
      </>
    ));

  const blockRight = Object.keys(qolScore)
    .slice(10, -1)
    .map((item) => (
      <>
        <div className="inquiry-table-QOL-content-sliderbox">
          {item}
          <Slider
            valueLabelDisplay="auto"
            defaultValue={0}
            max={2}
            marks={marks}
            onChange={scoreQolInput}
            name={item}
          />
        </div>
      </>
    ));
  return (
    <>
      <div className="inquiry-table-QOL">
        <div className="inquiry-table-QOL-closebutton">
          <button
            onClick={() => setReplaceComponent("right")}
            className="inquiry-table-QOL-closebutton-item"
          >
            <CloseRoundedIcon />
          </button>
        </div>
        <div className="inquiry-table-QOL-header">QOL</div>
        <div className="inquiry-table-QOL-content">
          <div className="inquiry-table-QOL-content-block">
            <div className="inquiry-table-QOL-content-sliderbox">
              <input
                className="inquiry-table-QOL-content-block-textfield"
                type="date"
              />
            </div>
            {blockLeft}
          </div>
          <div className="inquiry-table-QOL-content-block">
            {blockMid}
            <div className="inquiry-table-QOL-content-sliderbox">
              <input
                className="inquiry-table-QOL-content-block-textfield"
                disabled
                value={qolScore["sum"]}
              />
            </div>
          </div>
          <div className="inquiry-table-QOL-content-block">
            {blockRight}
            <div className="inquiry-table-QOL-content-sliderbox">
              <button
                className="inquiry-table-QOL-content-block-buttom"
                onClick={onSubmitQolScore}
              >
                確定
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default QOL;
