import "./MG.css";
import { useState } from "react";
import { MG as typeMG } from "../../../types/Patient";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import api from "../../../api";
import { useParams } from "react-router-dom";

const MG = ({
  setReplaceComponent,
  selectedDate,
}: {
  setReplaceComponent: (table: string) => void;
  selectedDate: string;
}) => {
  const routeParams = useParams();
  const [MGscore, setMGScore] = useState<typeMG>({
    testDate: selectedDate,
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    beforeChangedParam: number
  ) => {
    const { name, value } = e.target;

    if (name === "testDate") {
      setMGScore({ ...MGscore, testDate: value });
    } else {
      const numericValue = parseInt(value, 10);

      setMGScore({
        ...MGscore,
        [name]: numericValue,
        sum: MGscore.sum + numericValue - beforeChangedParam,
      });
    }
  };

  const handleSubmit = async () => {
    const confirmResult = confirm("確定送出結果嗎?");
    if (confirmResult) {
      console.log(MGscore);
      await api.post(`/inquiry/${routeParams.id}/MG`, MGscore).then((res) => {
        console.log(res.data);
      });
    }
  };

  return (
    <div className="inquiry-table-MG-all">
      <div className="inquiry-table-MG-bg">
        <div className="inquiry-table-MG-head">
          <div className="inquiry-table-MG-return">
            <button
              className="MG-backToRight"
              onClick={() => setReplaceComponent("right")}
            >
              <IoIosArrowDropleftCircle />
            </button>
          </div>
          <div className="inquiry-table-MG-head-title">
            <p>MG</p>
          </div>
          <div className="inquiry-table-MG-content-row-sum">
            <label htmlFor="sum">總分 : </label>
            <input
              type="text"
              id="sum"
              value={MGscore.sum}
              name="sum"
              readOnly
            />
          </div>
        </div>
        <div className="inquiry-table-MG-content">
          <div className="inquiry-table-MG-content-row">
            <div className="inquiry-table-MG-content-row-doubleVision">
              <label htmlFor="doubleVision">doubleVision</label>
              <input
                defaultValue="0"
                onChange={(e) => handleChange(e, MGscore.doubleVision)}
                type="range"
                id="doubleVision"
                name="doubleVision"
                min="0"
                max="3"
                step="1"
                list="tickmarks"
              />

              <datalist className="MG-datalist" id="tickmarks">
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
                onChange={(e) => handleChange(e, MGscore.eyeClosure)}
                type="range"
                id="eyeClosure"
                name="eyeClosure"
                min="0"
                max="3"
                step="1"
                list="tickmarks"
              />

              <datalist className="MG-datalist" id="tickmarks">
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
                onChange={(e) => handleChange(e, MGscore.talking)}
                type="range"
                id="talking"
                name="talking"
                min="0"
                max="3"
                step="1"
                list="tickmarks"
              />

              <datalist className="MG-datalist" id="tickmarks">
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
                onChange={(e) => handleChange(e, MGscore.chewing)}
                type="range"
                id="chewing"
                name="chewing"
                min="0"
                max="3"
                step="1"
                list="tickmarks"
              />

              <datalist className="MG-datalist" id="tickmarks">
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
                onChange={(e) => handleChange(e, MGscore.swallowing)}
                type="range"
                id="swallowing"
                name="swallowing"
                min="0"
                max="3"
                step="1"
                list="tickmarks"
              />

              <datalist className="MG-datalist" id="tickmarks">
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
                onChange={(e) => handleChange(e, MGscore.breathing)}
                type="range"
                id="breathing"
                name="breathing"
                min="0"
                max="3"
                step="1"
                list="tickmarks"
              />

              <datalist className="MG-datalist" id="tickmarks">
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
                onChange={(e) => handleChange(e, MGscore.neckFlexion)}
                type="range"
                id="neckFlexion"
                name="neckFlexion"
                min="0"
                max="3"
                step="1"
                list="tickmarks"
              />

              <datalist className="MG-datalist" id="tickmarks">
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
                onChange={(e) => handleChange(e, MGscore.shoulderAbduction)}
                type="range"
                id="shoulderAbduction"
                name="shoulderAbduction"
                min="0"
                max="3"
                step="1"
                list="tickmarks"
              />

              <datalist className="MG-datalist" id="tickmarks">
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
                onChange={(e) => handleChange(e, MGscore.hipFlexion)}
                type="range"
                id="hipFlexion"
                name="hipFlexion"
                min="0"
                max="3"
                step="1"
                list="tickmarks"
              />

              <datalist className="MG-datalist" id="tickmarks">
                <option value="0" label="0"></option>
                <option value="1" label="1"></option>
                <option value="2" label="2"></option>
                <option value="3" label="3"></option>
              </datalist>
            </div>
            <div className="inquiry-table-MG-content-row-ptosis">
              <label htmlFor="ptosis">ptosis</label>
              <input
                defaultValue="0"
                onChange={(e) => handleChange(e, MGscore.ptosis)}
                type="range"
                id="ptosis"
                name="ptosis"
                min="0"
                max="3"
                step="1"
                list="tickmarks"
              />

              <datalist className="MG-datalist" id="tickmarks">
                <option value="0" label="0"></option>
                <option value="1" label="1"></option>
                <option value="2" label="2"></option>
                <option value="3" label="3"></option>
              </datalist>
            </div>
          </div>
        </div>
        <div className="inquiry-table-MG-submit">
          <button onClick={handleSubmit}>儲存</button>
        </div>
      </div>
    </div>
  );
};
export default MG;
