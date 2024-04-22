import * as React from "react";
import { useState } from "react";
import "./QMG.css";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import api from "../../../api";
import { QMG as typeQMG } from "../../../types/Patient";
import { useParams } from "react-router-dom";

const QMG = ({
  setReplaceComponent,
}: {
  setReplaceComponent: (table: string) => void;
}) => {
  const routeParams = useParams();

  const [QMGscore, setQMGscore] = useState<typeQMG>({
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    beforeChangedParam: number
  ) => {
    const { name, value } = e.target;

    if (name === "testDate") {
      setQMGscore({ ...QMGscore, testDate: value });
    } else {
      const numericValue = parseInt(value, 10);

      setQMGscore({
        ...QMGscore,
        [name]: numericValue,
        sum: QMGscore.sum + numericValue - beforeChangedParam,
      });
    }
  };

  const handleSubmit = async () => {
    const confirmResult = confirm("確定送出結果嗎?");

    if (confirmResult) {
      console.log(QMGscore);
      await api.post(`/inquiry/${routeParams.id}/QMG`, QMGscore).then((res) => {
        console.log(res.data);
      });
    }
  };

  const blockLeft = Object.entries(QMGscore)
    .slice(0, 7)
    .map(([key, value]) => (
      <>
        <div className="inquiry-table-QMG-content-sliderbox">
          <p>{key}</p>
          <input
            defaultValue="0"
            onChange={(e) => {
              if (typeof value === "number") handleChange(e, value);
            }}
            type="range"
            name={key}
            min="0"
            max="3"
            step="1"
            list="tickmarks"
          />

          <datalist className="QMG-datalist" id="tickmarks">
            <option value="0" label="0"></option>
            <option value="1" label="1"></option>
            <option value="2" label="2"></option>
            <option value="3" label="3"></option>
          </datalist>
        </div>
      </>
    ));

  const blockRight = Object.entries(QMGscore)
    .slice(7, -2)
    .map(([key, value], index) => (
      <>
        <div className="inquiry-table-QMG-content-sliderbox" key={index}>
          <p>{key}</p>
          <input
            defaultValue="0"
            onChange={(e) => {
              if (typeof value === "number") handleChange(e, value);
            }}
            type="range"
            name={key}
            min="0"
            max="3"
            step="1"
            list="tickmarks"
          />

          <datalist className="QMG-datalist" id="tickmarks">
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
              <input
                type="text"
                id="sum"
                value={QMGscore.sum}
                name="sum"
                readOnly
              />
            </div>
          </div>
          <div className="inquiry-table-QMG-content">
            <div className="inquiry-table-QMG-content-block-left">
              {blockLeft}
            </div>
            <div className="inquiry-table-QMG-content-block-right">
              {blockRight}
            </div>
          </div>
          <div className="inquiry-table-QMG-submit">
            <button onClick={handleSubmit}>儲存</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default QMG;
