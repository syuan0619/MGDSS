import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Visit as typeVisit } from "../../../types/Patient";
import "./Confirm.css";

const ConfirmVisit = () => {
  const [Visitscore] = useState<typeVisit>({
    date: "",
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
      MGFAclassification: 0,
    },
  });

  const VisitEntries: [string, number | string][] = [
    ["date", Visitscore.date],
    ["treat", Visitscore.treat],
    ["selfAssessment", Visitscore.selfAssessment],
    ["note", Visitscore.note],
    ["SBP", Visitscore.SBP],
    ["DBP", Visitscore.DBP],
    ["pyridostigmine", Visitscore.prescription.pyridostigmine],
    ["compesolone", Visitscore.prescription.compesolone],
    ["cellcept", Visitscore.prescription.cellcept],
    ["imuran", Visitscore.prescription.imuran],
    ["prograf", Visitscore.prescription.prograf],
    ["ptosis", Visitscore.examination.ptosis],
    ["diplopia", Visitscore.examination.diplopia],
    ["dysphagia", Visitscore.examination.dysphagia],
    ["dysarthria", Visitscore.examination.dysarthria],
    ["dyspnea", Visitscore.examination.dyspnea],
    ["limpWeakness", Visitscore.examination.limpWeakness],
    ["MGFAclassification", Visitscore.examination.MGFAclassification],
  ];
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleChange = (isExpanded: boolean) => {
    setExpanded(isExpanded);
  };

  return (
    <div className="readLable">
      <Accordion
        expanded={expanded}
        onChange={(e, isExpanded) => handleChange(isExpanded)}
        sx={{ width: "10vw" }}
      >
        <AccordionSummary>
          <Typography>Visit</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            {VisitEntries.map(([name, value], index) => (
              <div key={index} style={{ marginBottom: "0.6rem" }}>
                <Typography>
                  {name}: {value}
                </Typography>
              </div>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
export default ConfirmVisit;
