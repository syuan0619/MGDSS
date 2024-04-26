import { useParams } from "react-router-dom";
import typeChange from "../../../types/Change";
import { ADL } from "../../../types/Patient";
import "./ADL.css";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import api from "../../../api";
import { useEffect, useState } from "react";

const TableADL = ({
  setReplaceComponent,
  selectedDate,
  ADLscore,
  setADLscore,
  getAllData,
  changeOrNot,
  setChangeOrNot,
}: {
  setReplaceComponent: (table: string) => void;
  selectedDate: string;
  ADLscore: ADL;
  setADLscore: React.Dispatch<React.SetStateAction<ADL>>;
  getAllData: () => Promise<void>;
  changeOrNot: typeChange;
  setChangeOrNot: React.Dispatch<React.SetStateAction<typeChange>>;
}) => {
  const defaultADL: ADL = {
    testDate: selectedDate,
    talking: 0,
    chewing: 0,
    swallowing: 0,
    breathing: 0,
    brushTeethOrCombHair: 0,
    ariseFromChair: 0,
    doubleVision: 0,
    eyelid: 0,
    sum: 0,
  };
  const [defaultRes, setDefaultRes] = useState<ADL>(defaultADL);
  const routeParams = useParams();
  const getDefaultData = async () => {
    try {
      const response = await api.get(
        `/inquiry/${routeParams.id}/ADL/${selectedDate}`
      );
      setDefaultRes(response.data.table);
      setADLscore(response.data.table);
    } catch {
      return;
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

    setADLscore({
      ...ADLscore,
      [name]: numericValue,
      sum: ADLscore.sum + numericValue - beforeChangedParam,
    });
  };

  const handleSubmit = async () => {
    if (
      ADLscore.talking === defaultADL.talking &&
      ADLscore.chewing === defaultADL.chewing &&
      ADLscore.swallowing === defaultADL.swallowing &&
      ADLscore.breathing === defaultADL.breathing &&
      ADLscore.brushTeethOrCombHair === defaultADL.brushTeethOrCombHair &&
      ADLscore.ariseFromChair === defaultADL.ariseFromChair &&
      ADLscore.doubleVision === defaultADL.doubleVision &&
      ADLscore.eyelid === defaultADL.eyelid &&
      ADLscore.sum === defaultADL.sum
    ) {
      alert("請輸入有效欄位!");
    } else {
      console.log("ADLscore", ADLscore);
      setReplaceComponent("right");
      setChangeOrNot({ ...changeOrNot, changeADL: true });
      getAllData();
    }
  };

  return (
    <div className="inquiry-table-ADL-all">
      <div className="inquiry-table-ADL-bg">
        <div className="inquiry-table-ADL-head">
          <div className="inquiry-table-ADL-return">
            <button
              className="ADL-backToRight"
              onClick={() => setReplaceComponent("right")}
            >
              <IoIosArrowDropleftCircle />
            </button>
          </div>
          <div className="inquiry-table-ADL-head-title">
            <p>ADL</p>
          </div>
          <div className="inquiry-table-ADL-content-row-sum">
            <label htmlFor="sum">總分 : </label>
            <input
              type="text"
              id="sum"
              value={ADLscore.sum}
              name="sum"
              readOnly
            />
          </div>
        </div>
        <div className="inquiry-table-ADL-content">
          <div className="inquiry-table-ADL-content-row">
            <div className="inquiry-table-ADL-content-row-chewing">
              <label htmlFor="chewing">chewing</label>
              <input
                value={ADLscore.chewing}
                onChange={(e) => handleChange(e, ADLscore.chewing)}
                type="range"
                id="chewing"
                name="chewing"
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
            <div className="inquiry-table-ADL-content-row-swallowing">
              <label htmlFor="swallowing">swallowing</label>
              <input
                value={ADLscore.swallowing}
                onChange={(e) => handleChange(e, ADLscore.swallowing)}
                type="range"
                id="swallowing"
                name="swallowing"
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
          </div>
          <div className="inquiry-table-ADL-content-row">
            <div className="inquiry-table-ADL-content-row-breathing">
              <label htmlFor="breathing">breathing</label>
              <input
                value={ADLscore.breathing}
                onChange={(e) => handleChange(e, ADLscore.breathing)}
                type="range"
                id="breathing"
                name="breathing"
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
            <div className="inquiry-table-ADL-content-row-brushTeethOrCombHair">
              <label htmlFor="brushTeethOrCombHair">brushTeethOrCombHair</label>
              <input
                value={ADLscore.brushTeethOrCombHair}
                onChange={(e) => handleChange(e, ADLscore.brushTeethOrCombHair)}
                type="range"
                id="brushTeethOrCombHair"
                name="brushTeethOrCombHair"
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
          </div>
          <div className="inquiry-table-ADL-content-row">
            <div className="inquiry-table-ADL-content-row-ariseFromChair">
              <label htmlFor="ariseFromChair">ariseFromChair</label>
              <input
                value={ADLscore.ariseFromChair}
                onChange={(e) => handleChange(e, ADLscore.ariseFromChair)}
                type="range"
                id="ariseFromChair"
                name="ariseFromChair"
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
            <div className="inquiry-table-ADL-content-row-eyelid">
              <label htmlFor="eyelid">eyelid</label>
              <input
                value={ADLscore.eyelid}
                onChange={(e) => handleChange(e, ADLscore.eyelid)}
                type="range"
                id="eyelid"
                name="eyelid"
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
          </div>
          <div className="inquiry-table-ADL-content-row">
            <div
              style={{
                width: "100%",
                display: " flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                marginLeft: "15%",
              }}
            >
              <div className="inquiry-table-ADL-content-row-talking">
                <label htmlFor="talking">talking</label>
                <input
                  value={ADLscore.talking}
                  onChange={(e) => handleChange(e, ADLscore.talking)}
                  type="range"
                  id="talking"
                  name="talking"
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
            <div className="inquiry-table-ADL-content-row-doubleVision">
              <label htmlFor="doubleVision">doubleVision</label>
              <input
                defaultValue="0"
                onChange={(e) => handleChange(e, ADLscore.doubleVision)}
                type="range"
                id="doubleVision"
                name="doubleVision"
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
          </div>
        </div>
        <div className="inquiry-table-ADL-submit">
          <button onClick={handleSubmit}>儲存</button>
        </div>
      </div>
    </div>
  );
};
export default TableADL;
