import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AIKNN = () => {
  return (
    <div className="AI-panel-option">
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>KNN</AccordionSummary>
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

export default AIKNN;
