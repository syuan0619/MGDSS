import "./ADL.css";
import { useState } from "react";
import { ADL as typeADL } from "../../../types/Patient";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import api from "../../../api";

const ADL = ({
  setReplaceComponent,
}: {
  setReplaceComponent: (table: string) => void;
}) => {
  const [ADLscore, setADLScore] = useState<typeADL>({
    testDate: "",
    talking: 0,
    chewing: 0,
    swallowing: 0,
    breathing: 0,
    brushTeethOrCombHair: 0,
    ariseFromChair: 0,
    eyelid: 0,
    sum: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "testDate") {
      setADLScore({ ...ADLscore, testDate: value });
    } else {
      const numericValue = parseInt(value, 10);

      setADLScore({
        ...ADLscore,
        [name]: numericValue,
        sum: ADLscore.sum + numericValue,
      });
    }
  };

  const handleSubmit = async () => {
    const confirmResult = confirm("確定送出結果嗎?");
    if (confirmResult) {
      console.log(ADLscore);
      await api
        .post(`/inquiry/${"6567477ac1d120c47468dcdf"}/ADL`, ADLscore)
        .then((res) => {
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
            <div className="inquiry-table-ADL-content-row-testdate">
              <label htmlFor="testDate">Test Date:</label>
              <input
                type="date"
                id="testDate"
                name="testDate"
                value={ADLscore.testDate}
                onChange={handleChange}
              />
            </div>
            <div className="inquiry-table-ADL-content-row-talking">
              <label htmlFor="talking">talking</label>
              <input
                defaultValue="0"
                onChange={handleChange}
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
          <div className="inquiry-table-ADL-content-row">
            <div className="inquiry-table-ADL-content-row-chewing">
              <label htmlFor="chewing">chewing</label>
              <input
                defaultValue="0"
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
        </div>
        <div className="inquiry-table-ADL-submit">
          <button onClick={handleSubmit}>儲存</button>
        </div>
      </div>
    </div>
  );
};
export default ADL;
