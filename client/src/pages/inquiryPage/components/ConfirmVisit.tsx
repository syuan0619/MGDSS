import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import "./Confirm.css";
import { Visit } from "../../../types/Patient";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type flatVisit = {
  testDate: string;
  treat: number;
  SBP: number;
  DBP: number;
  selfAssessment: number;
  note: string;
  pyridostigmine: number;
  compesolone: number;
  cellcept: number;
  imuran: number;
  prograf: number;
  ptosis: number;
  diplopia: number;
  dysphagia: number;
  dysarthria: number;
  dyspnea: number;
  limpWeakness: number;
  MGFAclassification: string;
};

const ConfirmVisit = ({
  title,
  initialData,
}: {
  title: string;
  initialData: Visit;
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const handleChange = () => {
    setExpanded(!expanded);
  };

  const flattenObject: flatVisit = {
    testDate: initialData.testDate,
    treat: initialData.treat,
    SBP: initialData.SBP,
    DBP: initialData.DBP,
    selfAssessment: initialData.selfAssessment,
    note: initialData.note,
    pyridostigmine: initialData.prescription.pyridostigmine,
    compesolone: initialData.prescription.compesolone,
    cellcept: initialData.prescription.cellcept,
    imuran: initialData.prescription.imuran,
    prograf: initialData.prescription.prograf,
    ptosis: initialData.examination.ptosis,
    diplopia: initialData.examination.diplopia,
    dysphagia: initialData.examination.dysphagia,
    dysarthria: initialData.examination.dysarthria,
    dyspnea: initialData.examination.dyspnea,
    limpWeakness: initialData.examination.limpWeakness,
    MGFAclassification: initialData.MGFAclassification,
  };

  return (
    initialData && (
      <div className="readLable">
        <Accordion
          expanded={expanded}
          onChange={handleChange}
          sx={{ width: "10vw" }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {Object.entries(flattenObject).map(([name, value], index) => (
              <div key={index} style={{ marginBottom: "0.6rem" }}>
                <Typography>
                  {name}: {value}
                </Typography>
              </div>
            ))}
          </AccordionDetails>
        </Accordion>
      </div>
    )
  );
};
export default ConfirmVisit;

// const flattenObject = {
//   testDate: initialData[0].testDate,
//   treat: initialData[0].treat,
//   SBP: initialData[0].SBP,
//   DBP: initialData[0].DBP,
//   selfAssessment: initialData[0].selfAssessment,
//   note: initialData[0].note,
//   pyridostigmine: initialData[0].prescription.pyridostigmine,
//   compesolone: initialData[0].prescription.compesolone,
//   cellcept: initialData[0].prescription.cellcept,
//   imuran: initialData[0].prescription.imuran,
//   prograf: initialData[0].prescription.prograf,
//   ptosis: initialData[0].examination.ptosis,
//   diplopia: initialData[0].examination.diplopia,
//   dysphagia: initialData[0].examination.dysphagia,
//   dysarthria: initialData[0].examination.dysarthria,
//   dyspnea: initialData[0].examination.dyspnea,
//   limpWeakness: initialData[0].examination.limpWeakness,
//   MGFAclassification: initialData[0].examination.MGFAclassification,
// };
// console.log(flattenObject);

// const [Visitscore] = useState<typeVisit>({
//   testDate: "",
//   treat: 0,
//   selfAssessment: 0,
//   note: "",
//   SBP: 0,
//   DBP: 0,
//   prescription: {
//     pyridostigmine: 0,
//     compesolone: 0,
//     cellcept: 0,
//     imuran: 0,
//     prograf: 0,
//   },
//   examination: {
//     ptosis: 0,
//     diplopia: 0,
//     dysphagia: 0,
//     dysarthria: 0,
//     dyspnea: 0,
//     limpWeakness: 0,
//     MGFAclassification: 0,
//   },
// });

// const VisitEntries: [string, number | string][] = [
//   ["testDate", Visitscore.testDate],
//   ["treat", Visitscore.treat],
//   ["selfAssessment", Visitscore.selfAssessment],
//   ["note", Visitscore.note],
//   ["SBP", Visitscore.SBP],
//   ["DBP", Visitscore.DBP],
//   ["pyridostigmine", Visitscore.prescription.pyridostigmine],
//   ["compesolone", Visitscore.prescription.compesolone],
//   ["cellcept", Visitscore.prescription.cellcept],
//   ["imuran", Visitscore.prescription.imuran],
//   ["prograf", Visitscore.prescription.prograf],
//   ["ptosis", Visitscore.examination.ptosis],
//   ["diplopia", Visitscore.examination.diplopia],
//   ["dysphagia", Visitscore.examination.dysphagia],
//   ["dysarthria", Visitscore.examination.dysarthria],
//   ["dyspnea", Visitscore.examination.dyspnea],
//   ["limpWeakness", Visitscore.examination.limpWeakness],
//   ["MGFAclassification", Visitscore.examination.MGFAclassification],
// ];
