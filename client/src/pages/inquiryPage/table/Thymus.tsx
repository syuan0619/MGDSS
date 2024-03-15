import "./Thymus.css";
import { useState } from "react";
import { Slider } from "@mui/material";

const Thymus = ({
  setReplaceComponent,
}: {
  setReplaceComponent: (table: string) => void;
}) => {
  const [ThymusDescription, setThymusDescription] = useState<string>("");
  const [sliderValue, setSliderValue] = useState<number>(0);

  const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.toISOString().slice(0, 10);
  };

  return (
    <div className="inquiry-table-Thymus-all">
      <div className="inquiry-table-Thymus-head-content ">
        <div className="inquiry-table-Thymus-head">
          <h3>胸腺掃描</h3>
        </div>
        <div className="inquiry-table-Thymus-content-text">
          <h3>掃描結果 </h3>
          <Slider
            className="inquiry-table-Thymus-content-slider"
            value={sliderValue}
            max={3}
            min={0}
            aria-label="Default"
            valueLabelDisplay="auto"
            onChange={(e, newValue) => {
              if (typeof newValue === "number") {
                setSliderValue(newValue);
              }
            }}
          />
          <h3>掃描結果敘述 </h3>
          <div className="inquiry-table-Thymus-content-description">
            <textarea
              className="inquiry-table-Thymus-textArea"
              aria-label="Temperature"
              id="description"
              onChange={(e) => {
                setThymusDescription(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="inquiry-table-Thymus-content-submit">
          <button
            id="submitButton"
            onClick={() => {
              if (confirm("確定送出結果嗎?")) {
                console.log("thymusDescription", ThymusDescription);
                console.log("sliderValue", sliderValue);
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

export default Thymus;
