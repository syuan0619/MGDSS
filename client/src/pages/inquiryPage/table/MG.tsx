import "./MG.css";
import { useState } from "react";
import { MG as typeMG } from "../../../types/Patient";
import { IoIosArrowDropleftCircle } from "react-icons/io";

const MG = ({
  setReplaceComponent,
}: {
  setReplaceComponent: (table: string) => void;
}) => {
  const [MGscore, setMGScore] = useState<typeMG>({
    testDate: "",
    ptosis: 0,
    doubleVision: 0,
    eyeClosure: 0,
    talking: 0,
    chewing: 0,
    swallowing: 0,
    breathing: 0,
    neckFlexion: 0,
    shoulderAbduction: 0,
    hipFlexion: 0,
    sum: 0,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "testDate") {
      setMGScore({ ...MGscore, testDate: value });
    } else {
      const numericValue = parseInt(value, 10);
      setMGScore({
        ...MGscore,
        [name]: numericValue,
        sum: MGscore.sum + numericValue,
      });
    }
  };
  let sum = 0;
  for (const key in MGscore) {
    if (typeof MGscore[key] === "number") {
      sum += MGscore[key] as number;
    }
  }
  const MGTotal = sum;
  return (
    <div className="inquiry-table-MG-all">
      <div className="inquiry-table-MG-bg">
        <div className="inquiry-table-MG-head">
          <button
            className="MG-backToRight"
            onClick={() => setReplaceComponent("right")}
          >
            <IoIosArrowDropleftCircle />
          </button>
          <p>MG</p>
          <div className="inquiry-table-MG-content-row-sum">
            <label htmlFor="sum">總分 : </label>
            <input type="text" id="sum" value={MGTotal} name="sum" readOnly />
          </div>
        </div>
        <div className="inquiry-table-MG-content">
          <div className="inquiry-table-MG-content-row">
            <div className="inquiry-table-MG-content-row-testdate">
              <label htmlFor="testDate">Test Date:</label>
              <input
                type="date"
                id="testDate"
                name="testDate"
                value={MGscore.testDate}
                onChange={handleChange}
              />
            </div>
            <div className="inquiry-table-MG-content-row-ptosis">
              <label htmlFor="ptosis">ptosis</label>
              <input
                defaultValue="0"
                onChange={handleChange}
                type="range"
                id="ptosis"
                name="ptosis"
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
          <div className="inquiry-table-MG-content-row">
            <div className="inquiry-table-MG-content-row-doubleVision">
              <label htmlFor="doubleVision">doubleVision</label>
              <input
                defaultValue="0"
                onChange={handleChange}
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
            <div className="inquiry-table-MG-content-row-eyeClosure">
              <label htmlFor="eyeClosure">eyeClosure</label>
              <input
                defaultValue="0"
                onChange={handleChange}
                type="range"
                id="eyeClosure"
                name="eyeClosure"
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
          <div className="inquiry-table-MG-content-row">
            <div className="inquiry-table-MG-content-row-talking">
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
            <div className="inquiry-table-MG-content-row-chewing">
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
          </div>
          <div className="inquiry-table-MG-content-row">
            <div className="inquiry-table-MG-content-row-swallowing">
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
            <div className="inquiry-table-MG-content-row-breathing">
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
          </div>
          <div className="inquiry-table-MG-content-row">
            <div className="inquiry-table-MG-content-row-neckFlexion">
              <label htmlFor="neckFlexion">neckFlexion</label>
              <input
                defaultValue="0"
                onChange={handleChange}
                type="range"
                id="neckFlexion"
                name="neckFlexion"
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
            <div className="inquiry-table-MG-content-row-shoulderAbduction">
              <label htmlFor="shoulderAbduction">shoulderAbduction</label>
              <input
                defaultValue="0"
                onChange={handleChange}
                type="range"
                id="shoulderAbduction"
                name="shoulderAbduction"
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
          <div className="inquiry-table-MG-content-row">
            <div className="inquiry-table-MG-content-row-hipFlexion">
              <label htmlFor="hipFlexion">hipFlexion</label>
              <input
                defaultValue="0"
                onChange={handleChange}
                type="range"
                id="hipFlexion"
                name="hipFlexion"
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
        <div className="inquiry-table-MG-submit">
          <button
            onClick={() => {
              if (confirm("確定送出結果嗎?")) {
                console.log("送出結果：", MGscore);
              }
              setReplaceComponent("right");
            }}
          >
            儲存
          </button>
        </div>
      </div>
    </div>
  );
};
export default MG;
