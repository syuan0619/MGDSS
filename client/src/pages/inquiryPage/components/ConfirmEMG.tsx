import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { EMG as typeEMG } from "../../../types/Patient";
import "./Confirm.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ConfirmEMG = ({
  title,
  initialData,
}: {
  title: string;
  initialData: typeEMG[];
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleChange = (isExpanded: boolean) => {
    setExpanded(isExpanded);
  };

  console.log(initialData);

  return (
    initialData && (
      <div className="readLable">
        <Accordion
          expanded={expanded}
          onChange={(e, isExpanded) => handleChange(isExpanded)}
          sx={{ width: "10vw" }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              {/* {EMGEntries.map(([name, value], index) => (
              <div key={index} style={{ marginBottom: "0.6rem" }}>
                <Typography>
                  {name}:
                  {typeof value === "object" ? JSON.stringify(value) : value}{" "}
                </Typography>
              </div>
            ))} */}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    )
  );
};
export default ConfirmEMG;
