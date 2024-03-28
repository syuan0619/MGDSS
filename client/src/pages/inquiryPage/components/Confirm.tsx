import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";

type ConfirmProps<T> = {
  title: string;
  initialData: T;
};

const Confirm = <T extends Record<string, string | number>>({
  title,
  initialData,
}: ConfirmProps<T>) => {
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
