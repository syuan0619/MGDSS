import { Slider } from "@mui/material";
import { number } from "prop-types";
import * as React from "react";
import { useState } from "react";
import "./QOL.css";
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
  return (
    <>
      <div className="inquiry-table-QOL">
        <button onClick={() => setReplaceComponent("right")}>
          backtoright
        </button>
        <div className="inquiry-table-QOL-header">QOL</div>
        <div className="inquiry-table-QOL-content">
          <div className="inquiry-table-QOL-content-block">
            <div className="inquiry-table-QOL-content-sliderbox">
              <input
                className="inquiry-table-QOL-content-block-textfield"
                type="date"
              />
            </div>
            <div className="inquiry-table-QOL-content-sliderbox">
              Frustration
              <Slider
                valueLabelDisplay="auto"
                defaultValue={0}
                max={2}
                marks={marks}
                onChange={scoreQolInput}
              />
            </div>
            <div className="inquiry-table-QOL-content-sliderbox">
              Eye Using
              <Slider
                valueLabelDisplay="auto"
                defaultValue={0}
                max={2}
                marks={marks}
              />
            </div>
            <div className="inquiry-table-QOL-content-sliderbox">
              Eating
              <Slider
                valueLabelDisplay="auto"
                defaultValue={0}
                max={2}
                marks={marks}
              />
            </div>
            <div className="inquiry-table-QOL-content-sliderbox">
              Social
              <Slider
                valueLabelDisplay="auto"
                defaultValue={0}
                max={2}
                marks={marks}
              />
            </div>
            <div className="inquiry-table-QOL-content-sliderbox">
              Entertainment
              <Slider
                valueLabelDisplay="auto"
                defaultValue={0}
                max={2}
                marks={marks}
              />
            </div>
          </div>
          <div className="inquiry-table-QOL-content-block">
            <div className="inquiry-table-QOL-content-sliderbox">
              Full Fill Family Needs
              <Slider
                valueLabelDisplay="auto"
                defaultValue={0}
                max={2}
                marks={marks}
              />
            </div>
            <div className="inquiry-table-QOL-content-sliderbox">
              Plans Necessity
              <Slider
                valueLabelDisplay="auto"
                defaultValue={0}
                max={2}
                marks={marks}
              />
            </div>
            <div className="inquiry-table-QOL-content-sliderbox">
              Job State
              <Slider
                valueLabelDisplay="auto"
                defaultValue={0}
                max={2}
                marks={marks}
              />
            </div>
            <div className="inquiry-table-QOL-content-sliderbox">
              Speaking
              <Slider
                valueLabelDisplay="auto"
                defaultValue={0}
                max={2}
                marks={marks}
              />
            </div>
            <div className="inquiry-table-QOL-content-sliderbox">
              Driving
              <Slider
                valueLabelDisplay="auto"
                defaultValue={0}
                max={2}
                marks={marks}
              />
            </div>
            <div className="inquiry-table-QOL-content-sliderbox">
              <input
                className="inquiry-table-QOL-content-block-textfield"
                disabled
              />
            </div>
          </div>
          <div className="inquiry-table-QOL-content-block">
            <div className="inquiry-table-QOL-content-sliderbox">
              Depression
              <Slider
                valueLabelDisplay="auto"
                defaultValue={0}
                max={2}
                marks={marks}
              />
            </div>
            <div className="inquiry-table-QOL-content-sliderbox">
              Walking
              <Slider
                valueLabelDisplay="auto"
                defaultValue={0}
                max={2}
                marks={marks}
              />
            </div>
            <div className="inquiry-table-QOL-content-sliderbox">
              Being In Public Places
              <Slider
                valueLabelDisplay="auto"
                defaultValue={0}
                max={2}
                marks={marks}
              />
            </div>
            <div className="inquiry-table-QOL-content-sliderbox">
              Overwhelm
              <Slider
                valueLabelDisplay="auto"
                defaultValue={0}
                max={2}
                marks={marks}
              />
            </div>
            <div className="inquiry-table-QOL-content-sliderbox">
              Freshen Up
              <Slider
                valueLabelDisplay="auto"
                defaultValue={0}
                max={2}
                marks={marks}
              />
            </div>
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
