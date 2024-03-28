import { LineChart } from "@mui/x-charts";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import "./Chart.css";
import { Visit } from "../../../types/Patient";

const patientVisit = [
  {
    date: "2024-03-21",
    treat: 0,
    selfAssessment: 0,
    note: "",
    SBP: 0,
    DBP: 0,
    prescription: {
      pyridostigmine: 2,
      compesolone: 7,
      cellcept: 5,
      imuran: 5,
      prograf: 3,
    },
    examination: {
      ptosis: 1,
      diplopia: 2,
      dysphagia: 3,
      dysarthria: 0,
      dyspnea: 0,
      limpWeakness: 0,
      MGFAclassification: 0,
    },
  },
  {
    date: "2024-03-22",
    treat: 0,
    selfAssessment: 0,
    note: "",
    SBP: 0,
    DBP: 0,
    prescription: {
      pyridostigmine: 1,
      compesolone: 9,
      cellcept: 1,
      imuran: 7,
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
  },
  {
    date: "2024-03-31",
    treat: 0,
    selfAssessment: 0,
    note: "",
    SBP: 0,
    DBP: 0,
    prescription: {
      pyridostigmine: 9,
      compesolone: 8,
      cellcept: 3,
      imuran: 7,
      prograf: 2,
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
  },
];

const pyridostigmineData = patientVisit.map(
  (item) => item.prescription.pyridostigmine
);
const compesoloneData = patientVisit.map(
  (item) => item.prescription.compesolone
);
const cellceptData = patientVisit.map((item) => item.prescription.cellcept);
const imuranData = patientVisit.map((item) => item.prescription.imuran);
const prografData = patientVisit.map((item) => item.prescription.prograf);
const selfAssessmentDaya = patientVisit.map((item) => item.selfAssessment);
const VisitxLabels = patientVisit.map((item) => item.date);

const VisitChart = ({
  setReplaceComponent,
  historyData,
}: {
  setReplaceComponent: (table: string) => void;
  historyData: Visit[];
}) => {
  console.log(historyData);
  return (
    <div className="chart-bg">
      <div className="chart">
        <div className="chart-header">
          <button
            className="chart-backToRight"
            onClick={() => setReplaceComponent("right")}
          >
            <IoIosArrowDropleftCircle />
          </button>
          <p>Visit</p>
        </div>
        <div className="chart-footer">
          <LineChart
            margin={{ top: 100 }}
            slotProps={{
              legend: {
                itemGap: 20,
                padding: -5,
                itemMarkHeight: 5,
              },
            }}
            width={700}
            height={500}
            series={[
              {
                curve: "linear",
                data: pyridostigmineData,
                label: "pyridostigmine",
                color: "#5356FF",
              },
              {
                curve: "linear",
                data: compesoloneData,
                label: "compesolone",
                color: "#BC7AF9",
              },
              {
                curve: "linear",
                data: cellceptData,
                label: "cellcept",
                color: "#2D46B9",
              },
              {
                curve: "linear",
                data: imuranData,
                label: "imuran",
                color: "#0096FF",
              },
              {
                curve: "linear",
                data: prografData,
                label: "prograf",
                color: "#7469B6",
              },
              {
                curve: "linear",
                data: selfAssessmentDaya,
                label: "selfAssessment",
                color: "#836FFF",
              },
            ]}
            xAxis={[{ scaleType: "point", data: VisitxLabels }]}
          />
        </div>
      </div>
    </div>
  );
};

const VisitSmallChart = ({ historyData }: { historyData: ADL[] }) => {
  console.log(historyData);
  return (
    <div>
      <LineChart
        width={400}
        height={300}
        series={[
          {
            curve: "linear",
            data: prografData,
            label: "prograf",
            color: "#008dda",
          },
        ]}
        xAxis={[{ scaleType: "point", data: VisitxLabels }]}
      />
    </div>
  );
};
export { VisitSmallChart, VisitChart };
