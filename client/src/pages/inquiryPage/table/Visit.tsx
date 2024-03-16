import "./Visit.css";
import { useState } from "react";
import { Visit as typeVisit } from "../../../types/Patient";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { Alert, Stack } from "@mui/material";

const Visit = ({
  setReplaceComponent,
}: {
  setReplaceComponent: (table: string) => void;
}) => {
  const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.toISOString().slice(0, 10);
  };
  const [Visit, setVisit] = useState<typeVisit>({
    treat: 0,
    date: "",

    selfAssessment: 0,
    note: "",
    SBP: 0,
    DBP: 0,
    prescription: {
      pyridostigmine: 0,
      compesolone: 0,
      cellcept: 0,
      imuran: 0,
      prograf: 0,
    },
    examination: {
      ptosis: 0,
      diplopia: 0,
      dysphagia: 0,
      dysarthria: 0,
      dyspnea: 0,
      limpWeakness: 0,
      MGFAclassification: 0,
    },
  });
  
  const maxValues: { [key: string]: number } = {
    SBP: 120,
    DBP: 80,
  };

  const [errors, setErrors] = useState<{ [key: string]: string }>({
    SBP: "",
    DBP: "",
  });

  const [warnings, setWarnings] = useState<{ [key: string]: string }>({
    SBP: "",
    DBP: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const numericValue = value.trim() !== "" ? parseFloat(value) : 0;

    if (!isNaN(numericValue) || value === "") {
      if (name in maxValues && numericValue > maxValues[name]) {
        setWarnings({
          ...warnings,
          [name]: `正常範圍到 ${maxValues[name]}, 請確認！`,
        });
      } else {
        setErrors({ ...errors, [name]: "" });
        setWarnings({ ...warnings, [name]: "" });
      }

      if (name === "date" || name === "note") {
        setVisit({ ...Visit, [name]: value });
      } else if (name in Visit.prescription) {
        const updatedPrescription = {
          ...Visit.prescription,
          [name]: numericValue,
        };
        setVisit({ ...Visit, prescription: updatedPrescription });
      } else if (name in Visit.examination) {
        const updatedExamination = {
          ...Visit.examination,
          [name]: numericValue,
        };
        setVisit({ ...Visit, examination: updatedExamination });
      } else {
        setVisit({ ...Visit, [name]: numericValue });
      }
    } else {
      setErrors({ ...errors, [name]: "請輸入有效的數字！" });
      setWarnings({ ...warnings, [name]: "" });
    }
  };
  const handleSubmit = async () => {
    const confirmResult = confirm("確定送出結果嗎?");
    if (confirmResult) {
      console.log(Visit);
      console.log("Date", getCurrentDate());
    }
  };

  return (
    <div className="inquiry-table-Visit-all">
      <div className="inquiry-table-Visit-bg">
        <div className="inquiry-table-Visit-head">
          <button
            className="Visit-backToRight"
            onClick={() => setReplaceComponent("right")}
          >
            <IoIosArrowDropleftCircle />
          </button>
          <p>看診紀錄</p>
          <div className="inquiry-table-Visit-content-row-sum">
            <label></label>
          </div>
        </div>
        <div className="inquiry-table-Visit-content">
          <div className="inquiry-table-Visit-content-row">
            <div className="inquiry-table-Visit-content-row-left">
              <label htmlFor="doubleVision">treat</label>
              <input
                defaultValue="0"
                onChange={handleChange}
                type="range"
                id="treat"
                name="treat"
                min="0"
                max="4"
                step="1"
                list="treat"
              />

              <datalist id="tickmarks">
                <option value="0" label="0"></option>
                <option value="1" label="1"></option>
                <option value="2" label="2"></option>
                <option value="3" label="3"></option>
                <option value="4" label="4"></option>
              </datalist>
            </div>
            <div className="inquiry-table-Visit-content-row-right">
              <label htmlFor="ptosis">selfAssessment</label>
              <input
                defaultValue="0"
                onChange={handleChange}
                type="range"
                id="selfAssessment"
                name="selfAssessment"
                min="0"
                max="2"
                step="1"
                list="selfAssessment"
              />

              <datalist id="selfAssessment">
                <option value="0" label="0"></option>
                <option value="1" label="1"></option>
                <option value="2" label="2"></option>
              </datalist>
            </div>
          </div>
          <div className="inquiry-table-Visit-content-row">
          <div className="inquiry-table-Visit-content-row-SBP">
              <div className="inquiry-table-Visit-content-row-SBP-head">
                <label htmlFor="SBP">SBP</label>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  defaultValue="0"
                  onChange={handleChange}
                  type="text"
                  id="SBP"
                  name="SBP"
                />
                {errors.SBP && (
                  <div className="Visit-alert-input">{errors.DBP}</div>
                )}
                <Stack>
                  {warnings.SBP && (
                    <Alert severity="info">{warnings.DBP}</Alert>
                  )}
                </Stack>
                {!Visit.SBP && <div className="Visit-placeholder"> (mmHg)</div>}
              </div>
            </div>
            <div className="inquiry-table-Visit-content-row-DBP">
              <div className="inquiry-table-Visit-content-row-DBP-head">
                <label htmlFor="freeThyroxine">DBP</label>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  defaultValue="0"
                  onChange={handleChange}
                  type="text"
                  id="freeThyroxine"
                  name="freeThyroxine"
                />
                {errors.DBP && (
                  <div className="Visit-alert-input">{errors.DBP}</div>
                )}
                <Stack>
                  {warnings.DBP && (
                    <Alert severity="info">{warnings.DBP}</Alert>
                  )}
                </Stack>
                {!Visit.DBP && <div className="Visit-placeholder"> (mmHg)</div>}
              </div>
            </div>
          </div>
          <h3 style={{ textAlign: "center", color: "#0c537b" }}>
            prescription
          </h3>
          <div className="inquiry-table-Visit-content-row">
            <div className="inquiry-table-Visit-content-row-left">
              <label htmlFor="pyridostigmine">pyridostigmine</label>
              <input
                defaultValue="0"
                onChange={handleChange}
                type="range"
                id="pyridostigmine"
                name="pyridostigmine"
                min="0"
                max="9"
                step="1"
                list="pyridostigmine"
              />

              <datalist id="pyridostigmine">
                <option value="0" label="0"></option>
                <option value="1" label="1"></option>
                <option value="2" label="2"></option>
                <option value="3" label="3"></option>
                <option value="4" label="4"></option>
                <option value="5" label="5"></option>
                <option value="6" label="6"></option>
                <option value="7" label="7"></option>
                <option value="8" label="8"></option>
                <option value="9" label="9"></option>
              </datalist>
            </div>
            <div className="inquiry-table-Visit-content-row-left">
              <label htmlFor="compesolone">compesolone</label>
              <input
                defaultValue="0"
                onChange={handleChange}
                type="range"
                id="compesolone"
                name="compesolone"
                min="0"
                max="9"
                step="1"
                list="compesolone"
              />

              <datalist id="compesolone">
                <option value="0" label="0"></option>
                <option value="1" label="1"></option>
                <option value="2" label="2"></option>
                <option value="3" label="3"></option>
                <option value="4" label="4"></option>
                <option value="5" label="5"></option>
                <option value="6" label="6"></option>
                <option value="7" label="7"></option>
                <option value="8" label="8"></option>
                <option value="9" label="9"></option>
              </datalist>
            </div>
          </div>
          <div className="inquiry-table-Visit-content-row">
            <div className="inquiry-table-Visit-content-row-left">
              <label htmlFor="cellcept">cellcept</label>
              <input
                defaultValue="0"
                onChange={handleChange}
                type="range"
                id="cellcept"
                name="cellcept"
                min="0"
                max="9"
                step="1"
                list="cellcept"
              />

              <datalist id="cellcept">
                <option value="0" label="0"></option>
                <option value="1" label="1"></option>
                <option value="2" label="2"></option>
                <option value="3" label="3"></option>
                <option value="4" label="4"></option>
                <option value="5" label="5"></option>
                <option value="6" label="6"></option>
                <option value="7" label="7"></option>
                <option value="8" label="8"></option>
                <option value="9" label="9"></option>
              </datalist>
            </div>
            <div className="inquiry-table-Visit-content-row-right">
              <label htmlFor="imuran">imuran</label>
              <input
                defaultValue="0"
                onChange={handleChange}
                type="range"
                id="imuran"
                name="imuran"
                min="0"
                max="9"
                step="1"
                list="imuran"
              />

              <datalist id="imuran">
                <option value="0" label="0"></option>
                <option value="1" label="1"></option>
                <option value="2" label="2"></option>
                <option value="3" label="3"></option>
                <option value="4" label="4"></option>
                <option value="5" label="5"></option>
                <option value="6" label="6"></option>
                <option value="7" label="7"></option>
                <option value="8" label="8"></option>
                <option value="9" label="9"></option>
              </datalist>
            </div>
          </div>
          <div className="inquiry-table-Visit-content-row">
            <div className="inquiry-table-Visit-content-row-left">
              <label htmlFor="prograf">prograf</label>
              <input
                defaultValue="0"
                onChange={handleChange}
                type="range"
                id="prograf"
                name="prograf"
                min="0"
                max="9"
                step="1"
                list="prograf"
              />

              <datalist id="prograf">
                <option value="0" label="0"></option>
                <option value="1" label="1"></option>
                <option value="2" label="2"></option>
                <option value="3" label="3"></option>
                <option value="4" label="4"></option>
                <option value="5" label="5"></option>
                <option value="6" label="6"></option>
                <option value="7" label="7"></option>
                <option value="8" label="8"></option>
                <option value="9" label="9"></option>
              </datalist>
            </div>
          </div>
          <h3 style={{ textAlign: "center", color: "#0c537b" }}>examination</h3>

          <div className="inquiry-table-Visit-content-row">
            <div className="inquiry-table-Visit-content-row-left">
              <label htmlFor="ptosis">ptosis</label>
              <input
                defaultValue="0"
                onChange={handleChange}
                type="range"
                id="ptosis"
                name="ptosis"
                min="0"
                max="1"
                step="1"
                list="ptosis"
              />

              <datalist id="ptosis">
                <option value="0" label="0"></option>
                <option value="1" label="1"></option>
              </datalist>
            </div>
            <div className="inquiry-table-Visit-content-row-right">
              <label htmlFor="diplopia">diplopia</label>
              <input
                defaultValue="0"
                onChange={handleChange}
                type="range"
                id="diplopia"
                name="diplopia"
                min="0"
                max="1"
                step="1"
                list="imuran"
              />

              <datalist id="diplopia">
                <option value="0" label="0"></option>
                <option value="1" label="1"></option>
              </datalist>
            </div>
          </div>
          <div className="inquiry-table-Visit-content-row">
            <div className="inquiry-table-Visit-content-row-left">
              <label htmlFor="dysphagia">dysphagia</label>
              <input
                defaultValue="0"
                onChange={handleChange}
                type="range"
                id="dysphagia"
                name="dysphagia"
                min="0"
                max="1"
                step="1"
                list="dysphagia"
              />

              <datalist id="dysphagia">
                <option value="0" label="0"></option>
                <option value="1" label="1"></option>
              </datalist>
            </div>
            <div className="inquiry-table-Visit-content-row-right">
              <label htmlFor="dysarthria">dysarthria</label>
              <input
                defaultValue="0"
                onChange={handleChange}
                type="range"
                id="dysarthria"
                name="dysarthria"
                min="0"
                max="1"
                step="1"
                list="dysarthria"
              />

              <datalist id="dysarthria">
                <option value="0" label="0"></option>
                <option value="1" label="1"></option>
              </datalist>
            </div>
          </div>
          <div className="inquiry-table-Visit-content-row">
            <div className="inquiry-table-Visit-content-row-left">
              <label htmlFor="dyspnea">dyspnea</label>
              <input
                defaultValue="0"
                onChange={handleChange}
                type="range"
                id="dyspnea"
                name="dyspnea"
                min="0"
                max="1"
                step="1"
                list="dyspnea"
              />

              <datalist id="dyspnea">
                <option value="0" label="0"></option>
                <option value="1" label="1"></option>
              </datalist>
            </div>
            <div className="inquiry-table-Visit-content-row-right">
              <label htmlFor="limpWeakness">limpWeakness</label>
              <input
                defaultValue="0"
                onChange={handleChange}
                type="range"
                id="limpWeakness"
                name="limpWeakness"
                min="0"
                max="1"
                step="1"
                list="limpWeakness"
              />

              <datalist id="limpWeakness">
                <option value="0" label="0"></option>
                <option value="1" label="1"></option>
              </datalist>
            </div>
          </div>
          <div className="inquiry-table-Visit-content-row">
            <div className="inquiry-table-Visit-content-row-left">
              <label htmlFor="MGFAclassification">MGFAclassification</label>
              <input
                defaultValue="0"
                onChange={handleChange}
                type="range"
                id="MGFAclassification"
                name="MGFAclassification"
                min="1"
                max="5"
                step="1"
                list="MGFAclassification"
              />

              <datalist id="MGFAclassification">
                <option value="1" label="1"></option>
                <option value="2" label="2"></option>
                <option value="3" label="3"></option>
                <option value="4" label="4"></option>
                <option value="5" label="5"></option>
              </datalist>
            </div>
          </div>
          <div className="inquiry-table-Visit-content-row">
            <div className="inquiry-table-Visit-content-row-SBP">
              <div className="inquiry-table-Visit-content-row-SBP-head">
                <label htmlFor="note">note</label>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  className="inquiry-table-Visit-content-row-input-note "
                  defaultValue=""
                  onChange={handleChange}
                  type="text"
                  id="note"
                  name="note"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="inquiry-table-Visit-submit">
          <button onClick={handleSubmit}>儲存</button>
        </div>
      </div>
    </div>
  );
};
export default Visit;
