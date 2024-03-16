import * as React from "react";
import { useState } from "react";
import "./QMG.css";
import { IoIosArrowDropleftCircle } from "react-icons/io";
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
    testDate: "",
  });

  const scoreQMGInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQMGScore({
      ...qmgScore,
      [e.target.name]: parseFloat(e.target.value),
    });
  };

  const dateQMGInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQMGScore({ ...qmgScore, [e.target.name]: e.target.value });
  };

  let qmgSum = 0;
  Object.values(qmgScore)
    .slice(0, -2)
    .map((item) => (qmgSum += item as number));
  qmgScore["sum"] = qmgSum;

  const blockLeft = Object.keys(qmgScore)
    .slice(0, 6)
    .map((item) => (
      <>
        <div className="inquiry-table-QMG-content-sliderbox">
          {item}
          <input
            defaultValue="0"
            onChange={scoreQMGInput}
            type="range"
            name={item}
            min="0"
            max="3"
            step="1"
            list="tickmarks"
          />

          <datalist id="tickmarks">
            <option value="0" label="0"></option>
            <option value="1" label="1"></option>
            <option value="2" label="2"></option>
            <option value="3" label="3"></option>
          </datalist>
        </div>
      </>
    ));

  const blockRight = Object.keys(qmgScore)
    .slice(6, -2)
    .map((item) => (
      <>
        <div className="inquiry-table-QMG-content-sliderbox">
          {item}
          <input
            defaultValue="0"
            onChange={scoreQMGInput}
            type="range"
            name={item}
            min="0"
            max="3"
            step="1"
            list="tickmarks"
          />

          <datalist id="tickmarks">
            <option value="0" label="0"></option>
            <option value="1" label="1"></option>
            <option value="2" label="2"></option>
            <option value="3" label="3"></option>
          </datalist>
        </div>
      </>
    ));

  return (
    <>
      <div className="inquiry-table-QMG-bg">
        <div className="inquiry-table-QMG">
          <div className="inquiry-table-QMG-head">
            <button
              className="QMG-backToRight"
              onClick={() => setReplaceComponent("right")}
            >
              <IoIosArrowDropleftCircle />
            </button>
            <p>QMG</p>
            <div className="inquiry-table-QMG-content-row-sum">
              <label htmlFor="sum">總分 : </label>
              <input type="text" id="sum" value={qmgSum} name="sum" readOnly />
            </div>
          </div>
          <div className="inquiry-table-QMG-content">
            <div className="inquiry-table-QMG-content-block-left">
              <div className="inquiry-table-QMG-content-sliderbox">
                <input
                  className="inquiry-table-QMG-content-block-textfield"
                  type="date"
                  id="qmgDate"
                  value={qmgScore.testDate}
                  onChange={dateQMGInput}
                  name="testDate"
                />
              </div>
              {blockLeft}
            </div>
            <div className="inquiry-table-QMG-content-block-right">
              {blockRight}
            </div>
          </div>
          <div className="inquiry-table-QMG-submit">
            <button
              onClick={() => {
                if (confirm("確定送出結果嗎?")) {
                  console.log("送出結果：", qmgScore);
                }
                setReplaceComponent("right");
              }}
            >
              儲存
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default QMG;
