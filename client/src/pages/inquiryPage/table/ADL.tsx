import "./ADL.css";
import { useState } from "react";
import { ADL as typeADL } from "../../../types/Patient";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import api from "../../../api";
import { useParams } from "react-router-dom";

const ADL = ({
  setReplaceComponent,
  selectedDate, //*************************
}: {
  setReplaceComponent: (table: string) => void;
  selectedDate: string; //*************************
}) => {
  const routeParams = useParams();

  const [ADLscore, setADLscore] = useState<typeADL>({
    testDate: selectedDate, //*************************
    talking: 0,
    chewing: 0,
    swallowing: 0,
    breathing: 0,
    brushTeethOrCombHair: 0,
    ariseFromChair: 0,
    doubleVision: 0,
    eyelid: 0,
    sum: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    beforeChangedParam: number
  ) => {
    const { name, value } = e.target;

    if (name === "testDate") {
      setADLscore({ ...ADLscore, testDate: value });
    } else {
      const numericValue = parseInt(value, 10);

      setADLscore({
        ...ADLscore,
        [name]: numericValue,
        sum: ADLscore.sum + numericValue - beforeChangedParam,
      });
    }
  };

  const handleSubmit = async () => {
    const confirmResult = confirm("確定送出結果嗎?");

    if (confirmResult) {
      console.log(ADLscore);
      await api.post(`/inquiry/${routeParams.id}/ADL`, ADLscore).then((res) => {
        console.log(res.data);
      });
    }
  };

  return (
    <div className="inquiry-table-ADL-all">
      <div className="inquiry-table-ADL-bg">
        <div className="inquiry-table-ADL-head">
          <button
            className="ADL-backToRight"
            onClick={() => setReplaceComponent("right")}
          >
            <IoIosArrowDropleftCircle />
          </button>
          <p>ADL</p>
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
                defaultValue="0"
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
                defaultValue="0"
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
                defaultValue="0"
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
                defaultValue="0"
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
                defaultValue="0"
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
                defaultValue="0"
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
                  defaultValue="0"
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
export default ADL;
