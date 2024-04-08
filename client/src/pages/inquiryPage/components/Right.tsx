import "./right.css";
import { BloodTestSmallChart } from "../chart/BloodTest";
import { EMGSmallChart } from "../chart/EMG";
import { ADLSmallChart } from "../chart/ADL";
import { MGSmallChart } from "../chart/MG";
import { QMGSmallChart } from "../chart/QMG";
import { QOLSmallChart } from "../chart/QOL";
import { ThymusSmallChart } from "../chart/Thymus";
import { VisitSmallChart } from "../chart/Visit";
import { GiChart } from "react-icons/gi";
import { FaPencil } from "react-icons/fa6";
import { Patient } from "../../../types/Patient";

const Right = ({
  setReplaceComponent,
  patient,
}: {
  setReplaceComponent: (table: string) => void;
  patient: Patient;
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
            <p>ADL</p>
            <button
              className="inquiry-right-to-table-button"
              onClick={() => buttonToTable("ADL")}
            >
              <FaPencil className="tableIcon" />
            </button>
            <button
              className="inquiry-right-to-chart-button"
              onClick={() => buttonToChart("ADL")}
            >
              <GiChart className="chartIcon" />
            </button>
          </div>
          <ADLSmallChart historyData={patient.ADL} />
        </div>
        <div className="inquiry-right-each">
          <div className="inquiry-right-table-chart-container-BloodTest">
            <p>BloodTest</p>
            <button
              className="inquiry-right-to-table-button"
              onClick={() => buttonToTable("BloodTest")}
            >
              <FaPencil className="tableIcon" />
            </button>
            <button
              className="inquiry-right-to-chart-button"
              onClick={() => buttonToChart("BloodTest")}
            >
              <GiChart className="chartIcon" />
            </button>
          </div>
          <BloodTestSmallChart historyData={patient.bloodTest} />
        </div>
      </div>
      <div className="inquiry-right-set">
        <div className="inquiry-right-each">
          <div className="inquiry-right-table-chart-container">
            <p>EMG</p>
            <button
              className="inquiry-right-to-table-button"
              onClick={() => buttonToTable("EMG")}
            >
              <FaPencil className="tableIcon" />
            </button>
            <button
              className="inquiry-right-to-chart-button"
              onClick={() => buttonToChart("EMG")}
            >
              <GiChart className="chartIcon" />
            </button>
          </div>
          <EMGSmallChart historyData={patient.EMG} />
        </div>
        <div className="inquiry-right-each">
          <div className="inquiry-right-table-chart-container">
            <p>MG</p>
            <button
              className="inquiry-right-to-table-button"
              onClick={() => buttonToTable("MG")}
            >
              <FaPencil className="tableIcon" />
            </button>
            <button
              className="inquiry-right-to-chart-button"
              onClick={() => buttonToChart("MG")}
            >
              <GiChart className="chartIcon" />
            </button>
          </div>
          <MGSmallChart historyData={patient.MG} />
        </div>
      </div>
      <div className="inquiry-right-set">
        <div className="inquiry-right-each">
          <div className="inquiry-right-table-chart-container">
            <p>QMG</p>
            <button
              className="inquiry-right-to-table-button"
              onClick={() => buttonToTable("QMG")}
            >
              <FaPencil className="tableIcon" />
            </button>
            <button
              className="inquiry-right-to-chart-button"
              onClick={() => buttonToChart("QMG")}
            >
              <GiChart className="chartIcon" />
            </button>
          </div>
          <QMGSmallChart historyData={patient.QMG} />
        </div>
        <div className="inquiry-right-each">
          <div className="inquiry-right-table-chart-container">
            <p>QOL</p>
            <button
              className="inquiry-right-to-table-button"
              onClick={() => buttonToTable("QOL")}
            >
              <FaPencil className="tableIcon" />
            </button>
            <button
              className="inquiry-right-to-chart-button"
              onClick={() => buttonToChart("QOL")}
            >
              <GiChart className="chartIcon" />
            </button>
          </div>
          <QOLSmallChart historyData={patient.QOL} />
        </div>
      </div>
      <div className="inquiry-right-set">
        <div className="inquiry-right-each">
          <div className="inquiry-right-table-chart-container-Thymus">
            <p>Thymus</p>
            <button
              className="inquiry-right-to-table-button"
              onClick={() => buttonToTable("Thymus")}
            >
              <FaPencil className="tableIcon" />
            </button>
            <button
              className="inquiry-right-to-chart-button"
              onClick={() => buttonToChart("Thymus")}
            >
              <GiChart className="chartIcon" />
            </button>
          </div>
          <ThymusSmallChart historyData={patient.thymus} />
        </div>
        <div className="inquiry-right-each">
          <div className="inquiry-right-table-chart-container">
            <p>Visit</p>
            <button
              className="inquiry-right-to-table-button"
              onClick={() => buttonToTable("Visit")}
            >
              <FaPencil className="tableIcon" />
            </button>
            <button
              className="inquiry-right-to-chart-button"
              onClick={() => buttonToChart("Visit")}
            >
              <GiChart className="chartIcon" />
            </button>
          </div>
          <VisitSmallChart historyData={patient.visit} />
        </div>
      </div>
    </div>
  );
};
export default Right;
