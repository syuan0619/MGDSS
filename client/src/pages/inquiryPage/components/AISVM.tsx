import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AISVM = () => {
  return (
    <div className="AI-panel-option">
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>SVM</AccordionSummary>
        <AccordionDetails>
          <div className="AI-panel-img-area">
            <div className="AI-panel-img">
              <img src="" alt="result" />
            </div>
            <div className="AI-panel-img">
              <img src="" alt="result" />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AISVM;
