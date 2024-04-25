import * as React from "react";
import "./QOL.css";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import typeChange from "../../../types/Change";
import { QOL } from "../../../types/Patient";

const TableQOL = ({
  setReplaceComponent,
  selectedDate,
  QOLscore,
  setQOLscore,
  getAllData,
  changeOrNot,
  setChangeOrNot,
}: {
  setReplaceComponent: (table: string) => void;
  selectedDate: string;
  QOLscore: QOL;
  setQOLscore: React.Dispatch<React.SetStateAction<QOL>>;
  getAllData: () => Promise<void>;
  changeOrNot: typeChange;
  setChangeOrNot: React.Dispatch<React.SetStateAction<typeChange>>;
}) => {
  const defaultQOL = {
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
    testDate: selectedDate,
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    beforeChangedParam: number
  ) => {
    const { name, value } = e.target;
    const numericValue = parseInt(value, 10);

    setQOLscore({
      ...QOLscore,
      [name]: numericValue,
      sum: QOLscore.sum + numericValue - beforeChangedParam,
    });
  };

  const handleSubmit = async () => {
    if (QOLscore.sum === defaultQOL.sum) {
      alert("請輸入有效欄位!");
    } else {
      console.log("QOLscore", QOLscore);
      setReplaceComponent("right");
      setChangeOrNot({ ...changeOrNot, changeQOL: true });
      getAllData();
    }
  };

  const blockLeft = Object.entries(QOLscore)
    .slice(0, 8)
    .map(([key, value], index) => (
      <>
        <div className="inquiry-table-QOL-content-sliderbox" key={index}>
          <p>{key}</p>
          <input
            value={value}
            onChange={(e) => {
              if (typeof value === "number") handleChange(e, value);
            }}
            type="range"
            name={key}
            min="0"
            max="2"
            step="1"
            list="tickmarks"
          />

          <datalist className="QOL-datalist" id="tickmarks">
            <option value="0" label="0"></option>
            <option value="1" label="1"></option>
            <option value="2" label="2"></option>
          </datalist>
        </div>
      </>
    ));

  const blockRight = Object.entries(QOLscore)
    .slice(8, -2)
    .map(([key, value], index) => (
      <>
        <div className="inquiry-table-QOL-content-sliderbox" key={index}>
          <p>{key}</p>
          <input
            value={value}
            onChange={(e) => {
              if (typeof value === "number") handleChange(e, value);
            }}
            type="range"
            name={key}
            min="0"
            max="2"
            step="1"
            list="tickmarks"
          />

          <datalist className="QOL-datalist" id="tickmarks">
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
            <div className="inquiry-table-QOL-return">
              <button
                className="QOL-backToRight"
                onClick={() => setReplaceComponent("right")}
              >
                <IoIosArrowDropleftCircle />
              </button>
            </div>
            <div className="inquiry-table-QOL-head-title">
              <p>QOL</p>
            </div>
            <div className="inquiry-table-QOL-content-row-sum">
              <label htmlFor="sum">總分 : </label>
              <input
                type="text"
                id="sum"
                value={QOLscore.sum}
                name="sum"
                readOnly
              />
            </div>
          </div>
          <div className="inquiry-table-QOL-content">
            <div
              className="inquiry-table-QOL-content-block-left"
              key={undefined}
            >
              {blockLeft}
            </div>
            <div
              className="inquiry-table-QOL-content-block-right"
              key={undefined}
            >
              {blockRight}
            </div>
          </div>
          <div className="inquiry-table-QOL-submit">
            <button onClick={handleSubmit}>儲存</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default TableQOL;
