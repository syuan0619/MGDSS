import "./right.css";
import ADL from "../chart/ADL";
import BloodTest from "../chart/BloodTest";
import EMG from "../chart/EMG";
import MG from "../chart/MG";
import QMG from "../chart/QMG";
import QOL from "../chart/QOL";
import Thymus from "../chart/Thymus";
import Visit from "../chart/Visit";
import { GiChart } from "react-icons/gi";
import TuneIcon from "@mui/icons-material/Tune";

const Right = ({
  setReplaceComponent,
}: {
  setReplaceComponent: (table: string) => void;
}) => {
  const buttonToTable = (whichTable: string) => {
    setReplaceComponent(whichTable + "table");
  };

  const buttonToChart = (whichChart: string) => {
    setReplaceComponent(whichChart + "chart");
  };

  return (
    <div className="inquiry-right-all">
      <div className="inquiry-right-set">
        <div className="inquiry-right-each">
          <div className="inquiry-right-table-chart-container">
            <button
              className="inquiry-right-to-table-button"
              onClick={() => buttonToTable("ADL")}
            >
              toADLtable
            </button>
            <button
              className="inquiry-right-to-chart-button"
              onClick={() => buttonToChart("ADL")}
            >
              <GiChart className="chartIcon" />
            </button>
          </div>
          <ADL />
        </div>
        <div className="inquiry-right-each">
          <div className="inquiry-right-table-chart-container">
            <button
              className="inquiry-right-to-table-button"
              onClick={() => buttonToTable("BloodTest")}
            >
              toBloodTesttable
            </button>
            <button
              className="inquiry-right-to-chart-button"
              onClick={() => buttonToChart("BloodTest")}
            >
              <GiChart className="chartIcon" />
            </button>
          </div>
          <BloodTest />
        </div>
      </div>
      <div className="inquiry-right-set">
        <div className="inquiry-right-each">
          <div className="inquiry-right-table-chart-container">
            <button
              className="inquiry-right-to-table-button"
              onClick={() => buttonToTable("EMG")}
            >
              toEMGtable
            </button>
            <button
              className="inquiry-right-to-chart-button"
              onClick={() => buttonToChart("EMG")}
            >
              <GiChart className="chartIcon" />
            </button>
          </div>
          <EMG />
        </div>
        <div className="inquiry-right-each">
          <div className="inquiry-right-table-chart-container">
            <button
              className="inquiry-right-to-table-button"
              onClick={() => buttonToTable("MG")}
            >
              toMGtable
            </button>
            <button
              className="inquiry-right-to-chart-button"
              onClick={() => buttonToChart("MG")}
            >
              <GiChart className="chartIcon" />
            </button>
          </div>
          <MG />
        </div>
      </div>
      <div className="inquiry-right-set">
        <div className="inquiry-right-each">
          QMG
          <div className="inquiry-right-table-chart-container">
            <button
              className="inquiry-right-to-table-button"
              onClick={() => buttonToTable("QMG")}
            >
              <TuneIcon />
            </button>
            <button
              className="inquiry-right-to-chart-button"
              onClick={() => buttonToChart("QMG")}
            >
              <GiChart className="chartIcon" />
            </button>
          </div>
          <QMG />
        </div>
        <div className="inquiry-right-each">
          QOL
          <div className="inquiry-right-table-chart-container">
            <button
              className="inquiry-right-to-table-button"
              onClick={() => buttonToTable("QOL")}
            >
              <TuneIcon />
            </button>
            <button
              className="inquiry-right-to-chart-button"
              onClick={() => buttonToChart("QOL")}
            >
              <GiChart className="chartIcon" />
            </button>
          </div>
          <QOL />
        </div>
      </div>
      <div className="inquiry-right-set">
        <div className="inquiry-right-each">
          <div className="inquiry-right-table-chart-container">
            <button
              className="inquiry-right-to-table-button"
              onClick={() => buttonToTable("Thymus")}
            >
              toThymustable
            </button>
            <button
              className="inquiry-right-to-chart-button"
              onClick={() => buttonToChart("Thymus")}
            >
              <GiChart className="chartIcon" />
            </button>
          </div>
          <Thymus />
        </div>
        <div className="inquiry-right-each">
          <div className="inquiry-right-table-chart-container">
            <button
              className="inquiry-right-to-table-button"
              onClick={() => buttonToTable("Visit")}
            >
              toVisittable
            </button>
            <button
              className="inquiry-right-to-chart-button"
              onClick={() => buttonToChart("Visit")}
            >
              <GiChart className="chartIcon" />
            </button>
          </div>
          <Visit />
        </div>
      </div>
    </div>
  );
};
export default Right;
