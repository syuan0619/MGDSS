import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { Thymus, BloodTest, QOL, QMG, MG, ADL } from "../../../types/Patient";

const Confirm = ({
  title,
  initialData,
}: {
  title: string;
  initialData: Thymus[] | BloodTest[] | QOL[] | QMG[] | MG[] | ADL[];
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const handleChange = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="readLable">
      <Accordion
        expanded={expanded}
        onChange={handleChange}
        sx={{ width: "10vw" }}
      >
        <AccordionSummary>
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            {Object.entries(initialData).map(([name, value], index) => (
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

export default Confirm;
