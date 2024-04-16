import "./Visit.css";
import { useState } from "react";
import { Visit as typeVisit } from "../../../types/Patient";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { Alert, Stack } from "@mui/material";
import api from "../../../api";
import { useParams } from "react-router-dom";

const Visit = ({
  setReplaceComponent,
}: {
  setReplaceComponent: (table: string) => void;
}) => {
  const routeParams = useParams();

  const [VisitScore, setVisitscore] = useState<typeVisit>({
    testDate: "",
    treat: 0,
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
      MGFAclassification: "",
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

      if (name === "testDate" || name === "note") {
        console.log(value);
        setVisitscore({ ...VisitScore, [name]: value });
      } else if (name in VisitScore.prescription) {
        const updatedPrescription = {
          ...VisitScore.prescription,
          [name]: numericValue,
        };
        setVisitscore({ ...VisitScore, prescription: updatedPrescription });
      } else if (name in VisitScore.examination) {
        const updatedExamination = {
          ...VisitScore.examination,
          [name]: numericValue,
        };
        setVisitscore({ ...VisitScore, examination: updatedExamination });
      } else {
        setVisitscore({ ...VisitScore, [name]: numericValue });
      }
    } else {
      setErrors({ ...errors, [name]: "請輸入有效的數字！" });
      setWarnings({ ...warnings, [name]: "" });
    }
  };

  const handleSubmit = async () => {
    const confirmResult = confirm("確定送出結果嗎?");

    if (confirmResult) {
      console.log(VisitScore);
      await api
        .post(`/inquiry/${routeParams.id}/visit`, VisitScore)
        .then((res) => {
          console.log(res.data);
        });
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
          <p>Visit</p>
          <div className="inquiry-table-Visit-content-row-sum"></div>
        </div>
        <div className="inquiry-table-Visit-content">
          <div className="inquiry-table-Visit-content-row">
            <div className="inquiry-table-Visit-content-row-SBP">
              <label htmlFor="SBP">SBP</label>
              <div style={{ position: "relative" }}>
                <input
                  defaultValue="0"
                  onChange={handleChange}
                  type="text"
                  id="SBP"
                  name="SBP"
                />
                {errors.SBP && (
                  <div className="Visit-alert-input">{errors.SBP}</div>
                )}
                <Stack>
                  {warnings.SBP && (
                    <Alert severity="info">{warnings.SBP}</Alert>
                  )}
                </Stack>
                {!VisitScore.SBP && (
                  <div className="Visit-placeholder"> (mm/Hg)</div>
                )}
              </div>
            </div>
            <div className="inquiry-table-Visit-content-row-DBP">
              <label htmlFor="DBP">DBP</label>
              <div style={{ position: "relative" }}>
                <input
                  defaultValue="0"
                  onChange={handleChange}
                  type="text"
                  id="DBP"
                  name="DBP"
                />
                {errors.DBP && (
                  <div className="Visit-alert-input">{errors.DBP}</div>
                )}
                <Stack>
                  {warnings.DBP && (
                    <Alert severity="info">{warnings.DBP}</Alert>
                  )}
                </Stack>
                {!VisitScore.DBP && (
                  <div className="Visit-placeholder"> (mm/Hg)</div>
                )}
              </div>
            </div>
          </div>
          <div className="inquiry-table-Visit-content-row">
            <div className="inquiry-table-Visit-content-row-note">
              <label htmlFor="note">note</label>
              <input
                defaultValue=""
                onChange={handleChange}
                type="text"
                id="note"
                name="note"
              />
            </div>
            <div className="inquiry-table-Visit-content-row-nonefornote"></div>
          </div>

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
                list="tickmarks"
              />

              <datalist className="Visit-datalist" id="tickmarks">
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
                list="tickmarks"
              />

              <datalist id="tickmarks">
                <option value="0" label="0"></option>
                <option value="1" label="1"></option>
                <option value="2" label="2"></option>
              </datalist>
            </div>
          </div>
          <div className="subTitle">
            <p>prescription</p>
          </div>
          <div className="inquiry-table-Visit-content-row">
            <div className="inquiry-table-Visit-content-row-pyridostigmine">
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
                list="tickmarks-to9"
              />
              <datalist className="prescription-datalist" id="tickmarks-to9">
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
            <div className="inquiry-table-Visit-content-row-compesolone">
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
                list="tickmarks-to9"
              />

              <datalist className="prescription-datalist" id="tickmarks-to9">
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
            <div className="inquiry-table-Visit-content-row-cellcept">
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
                list="tickmarks-to9"
              />

              <datalist className="prescription-datalist" id="tickmarks-to9">
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
            <div className="inquiry-table-Visit-content-row-imuran">
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
                list="tickmarks-to9"
              />
              <datalist className="prescription-datalist" id="tickmarks-to9">
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
            <div className="inquiry-table-Visit-content-row-prograf">
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
                list="tickmarks-to9"
              />
              <datalist className="prescription-datalist" id="tickmarks-to9">
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
          <div className="subTitle">
            <p>examination</p>
          </div>
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
                list="tickmarks"
              />
              <datalist id="tickmarks">
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
                list="tickmarks"
              />

              <datalist id="tickmarks">
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
                list="tickmarks"
              />

              <datalist id="tickmarks">
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
                list="tickmarks"
              />

              <datalist id="tickmarks">
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
                list="tickmarks"
              />

              <datalist id="tickmarks">
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
                list="tickmarks"
              />
              <datalist id="tickmarks">
                <option value="0" label="0"></option>
                <option value="1" label="1"></option>
              </datalist>
            </div>
          </div>
          <div className="inquiry-table-Visit-content-row">
            <div className="inquiry-table-Visit-content-row-MGFAclassification">
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
                list="tickmarks-to5"
              />
              <datalist id="tickmarks-to5">
                <option value="1" label="1"></option>
                <option value="2" label="2"></option>
                <option value="3" label="3"></option>
                <option value="4" label="4"></option>
                <option value="5" label="5"></option>
              </datalist>
            </div>
            <div className="inquiry-table-Visit-content-row-MGFAclassification"></div>
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
