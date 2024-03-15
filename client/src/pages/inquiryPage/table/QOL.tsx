import * as React from "react";
import { useState } from "react";
import "./QOL.css";
import { IoIosArrowDropleftCircle } from "react-icons/io";

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
    testDate: "",
  });

  const scoreQolInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQolScore({ ...qolScore, [e.target.name]: parseFloat(e.target.value) });
  };

  let qolSum = 0;
  Object.values(qolScore)
    .slice(0, -2)
    .map((item) => (qolSum += item as number));
  qolScore["sum"] = qolSum;

  const blockLeft = Object.keys(qolScore)
    .slice(0, 7)
    .map((item) => (
      <>
        <div className="inquiry-table-QOL-content-sliderbox">
          {item}
          <input
            defaultValue="0"
            onChange={scoreQolInput}
            type="range"
            name={item}
            min="0"
            max="2"
            step="1"
            list="tickmarks"
          />

          <datalist id="tickmarks">
            <option value="0" label="0"></option>
            <option value="1" label="1"></option>
            <option value="2" label="2"></option>
          </datalist>
        </div>
      </>
    ));

  const blockRight = Object.keys(qolScore)
    .slice(7, -2)
    .map((item) => (
      <>
        <div className="inquiry-table-QOL-content-sliderbox">
          {item}
          <input
            defaultValue="0"
            onChange={scoreQolInput}
            type="range"
            name={item}
            min="0"
            max="2"
            step="1"
            list="tickmarks"
          />

          <datalist id="tickmarks">
            <option value="0" label="0"></option>
            <option value="1" label="1"></option>
            <option value="2" label="2"></option>
          </datalist>
        </div>
      </>
    ));
  return (
    <>
      <div className="inquiry-table-QOL-bg">
        <div className="inquiry-table-QOL">
          <div className="inquiry-table-QOL-head">
            <button
              className="QOL-backToRight"
              onClick={() => setReplaceComponent("right")}
            >
              <IoIosArrowDropleftCircle />
            </button>
            <p>QOL</p>
            <div className="inquiry-table-QOL-content-row-sum">
              <label htmlFor="sum">總分 : </label>
              <input type="text" id="sum" value={qolSum} name="sum" readOnly />
            </div>
          </div>
          <div className="inquiry-table-QOL-content">
            <div className="inquiry-table-QOL-content-block-left">
              <div className="inquiry-table-QOL-content-sliderbox">
                <input
                  className="inquiry-table-QOL-content-block-textfield"
                  type="date"
                  value={qolScore.testDate}
                  onChange={scoreQolInput}
                  name="testDate"
                />
              </div>
              {blockLeft}
            </div>
            <div className="inquiry-table-QOL-content-block-right">
              {blockRight}
            </div>
          </div>
          <div className="inquiry-table-QOL-submit">
            <button
              onClick={() => {
                if (confirm("確定送出結果嗎?")) {
                  console.log("送出結果：", qolScore);
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
export default QOL;
