import { Slider, styled } from "@mui/material";
import "./QOL.css";
const PrettoSlider = styled(Slider)({
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    "&::before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&::before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

const QOL = ({
  setReplaceComponent,
}: {
  setReplaceComponent: (table: string) => void;
}) => {
  return (
    <>
      <div className="inquiry-table-QOL">
        <button onClick={() => setReplaceComponent("right")}>
          backtoright
        </button>
        <div className="inquiry-table-QOL-header">QOL</div>
        <div className="inquiry-table-QOL-content">
          <div className="inquiry-table-QOL-content-sliderbox">
            <PrettoSlider
              valueLabelDisplay="auto"
              defaultValue={0}
              className="inquiry-table-QOL-content-slider"
              max={2}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default QOL;
