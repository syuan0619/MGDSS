import "./Visit.css";
import { useState } from "react";
import { Slider } from "@mui/material";

const Visit = ({
  setReplaceComponent,
}: {
  setReplaceComponent: (table: string) => void;
}) => {
  const [Treat, setTreat] = useState<number>(0);
  const [SliderValueSelfAssessment, setSliderValueSelfAssessment] =
    useState<number>(0);
  const [SBP, setSBP] = useState<number>(0);
  const [DBP, setDBP] = useState<number>(0);
  const [pyridostigmine, setpyridostigmine] = useState<number>(0);
  const [compesolone, setCompesolone] = useState<number>(0);
  const [cellcept, setCellcept] = useState<number>(0);
  const [imuran, setImuran] = useState<number>(0);
  const [prograf, setPrograf] = useState<number>(0);

  const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.toISOString().slice(0, 10);
  };

  return (
    <div className="inquiry-table-Visit-all">
      <div className="inquiry-table-Visit-head-content ">
        <div className="inquiry-table-Visit-head">
          <h3>看診紀錄</h3>
        </div>
        <div className="inquiry-table-Visit-row">
          <div className="inquiry-table-Visit-left-row">
            <h3>住院治療方式 </h3>
            <Slider
              className="inquiry-table-Visit-left-slider"
              value={Treat}
              max={4}
              min={0}
              aria-label="Default"
              valueLabelDisplay="auto"
              onChange={(e, TreatValue) => {
                if (typeof TreatValue === "number") {
                  setTreat(TreatValue);
                }
              }}
            />
          </div>
          <div className="inquiry-table-Visit-right-row">
            <div className="inquiry-table-Visit-row-"></div>
            <h3>自覺嚴重程度</h3>
            <Slider
              className="inquiry-table-Visit-left-slider"
              value={SliderValueSelfAssessment}
              max={2}
              min={0}
              aria-label="Default"
              valueLabelDisplay="auto"
              onChange={(e, SelfAssessmentValue) => {
                if (typeof SelfAssessmentValue === "number") {
                  setSliderValueSelfAssessment(SelfAssessmentValue);
                }
              }}
            />
          </div>
          <div className="inquiry-table-Visit-row">
            <div className="inquiry-table-Visit-left-row">
              <h3>SBP </h3>
              <div className="inquiry-table-Visit-content-description">
                <input
                  type="number"
                  className="inquiry-table-Visit-textInput"
                  aria-label="SBP"
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (!isNaN(value)) {
                      setSBP(value);
                    }
                  }}
                />
              </div>
            </div>
            <div className="inquiry-table-Visit-right-row">
              <h3>DBP </h3>
              <div className="inquiry-table-Visit-content-description">
                <input
                  type="number"
                  className="inquiry-table-Visit-textInput"
                  aria-label="DBP"
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (!isNaN(value)) {
                      setDBP(value);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="inquiry-table-Visit-row">
          <div className="inquiry-table-Visit-left-row">
            <h3>大力丸用藥量 </h3>
            <Slider
              className="inquiry-table-Visit-left-slider"
              value={pyridostigmine}
              max={9}
              min={0}
              aria-label="Default"
              valueLabelDisplay="auto"
              onChange={(e, pyridostigmine) => {
                if (typeof pyridostigmine === "number") {
                  setpyridostigmine(pyridostigmine);
                }
              }}
            />
          </div>
          <div className="inquiry-table-Visit-right-row">
            <div className="inquiry-table-Visit-row-"></div>
            <h3>類固醇用藥量</h3>
            <Slider
              className="inquiry-table-Visit-left-slider"
              value={compesolone}
              max={2}
              min={0}
              aria-label="Default"
              valueLabelDisplay="auto"
              onChange={(e, compesolone) => {
                if (typeof compesolone === "number") {
                  setCompesolone(compesolone);
                }
              }}
            />
          </div>
        </div>
        <div className="inquiry-table-Visit-row">
          <div className="inquiry-table-Visit-left-row">
            <h3>山喜多用藥量 </h3>
            <Slider
              className="inquiry-table-Visit-left-slider"
              value={cellcept}
              max={9}
              min={0}
              aria-label="Default"
              valueLabelDisplay="auto"
              onChange={(e, cellcept) => {
                if (typeof cellcept === "number") {
                  setCellcept(cellcept);
                }
              }}
            />
          </div>
          <div className="inquiry-table-Visit-right-row">
            <div className="inquiry-table-Visit-row-"></div>
            <h3>移護寧用藥量</h3>
            <Slider
              className="inquiry-table-Visit-left-slider"
              value={imuran}
              max={9}
              min={0}
              aria-label="Default"
              valueLabelDisplay="auto"
              onChange={(e, imuran) => {
                if (typeof imuran === "number") {
                  setImuran(imuran);
                }
              }}
            />
          </div>
          <div className="inquiry-table-Visit-row">
            <div className="inquiry-table-Visit-left-row">
              <h3>SBP </h3>
              <div className="inquiry-table-Visit-content-description">
                <input
                  type="number"
                  className="inquiry-table-Visit-textInput"
                  aria-label="SBP"
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (!isNaN(value)) {
                      setSBP(value);
                    }
                  }}
                />
              </div>
            </div>
            <div className="inquiry-table-Visit-right-row">
              <h3>DBP </h3>
              <div className="inquiry-table-Visit-content-description">
                <input
                  type="number"
                  className="inquiry-table-Visit-textInput"
                  aria-label="DBP"
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (!isNaN(value)) {
                      setDBP(value);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="inquiry-table-Visit-content-submit">
          <button
            id="submitButton"
            onClick={() => {
              if (confirm("確定送出結果嗎?")) {
                //   console.log("VisitDescription", VisitDescription);
                console.log("Treat", Treat);
                console.log("SelfAssessmentValue", SliderValueSelfAssessment);
                console.log("SBP", SBP);
                console.log("DBP", DBP);
                console.log("Date", getCurrentDate());
              }
              setReplaceComponent("right");
            }}
          >
            將結果加入病歷
          </button>
        </div>
      </div>
    </div>
  );
};
export default Visit;
