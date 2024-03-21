import { LineChart } from "@mui/x-charts";

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
      prograf: 3,
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

const VisitxLabels = patientVisit.map((item) => item.date);

const Visit = () => {
  return (
    <div>
      <LineChart
        width={400}
        height={300}
        series={[
          {
            curve: "linear",
            data: pyridostigmineData,
            label: "pyridostigmine",
          },
          {
            curve: "linear",
            data: compesoloneData,
            label: "compesolone",
          },
          {
            curve: "linear",
            data: cellceptData,
            label: "cellcept",
          },
          {
            curve: "linear",
            data: imuranData,
            label: "imuran",
          },
          {
            curve: "linear",
            data: prografData,
            label: "prograf",
          },
        ]}
        xAxis={[{ scaleType: "point", data: VisitxLabels }]}
      />
    </div>
  );
};
export default Visit;
