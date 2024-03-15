import "./Visit.css";
import { useState } from "react";
import { Slider } from "@mui/material";

const Visit = ({
  setReplaceComponent,
}: {
  setReplaceComponent: (table: string) => void;
}) => {
  const [formData, setFormData] = useState({
    treat: 0,
    sliderValueSelfAssessment: 0,
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

  const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.toISOString().slice(0, 10);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (confirm("確定送出結果嗎?")) {
      console.log("Form Data:", formData);
      console.log("Date", getCurrentDate());
      setReplaceComponent("right");
    }
  };

  const marks0to4 = [
    { value: 0, label: 0 },
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
  ];

  const marks0to2 = [
    { value: 0, label: 0 },
    { value: 1, label: 1 },
    { value: 2, label: 1 },
  ];

  const marks0to5 = [
    { value: 0, label: 0 },
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
  ];

  const marks0to9 = [
    { value: 0, label: 0 },
    { value: 3, label: 3 },
    { value: 6, label: 6 },
    { value: 9, label: 9 },
  ];

  return (
    <div className="inquiry-table-Visit-all">
      <div className="inquiry-table-Visit-head-content">
        <div className="inquiry-table-Visit-head">
          <h3>看診紀錄</h3>
        </div>
        <form onSubmit={onSubmit}>
          <div className="inquiry-table-Visit-row">
            <div className="inquiry-table-Visit-left-row">
              <h3>住院治療方式 </h3>
              <Slider
                className="inquiry-table-Visit-left-slider"
                value={formData.treat}
                max={4}
                min={0}
                valueLabelDisplay="auto"
                marks={marks0to4}
                onChange={(event) => {
                  const value = (event.target as HTMLInputElement).value;
                  setFormData({
                    ...formData,
                    treat: Number(value),
                  });
                }}
              />
            </div>
            <div className="inquiry-table-Visit-right-row">
              <div className="inquiry-table-Visit-row-"></div>
              <h3>自覺嚴重程度</h3>
              <Slider
                className="inquiry-table-Visit-left-slider"
                value={formData.sliderValueSelfAssessment}
                max={2}
                min={0}
                valueLabelDisplay="auto"
                marks={marks0to2}
                onChange={(event) => {
                  const value = (event.target as HTMLInputElement).value;
                  setFormData({
                    ...formData,
                    sliderValueSelfAssessment: Number(value),
                  });
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
                    onChange={(event) => {
                      const value = (event.target as HTMLInputElement).value;
                      setFormData({
                        ...formData,
                        SBP: Number(value),
                      });
                    }}
                  />
                </div>
              </div>
              <div className="inquiry-table-Visit-right-row">
                <h3>DBP </h3>
                <div className="inquiry-table-Visit-content-description">
                  <input
                    className="inquiry-table-Visit-textInput"
                    aria-label="DBP"
                    onChange={(event) => {
                      const value = (event.target as HTMLInputElement).value;
                      setFormData({
                        ...formData,
                        DBP: Number(value),
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <h4 style={{ textAlign: "center" }}>處方</h4>
          <div className="inquiry-table-Visit-row">
            <div className="inquiry-table-Visit-left-row">
              <h3>大力丸用藥量 </h3>
              <Slider
                className="inquiry-table-Visit-left-slider"
                value={formData.prescription.pyridostigmine}
                max={9}
                min={0}
                valueLabelDisplay="auto"
                marks={marks0to9}
                onChange={(event) => {
                  const value = (event.target as HTMLInputElement).value;
                  setFormData({
                    ...formData,
                    prescription: {
                      ...formData.prescription,
                      pyridostigmine: Number(value),
                    },
                  });
                }}
              />
            </div>
            <div className="inquiry-table-Visit-right-row">
              <div className="inquiry-table-Visit-row-"></div>
              <h3>類固醇用藥量</h3>
              <Slider
                className="inquiry-table-Visit-left-slider"
                value={formData.prescription.compesolone}
                max={9}
                min={0}
                valueLabelDisplay="auto"
                marks={marks0to9}
                onChange={(event) => {
                  const value = (event.target as HTMLInputElement).value;
                  setFormData({
                    ...formData,
                    prescription: {
                      ...formData.prescription,
                      compesolone: Number(value),
                    },
                  });
                }}
              />
            </div>
          </div>
          <div className="inquiry-table-Visit-row">
            <div className="inquiry-table-Visit-left-row">
              <h3>山喜多用藥量 </h3>
              <Slider
                className="inquiry-table-Visit-left-slider"
                value={formData.prescription.cellcept}
                max={9}
                min={0}
                valueLabelDisplay="auto"
                marks={marks0to9}
                onChange={(event) => {
                  const value = (event.target as HTMLInputElement).value;
                  setFormData({
                    ...formData,
                    prescription: {
                      ...formData.prescription,
                      cellcept: Number(value),
                    },
                  });
                }}
              />
            </div>
            <div className="inquiry-table-Visit-right-row">
              <div className="inquiry-table-Visit-row-"></div>
              <h3>移護寧用藥量</h3>
              <Slider
                className="inquiry-table-Visit-left-slider"
                value={formData.prescription.imuran}
                max={9}
                min={0}
                valueLabelDisplay="auto"
                marks={marks0to9}
                onChange={(event) => {
                  const value = (event.target as HTMLInputElement).value;
                  setFormData({
                    ...formData,
                    prescription: {
                      ...formData.prescription,
                      imuran: Number(value),
                    },
                  });
                }}
              />
            </div>
          </div>
          <div className="inquiry-table-Visit-row">
            <div className="inquiry-table-Visit-left-row">
              <h3>普洛可用藥量</h3>
              <Slider
                className="inquiry-table-Visit-left-slider"
                value={formData.prescription.prograf}
                max={9}
                min={0}
                valueLabelDisplay="auto"
                marks={marks0to9}
                onChange={(event) => {
                  const value = (event.target as HTMLInputElement).value;
                  setFormData({
                    ...formData,
                    prescription: {
                      ...formData.prescription,
                      prograf: Number(value),
                    },
                  });
                }}
              />
            </div>
          </div>
          <h4 style={{ textAlign: "center" }}>檢測</h4>
          <div className="inquiry-table-Visit-row">
            <div className="inquiry-table-Visit-left-row">
              <h3>眼瞼下垂 </h3>
              <Slider
                className="inquiry-table-Visit-left-slider"
                value={formData.examination.ptosis}
                max={1}
                min={0}
                valueLabelDisplay="auto"
                marks={marks0to5}
                onChange={(event) => {
                  const value = (event.target as HTMLInputElement).value;
                  setFormData({
                    ...formData,
                    examination: {
                      ...formData.examination,
                      ptosis: Number(value),
                    },
                  });
                }}
              />
            </div>
            <div className="inquiry-table-Visit-right-row">
              <div className="inquiry-table-Visit-row-"></div>
              <h3>複視</h3>
              <Slider
                className="inquiry-table-Visit-left-slider"
                value={formData.examination.diplopia}
                max={1}
                min={0}
                valueLabelDisplay="auto"
                marks={marks0to5}
                onChange={(event) => {
                  const value = (event.target as HTMLInputElement).value;
                  setFormData({
                    ...formData,
                    examination: {
                      ...formData.examination,
                      diplopia: Number(value),
                    },
                  });
                }}
              />
            </div>
          </div>
          <div className="inquiry-table-Visit-row">
            <div className="inquiry-table-Visit-left-row">
              <h3>吞嚥困難</h3>
              <Slider
                className="inquiry-table-Visit-left-slider"
                value={formData.examination.dysphagia}
                max={1}
                min={0}
                valueLabelDisplay="auto"
                marks={marks0to5}
                onChange={(event) => {
                  const value = (event.target as HTMLInputElement).value;
                  setFormData({
                    ...formData,
                    examination: {
                      ...formData.examination,
                      dysphagia: Number(value),
                    },
                  });
                }}
              />
            </div>
            <div className="inquiry-table-Visit-right-row">
              <div className="inquiry-table-Visit-row-"></div>
              <h3>講話不清</h3>
              <Slider
                className="inquiry-table-Visit-left-slider"
                value={formData.examination.dysarthria}
                max={1}
                min={0}
                valueLabelDisplay="auto"
                marks={marks0to5}
                onChange={(event) => {
                  const value = (event.target as HTMLInputElement).value;
                  setFormData({
                    ...formData,
                    examination: {
                      ...formData.examination,
                      dysarthria: Number(value),
                    },
                  });
                }}
              />
            </div>
          </div>
          <div className="inquiry-table-Visit-row">
            <div className="inquiry-table-Visit-left-row">
              <h3>呼吸困難</h3>
              <Slider
                className="inquiry-table-Visit-left-slider"
                value={formData.examination.dyspnea}
                max={1}
                min={0}
                valueLabelDisplay="auto"
                marks={marks0to5}
                onChange={(event) => {
                  const value = (event.target as HTMLInputElement).value;
                  setFormData({
                    ...formData,
                    examination: {
                      ...formData.examination,
                      dyspnea: Number(value),
                    },
                  });
                }}
              />
            </div>
            <div className="inquiry-table-Visit-right-row">
              <div className="inquiry-table-Visit-row-"></div>
              <h3>手腳無力</h3>
              <Slider
                className="inquiry-table-Visit-left-slider"
                value={formData.examination.limpWeakness}
                max={1}
                min={0}
                valueLabelDisplay="auto"
                marks={marks0to5}
                onChange={(event) => {
                  const value = (event.target as HTMLInputElement).value;
                  setFormData({
                    ...formData,
                    examination: {
                      ...formData.examination,
                      limpWeakness: Number(value),
                    },
                  });
                }}
              />
            </div>
          </div>
          <div className="inquiry-table-Visit-row">
            <div className="inquiry-table-Visit-left-row">
              <h3>MGFA協會分類</h3>
              <Slider
                className="inquiry-table-Visit-left-slider"
                value={formData.examination.MGFAclassification}
                max={5}
                min={0}
                valueLabelDisplay="auto"
                marks={marks0to5}
                onChange={(event) => {
                  const value = (event.target as HTMLInputElement).value;
                  setFormData({
                    ...formData,
                    examination: {
                      ...formData.examination,
                      MGFAclassification: Number(value),
                    },
                  });
                }}
              />
            </div>
          </div>
          <h4 style={{ textAlign: "center" }}>註記</h4>
          <div className="inquiry-table-Visit-note">
            <textarea
              className="inquiry-table-Visit-textArea"
              aria-label="Temperature"
              id="Note"
              onChange={(e) => {
                setFormData({ ...formData, note: e.target.value });
              }}
            />
          </div>
          <div className="inquiry-table-Visit-content-submit">
            <button id="submitButton" type="submit">
              將結果加入病歷
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Visit;
