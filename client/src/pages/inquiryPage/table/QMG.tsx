import "./QMG.css";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { QMG } from "../../../types/Patient";
import typeChange from "../../../types/Change";
import { useParams } from "react-router-dom";
import api from "../../../api";
import { useEffect, useState } from "react";

const TableQMG = ({
  setReplaceComponent,
  selectedDate,
  QMGscore,
  setQMGscore,
  getAllData,
  changeOrNot,
  setChangeOrNot,
}: {
  setReplaceComponent: (table: string) => void;
  selectedDate: string;
  QMGscore: QMG;
  setQMGscore: React.Dispatch<React.SetStateAction<QMG>>;
  getAllData: () => Promise<void>;
  changeOrNot: typeChange;
  setChangeOrNot: React.Dispatch<React.SetStateAction<typeChange>>;
}) => {
  const defaultQMG = {
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
    testDate: selectedDate,
  };
  const [defaultRes, setDefaultRes] = useState<QMG>(defaultQMG);
  const routeParams = useParams();
  const getDefaultData = async () => {
    try {
      const response = await api.get(
        `/inquiry/${routeParams.id}/QMG/${selectedDate}`
      );
      setDefaultRes(response.data.table);
      setQMGscore(response.data.table);
    } catch {
      setDefaultRes(defaultQMG);
      setQMGscore(defaultQMG);
    }
  };
  useEffect(() => {
    getDefaultData();
  }, [selectedDate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    beforeChangedParam: number
  ) => {
    const { name, value } = e.target;
    const numericValue = parseInt(value, 10);

    setQMGscore({
      ...QMGscore,
      [name]: numericValue,
      sum: QMGscore.sum + numericValue - beforeChangedParam,
    });
  };

  const handleSubmit = async () => {
    if (
      QMGscore.doubleVision === defaultQMG.doubleVision &&
      QMGscore.facialMuscle === defaultQMG.facialMuscle &&
      QMGscore.headLift === defaultQMG.headLift &&
      QMGscore.leftArmHeight === defaultQMG.leftArmHeight &&
      QMGscore.leftHandGrid === defaultQMG.leftHandGrid &&
      QMGscore.leftLegHeight === defaultQMG.leftLegHeight &&
      QMGscore.ptosis === defaultQMG.ptosis &&
      QMGscore.rightArmHeight === defaultQMG.rightArmHeight &&
      QMGscore.rightHandGrid === defaultQMG.rightHandGrid &&
      QMGscore.rightLegHeight === defaultQMG.rightLegHeight &&
      QMGscore.speakFluency === defaultQMG.speakFluency &&
      QMGscore.swallowing === defaultQMG.swallowing &&
      QMGscore.vitalCapacity === defaultQMG.vitalCapacity &&
      QMGscore.sum === defaultQMG.sum
    ) {
      alert("請輸入有效欄位!");
    } else {
      console.log("QMGscore", QMGscore);
      setReplaceComponent("right");
      setChangeOrNot({ ...changeOrNot, changeQMG: true });
      getAllData();
    }
  };

  const blockLeft = Object.entries(QMGscore)
    .slice(0, 7)
    .map(([key, value], index) => (
      <>
        <div className="inquiry-table-QMG-content-sliderbox" key={index}>
          <p>{key}</p>
          <input
            value={value}
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
            value={value}
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
            <div className="inquiry-table-QMG-return">
              <button
                className="QMG-backToRight"
                onClick={() => setReplaceComponent("right")}
              >
                <IoIosArrowDropleftCircle />
              </button>
            </div>
            <div className="inquiry-table-QMG-head-title">
              <p>QMG</p>
            </div>
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
            <div
              className="inquiry-table-QMG-content-block-left"
              key={undefined}
            >
              {blockLeft}
            </div>
            <div
              className="inquiry-table-QMG-content-block-right"
              key={undefined}
            >
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
export default TableQMG;
