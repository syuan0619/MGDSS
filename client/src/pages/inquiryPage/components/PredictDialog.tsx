import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import ConfirmPanel from "./ConfirmPanel";
import { useState } from "react";
import AIDialog from "./AIDialog";

const PredictDialog = ({
  open,
  handleClose,
  selectedDate,
}: {
  open: boolean;
  handleClose: () => void;
  selectedDate: string | undefined;
}) => {
  const [AIStatus, setAIStatus] = useState(false);
  const AIDialogOpen = () => {
    setAIStatus(true);
  };
  const AIDialogHide = () => {
    setAIStatus(false);
  };
  const handleCloseAll = () => {
    handleClose(); // Close PredictDialog
    AIDialogHide(); // Close AIDialog
  };
  return (
    <Dialog className="predictDialog" open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontSize: "1.5rem" }}>確認病患資訊</DialogTitle>
      <DialogContent className="predictDialog-content">
        <ConfirmPanel selectedDate={selectedDate ? selectedDate : ""} />
      </DialogContent>
      <DialogActions>
        <IconButton
          className="deleteIcon-predict"
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: "1.3rem",
            top: "1.3rem",
            width: "3.5rem",
            height: "3.5rem",
          }}
        >
          <CloseIcon sx={{ fontSize: "1.4rem" }} />
        </IconButton>
        <Button variant="contained" color="primary" onClick={AIDialogOpen}>
          進入AI病情預測
        </Button>
        <AIDialog open={AIStatus} handleClose={handleCloseAll} />
      </DialogActions>
    </Dialog>
  );
};

export default PredictDialog;
