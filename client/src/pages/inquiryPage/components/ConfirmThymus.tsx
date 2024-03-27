import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Thymus as typeThymus } from "../../../types/Patient";
import "./Confirm.css";

const ConfirmThymus = () => {
  const [Thymusscore] = useState<typeThymus>({
    testDate: "",
    thymusStatus: 0,
    thymusDescription: "",
  });
  const ThymusEntries: [string, number | string][] =
    Object.entries(Thymusscore);
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
          <Typography>Thymus</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            {ThymusEntries.map(([name, value], index) => (
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
export default ConfirmThymus;
