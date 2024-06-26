import "./Visit.css";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { Alert, Stack } from "@mui/material";
import typeChange from "../../../types/Change";
import { useEffect, useState } from "react";
import { Visit } from "../../../types/Patient";
import { useParams } from "react-router-dom";
import api from "../../../api";

const TableVisit = ({
  setReplaceComponent,
  selectedDate,
  visitscore,
  setvisitscore,
  getAllData,
  changeOrNot,
  setChangeOrNot,
}: {
  setReplaceComponent: (table: string) => void;
  selectedDate: string;
  visitscore: Visit;
  setvisitscore: React.Dispatch<React.SetStateAction<Visit>>;
  getAllData: () => Promise<void>;
  changeOrNot: typeChange;
  setChangeOrNot: React.Dispatch<React.SetStateAction<typeChange>>;
}) => {
  const defaultVisit = {
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
    status: {
      isWaiting: false,
      description: "",
    },
  };
  const [defaultRes, setDefaultRes] = useState<Visit>(defaultVisit);
  const routeParams = useParams();
  const getDefaultData = async () => {
    try {
      const response = await api.get(
        `/inquiry/${routeParams.id}/visit/${selectedDate}`
      );
      setDefaultRes(response.data.table);
      setvisitscore(response.data.table);
    } catch {
      return;
    }
  };
  useEffect(() => {
    getDefaultData();
  }, [selectedDate]);

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
    const { name, value, type, checked } = e.target;

    if (type === "radio") {
      setvisitscore({
        ...visitscore,
        examination: {
          ...visitscore.examination,
          [name]: checked ? parseFloat(value) : 0,
        },
      });
      return;
    }
    const numericValue = value.trim() !== "" ? parseFloat(value) : 0;

    if (name in maxValues && numericValue > maxValues[name]) {
      setWarnings({
        ...warnings,
        [name]: `正常範圍到 ${maxValues[name]}, 請確認！`,
      });
    } else if (name in maxValues && typeof numericValue !== "number") {
      setErrors({ ...errors, [name]: "" });
      setWarnings({ ...warnings, [name]: "" });
    } else if (name in maxValues) {
      setvisitscore({ ...visitscore, [name]: numericValue });
    }

    if (!(name in maxValues)) {
      if (name === "note" || name === "MGFAclassification") {
        setvisitscore({ ...visitscore, [name]: value });
      } else if (name === "treat" || name === "selfAssessment") {
        setvisitscore({ ...visitscore, [name]: numericValue });
      } else if (name in visitscore.prescription) {
        const updatedPrescription = {
          ...visitscore.prescription,
          [name]: numericValue,
        };
        setvisitscore({ ...visitscore, prescription: updatedPrescription });
      } else if (name in visitscore.examination) {
        const updatedExamination = {
          ...visitscore.examination,
          [name]: numericValue,
        };
        setvisitscore({ ...visitscore, examination: updatedExamination });
      }
    }
  };

  const handleSubmit = async () => {
    if (
      visitscore.DBP === defaultVisit.DBP &&
      visitscore.MGFAclassification === defaultVisit.MGFAclassification &&
      visitscore.SBP === defaultVisit.SBP &&
      visitscore.note === defaultVisit.note &&
      visitscore.selfAssessment === defaultVisit.selfAssessment &&
      visitscore.treat === defaultVisit.treat &&
      visitscore.prescription.cellcept === defaultVisit.prescription.cellcept &&
      visitscore.prescription.compesolone ===
        defaultVisit.prescription.compesolone &&
      visitscore.prescription.imuran === defaultVisit.prescription.imuran &&
      visitscore.prescription.prograf === defaultVisit.prescription.prograf &&
      visitscore.prescription.pyridostigmine ===
        defaultVisit.prescription.pyridostigmine
    ) {
      alert("請輸入有效欄位!");
    } else {
      console.log("visitscore", visitscore);
      setReplaceComponent("right");
      setChangeOrNot({ ...changeOrNot, changeVisit: true });
      getAllData();
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
                  value={visitscore.SBP}
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
                {!visitscore.SBP && (
                  <div className="Visit-placeholder"> (mm/Hg)</div>
                )}
              </div>
            </div>
            <div className="inquiry-table-Visit-content-row-DBP">
              <label htmlFor="DBP">DBP</label>
              <div style={{ position: "relative" }}>
                <input
                  value={visitscore.DBP}
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
                {!visitscore.DBP && (
                  <div className="Visit-placeholder"> (mm/Hg)</div>
                )}
              </div>
            </div>
          </div>
          <div className="inquiry-table-Visit-content-row">
            <div className="inquiry-table-Visit-content-row-note">
              <label htmlFor="note">note</label>
              <input
                value={visitscore.note}
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
                onChange={handleChange}
                value={visitscore.MGFAclassification}
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
                value={visitscore.treat}
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
                value={visitscore.selfAssessment}
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
                value={visitscore.prescription.pyridostigmine}
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
                value={visitscore.prescription.compesolone}
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
                value={visitscore.prescription.cellcept}
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
                value={visitscore.prescription.imuran}
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
                value={visitscore.prescription.prograf}
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
                    id="ptosis-yes"
                    name="ptosis"
                    value={1}
                    checked={visitscore.examination.ptosis === 1}
                    onChange={handleChange}
                  />
                  <label htmlFor="ptosis-yes">是</label>
                </div>
                <div className="radio-no">
                  <input
                    type="radio"
                    id="ptosis-no"
                    name="ptosis"
                    value={0}
                    checked={visitscore.examination.ptosis === 0}
                    onChange={handleChange}
                  />
                  <label htmlFor="ptosis-no">否</label>{" "}
                </div>
              </div>
            </div>
            <div className="inquiry-table-Visit-content-row">
              <label htmlFor="diplopia">diplopia</label>
              <div className="radio">
                <div className="radio-yes">
                  <input
                    type="radio"
                    id="diplopia-yes"
                    name="diplopia"
                    value={1}
                    checked={visitscore.examination.diplopia === 1}
                    onChange={handleChange}
                  />
                  <label htmlFor="diplopia-yes">是</label>{" "}
                </div>
                <div className="radio-no">
                  <input
                    type="radio"
                    id="diplopia-no"
                    name="diplopia"
                    value={0}
                    checked={visitscore.examination.diplopia === 0}
                    onChange={handleChange}
                  />
                  <label htmlFor="diplopia-no">否</label>{" "}
                </div>
              </div>
            </div>

            <div className="inquiry-table-Visit-content-row">
              <label htmlFor="dysphagia">dysphagia</label>
              <div className="radio">
                <div className="radio-yes">
                  <input
                    type="radio"
                    id="dysphagia-yes"
                    name="dysphagia"
                    value={1}
                    checked={visitscore.examination.dysphagia === 1}
                    onChange={handleChange}
                  />
                  <label htmlFor="dysphagia-yes">是</label>{" "}
                </div>
                <div className="radio-no">
                  <input
                    type="radio"
                    id="dysphagia-no"
                    name="dysphagia"
                    value={1}
                    checked={visitscore.examination.dysphagia === 0}
                    onChange={handleChange}
                  />
                  <label htmlFor="dysphagia-no">否</label>{" "}
                </div>
              </div>
            </div>
            <div className="inquiry-table-Visit-content-row">
              <label htmlFor="dysarthria">dysarthria</label>
              <div className="radio">
                <div className="radio-yes">
                  <input
                    type="radio"
                    id="dysarthria-yes"
                    name="dysarthria"
                    value={1}
                    checked={visitscore.examination.dysarthria === 1}
                    onChange={handleChange}
                  />
                  <label htmlFor="dysarthria-yes">是</label>{" "}
                </div>
                <div className="radio-no">
                  <input
                    type="radio"
                    id="dysarthria-no"
                    name="dysarthria"
                    value={0}
                    checked={visitscore.examination.dysarthria === 0}
                    onChange={handleChange}
                  />
                  <label htmlFor="dysarthria-no">否</label>{" "}
                </div>
              </div>
            </div>
            <div className="inquiry-table-Visit-content-row">
              <label htmlFor="dyspnea">dyspnea</label>
              <div className="radio">
                <div className="radio-yes">
                  <input
                    type="radio"
                    id="dyspnea-yes"
                    name="dyspnea"
                    value={1}
                    checked={visitscore.examination.dyspnea === 1}
                    onChange={handleChange}
                  />
                  <label htmlFor="dyspnea-yes">是</label>{" "}
                </div>
                <div className="radio-no">
                  <input
                    type="radio"
                    id="dyspnea-no"
                    name="dyspnea"
                    value={0}
                    checked={visitscore.examination.dyspnea === 0}
                    onChange={handleChange}
                  />
                  <label htmlFor="dyspnea-no">否</label>{" "}
                </div>
              </div>
            </div>
            <div className="inquiry-table-Visit-content-row">
              <label htmlFor="limpWeakness">limpWeakness</label>
              <div className="radio">
                <div className="radio-yes">
                  <input
                    type="radio"
                    id="limpWeakness-yes"
                    name="limpWeakness"
                    value={1}
                    checked={visitscore.examination.limpWeakness === 1}
                    onChange={handleChange}
                  />
                  <label htmlFor="limpWeakness-yes">是</label>{" "}
                </div>
                <div className="radio-no">
                  <input
                    type="radio"
                    id="limpWeakness-no"
                    name="limpWeakness"
                    value={1}
                    checked={visitscore.examination.limpWeakness === 0}
                    onChange={handleChange}
                  />
                  <label htmlFor="limpWeakness-no">否</label>{" "}
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
export default TableVisit;
