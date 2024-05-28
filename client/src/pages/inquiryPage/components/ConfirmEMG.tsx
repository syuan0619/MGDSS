import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { noImageType } from "../../../types/Patient";
import "./Confirm.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ConfirmEMG = ({
  title,
  initialData,
}: {
  title: string;
  initialData: noImageType;
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleChange = (isExpanded: boolean) => {
    setExpanded(isExpanded);
  };

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
            <div style={{ marginBottom: "0.6rem" }}>
              <Typography>testDate: {initialData.testDate}</Typography>
              {initialData.abd.preActivation !== 0 || null ? (
                <Typography>
                  abd-preActivation: {initialData.abd.preActivation}
                </Typography>
              ) : (
                ""
              )}
              {Object.keys(initialData.abd.postActivation).length !== 0 ||
              null ? (
                <Typography>
                  abd-postActivation: {initialData.abd.postActivation}
                </Typography>
              ) : (
                ""
              )}
              <br />
              {initialData.nasalis.preActivation !== 0 || null ? (
                <Typography>
                  nasalis-preActivation: {initialData.nasalis.preActivation}
                </Typography>
              ) : (
                ""
              )}
              {Object.keys(initialData.nasalis.postActivation).length !== 0 ||
              null ? (
                <Typography>
                  nasalis-postActivation: {initialData.nasalis.postActivation}
                </Typography>
              ) : (
                ""
              )}
              <br />
              {initialData.trapezius.preActivation !== 0 || null ? (
                <Typography>
                  trapezius-preActivation: {initialData.trapezius.preActivation}
                </Typography>
              ) : (
                ""
              )}
              {Object.keys(initialData.trapezius.postActivation).length !== 0 ||
              null ? (
                <Typography>
                  trapezius-postActivation:{" "}
                  {initialData.trapezius.postActivation.join(", ")}
                </Typography>
              ) : (
                ""
              )}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    )
  );
};
export default ConfirmEMG;
