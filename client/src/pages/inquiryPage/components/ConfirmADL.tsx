import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { ADL as typeADL } from "../../../types/Patient";
import "./Confirm.css";

const ConfirmADL = () => {
  const [ADLscore] = useState<typeADL>({
    testDate: "",
    talking: 0,
    chewing: 0,
    swallowing: 0,
    breathing: 0,
    brushTeethOrCombHair: 0,
    ariseFromChair: 0,
    eyelid: 0,
    sum: 0,
  });
  const ADLEntries: [string, number | string][] = Object.entries(ADLscore);
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
          <Typography>ADL</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            {ADLEntries.map(([name, value], index) => (
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

export default ConfirmADL;
