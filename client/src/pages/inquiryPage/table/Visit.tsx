import "./Visit.css";
import { useState } from "react";
import { Visit as typeVisit } from "../../../types/Patient";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { Alert, Stack } from "@mui/material";
import api from "../../../api";
import { useParams } from "react-router-dom";

const Visit = ({
  setReplaceComponent,
  selectedDate,
}: {
  setReplaceComponent: (table: string) => void;
  selectedDate: string;
}) => {
  const routeParams = useParams();

  const [VisitScore, setVisitscore] = useState<typeVisit>({
    testDate: selectedDate,
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
    },
    MGFAclassification: "",
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

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
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

      if (
        name === "testDate" ||
        name === "note" ||
        name === "MGFAclassification"
      ) {
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
          setReplaceComponent("right");
        });
    }
  };

  return (
    <div className="inquiry-table-Visit-all">
      <div className="inquiry-table-Visit-bg">
        <div className="inquiry-table-Visit-head">
          <div className="inquiry-table-Visit-return">
            <button
              className="Visit-backToRight"
              onClick={() => setReplaceComponent("right")}
            >
              <IoIosArrowDropleftCircle />
            </button>
          </div>
          <div className="inquiry-table-Visit-head-title">
            <p>Visit</p>
          </div>
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
            <div className="inquiry-table-Visit-content-row-MGFAclassification">
              <label htmlFor="MGFAclassification">MGFAclassification</label>
              <select
                name="MGFAclassification"
                id="MGFAclassification"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleChange(e)
                }
                required
              >
                <option value="">Please choose</option>
                <option value="I">I</option>
                <option value="II">II</option>
                <option value="IIA">IIA</option>
                <option value="IIB">IIB</option>
                <option value="III">III</option>
                <option value="IIIA">IIIA</option>
                <option value="IIIB">IIIB</option>
                <option value="IV">IV</option>
                <option value="IVA">IVA</option>
                <option value="IVB">IVB</option>
                <option value="V">V</option>
              </select>
            </div>
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

          <div className="examination">
            <div className="inquiry-table-Visit-content-row">
              <label htmlFor="diplopia">ptosis</label>
              <div className="radio">
                <div className="radio-yes">
                  <input
                    type="radio"
                    id="ptosis"
                    name="ptosis"
                    value="是"
                    onChange={handleChange}
                  />
                  <label className="visit-radio-label" htmlFor="ptosis">
                    是
                  </label>
                </div>
                <div className="radio-no">
                  <input
                    type="radio"
                    id="ptosis"
                    name="ptosis"
                    value="否"
                    onChange={handleChange}
                    checked
                  />
                  <label className="visit-radio-label" htmlFor="ptosis">
                    否
                  </label>
                </div>
              </div>
            </div>
            <div className="inquiry-table-Visit-content-row">
              <label htmlFor="diplopia">diplopia</label>
              <div className="radio">
                <div className="radio-yes">
                  <input
                    type="radio"
                    id="diplopia"
                    name="diplopia"
                    value="是"
                    onChange={handleChange}
                  />
                  <label className="visit-radio-label" htmlFor="diplopia">
                    是
                  </label>
                </div>
                <div className="radio-no">
                  <input
                    type="radio"
                    id="diplopia"
                    name="diplopia"
                    value="否"
                    onChange={handleChange}
                    checked
                  />
                  <label className="visit-radio-label" htmlFor="diplopia">
                    否
                  </label>
                </div>
              </div>
            </div>

            <div className="inquiry-table-Visit-content-row">
              <label htmlFor="dysphagia">dysphagia</label>
              <div className="radio">
                <div className="radio-yes">
                  <input
                    type="radio"
                    id="dysphagia"
                    name="dysphagia"
                    value="是"
                    onChange={handleChange}
                  />
                  <label className="visit-radio-label" htmlFor="dysphagia">
                    是
                  </label>
                </div>
                <div className="radio-no">
                  <input
                    type="radio"
                    id="dysphagia"
                    name="dysphagia"
                    value="否"
                    onChange={handleChange}
                    checked
                  />
                  <label className="visit-radio-label" htmlFor="dysphagia">
                    否
                  </label>
                </div>
              </div>
            </div>
            <div className="inquiry-table-Visit-content-row">
              <label htmlFor="dysarthria">dysarthria</label>
              <div className="radio">
                <div className="radio-yes">
                  <input
                    type="radio"
                    id="dysarthria"
                    name="dysarthria"
                    value="是"
                    onChange={handleChange}
                  />
                  <label className="visit-radio-label" htmlFor="dysarthria">
                    是
                  </label>
                </div>
                <div className="radio-no">
                  <input
                    type="radio"
                    id="dysarthria"
                    name="dysarthria"
                    value="否"
                    onChange={handleChange}
                    checked
                  />
                  <label className="visit-radio-label" htmlFor="dysarthria">
                    否
                  </label>
                </div>
              </div>
            </div>
            <div className="inquiry-table-Visit-content-row">
              <label htmlFor="dyspnea">dyspnea</label>
              <div className="radio">
                <div className="radio-yes">
                  <input
                    type="radio"
                    id="dyspnea"
                    name="dyspnea"
                    value="是"
                    onChange={handleChange}
                  />
                  <label className="visit-radio-label" htmlFor="dyspnea">
                    是
                  </label>
                </div>
                <div className="radio-no">
                  <input
                    type="radio"
                    id="dyspnea"
                    name="dyspnea"
                    value="否"
                    onChange={handleChange}
                    checked
                  />
                  <label className="visit-radio-label" htmlFor="dyspnea">
                    否
                  </label>
                </div>
              </div>
            </div>
            <div className="inquiry-table-Visit-content-row">
              <label htmlFor="limpWeakness">limpWeakness</label>
              <div className="radio">
                <div className="radio-yes">
                  <input
                    type="radio"
                    id="limpWeakness"
                    name="limpWeakness"
                    value="是"
                    onChange={handleChange}
                  />
                  <label className="visit-radio-label" htmlFor="limpWeakness">
                    是
                  </label>
                </div>
                <div className="radio-no">
                  <input
                    type="radio"
                    id="limpWeakness"
                    name="limpWeakness"
                    value="否"
                    onChange={handleChange}
                    checked
                  />
                  <label className="visit-radio-label" htmlFor="limpWeakness">
                    否
                  </label>
                </div>
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
