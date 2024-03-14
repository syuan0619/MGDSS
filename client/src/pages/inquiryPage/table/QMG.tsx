import { Button, Slider } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import "./QMG.css";
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
  {
    value: 3,
    label: "3",
  },
];

const QMG = ({
  setReplaceComponent,
}: {
  setReplaceComponent: (table: string) => void;
}) => {
  const [qmgScore, setQMGScore] = useState({
    doubleVision: 0,
    ptosis: 0,
    facialMuscle: 0,
    swallowing: 0,
    speakFluency: 0,
    rightArmHeight: 0,
    leftArmHeight: 0,
    vitalCapacity: 0,
    rightHandGrid: 0,
    leftHandGrid: 0,
    headLift: 0,
    rightLegHeight: 0,
    leftLegHeight: 0,
    sum: 0,
  });

  const scoreQMGInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQMGScore({
      ...qmgScore,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitQMGScore = () => {
    console.log(qmgScore);
  };

  let qmgSum = 0;
  Object.values(qmgScore)
    .slice(0, -1)
    .map((item) => (qmgSum += item));
  qmgScore["sum"] = qmgSum;

  const blockLeft = Object.keys(qmgScore)
    .slice(0, 5)
    .map((item, index) => (
      <>
        <div className="inquiry-table-QMG-content-sliderbox">
          {item}
          <Slider
            valueLabelDisplay="auto"
            defaultValue={0}
            max={3}
            marks={marks}
            onChange={scoreQMGInput}
            name={item}
            key={index}
          />
        </div>
      </>
    ));

  const blockMid = Object.keys(qmgScore)
    .slice(5, 9)
    .map((item, index) => (
      <>
        <div className="inquiry-table-QMG-content-sliderbox">
          {item}
          <Slider
            valueLabelDisplay="auto"
            defaultValue={0}
            max={3}
            marks={marks}
            onChange={scoreQMGInput}
            name={item}
            key={index}
          />
        </div>
      </>
    ));

  const blockRight = Object.keys(qmgScore)
    .slice(9, -1)
    .map((item, index) => (
      <>
        <div className="inquiry-table-QMG-content-sliderbox">
          {item}
          <Slider
            valueLabelDisplay="auto"
            defaultValue={0}
            max={3}
            marks={marks}
            onChange={scoreQMGInput}
            name={item}
            key={index}
          />
        </div>
      </>
    ));

  return (
    <>
      <div className="inquiry-table-QMG">
        <div className="inquiry-table-QMG-closebutton">
          <Button onClick={() => setReplaceComponent("right")}>
            <CloseRoundedIcon />
          </Button>
        </div>
        <div className="inquiry-table-QMG-header">QMG</div>
        <div className="inquiry-table-QMG-content">
          <div className="inquiry-table-QMG-content-block">
            <div className="inquiry-table-QMG-content-sliderbox">
              <input
                className="inquiry-table-QMG-content-block-textfield"
                type="date"
              />
            </div>
            {blockLeft}
          </div>
          <div className="inquiry-table-QMG-content-block">
            {blockMid}
            <div className="inquiry-table-QOL-content-sliderbox">
              <input
                className="inquiry-table-QOL-content-block-textfield"
                disabled
                value={qmgScore["sum"]}
              />
            </div>
          </div>
          <div className="inquiry-table-QMG-content-block">
            {blockRight}

            <div className="inquiry-table-QOL-content-sliderbox">
              <button
                className="inquiry-table-QOL-content-block-buttom"
                onClick={onSubmitQMGScore}
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
export default QMG;
