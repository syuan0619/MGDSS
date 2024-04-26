import "./MG.css";
import { MG } from "../../../types/Patient";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import typeChange from "../../../types/Change";
import api from "../../../api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TableMG = ({
  setReplaceComponent,
  selectedDate,
  MGscore,
  setMGscore,
  getAllData,
  changeOrNot,
  setChangeOrNot,
}: {
  setReplaceComponent: (table: string) => void;
  selectedDate: string;
  MGscore: MG;
  setMGscore: React.Dispatch<React.SetStateAction<MG>>;
  getAllData: () => Promise<void>;
  changeOrNot: typeChange;
  setChangeOrNot: React.Dispatch<React.SetStateAction<typeChange>>;
}) => {
  const defaultMG: MG = {
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
  };
  const [defaultRes, setDefaultRes] = useState<MG>(defaultMG);
  const routeParams = useParams();
  const getDefaultData = async () => {
    try {
      const response = await api.get(
        `/inquiry/${routeParams.id}/MG/${selectedDate}`
      );
      setDefaultRes(response.data.table);
      setMGscore(response.data.table);
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

    setMGscore({
      ...MGscore,
      [name]: numericValue,
      sum: MGscore.sum + numericValue - beforeChangedParam,
    });
  };

  const handleSubmit = async () => {
    if (
      MGscore.breathing === defaultMG.breathing &&
      MGscore.chewing === defaultMG.chewing &&
      MGscore.doubleVision === defaultMG.doubleVision &&
      MGscore.eyeClosure === defaultMG.eyeClosure &&
      MGscore.hipFlexion === defaultMG.hipFlexion &&
      MGscore.neckFlexion === defaultMG.neckFlexion &&
      MGscore.ptosis === defaultMG.ptosis &&
      MGscore.shoulderAbduction === defaultMG.shoulderAbduction &&
      MGscore.swallowing === defaultMG.swallowing &&
      MGscore.talking === defaultMG.talking &&
      MGscore.sum === defaultMG.sum
    ) {
      alert("請輸入有效欄位!");
    } else {
      console.log("MGscore", MGscore);
      setReplaceComponent("right");
      setChangeOrNot({ ...changeOrNot, changeMG: true });
      getAllData();
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
                value={MGscore.doubleVision}
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
                value={MGscore.eyeClosure}
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
                value={MGscore.talking}
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
                value={MGscore.chewing}
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
                value={MGscore.swallowing}
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
                value={MGscore.breathing}
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
                value={MGscore.neckFlexion}
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
                value={MGscore.shoulderAbduction}
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
                value={MGscore.hipFlexion}
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
                value={MGscore.ptosis}
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
export default TableMG;
