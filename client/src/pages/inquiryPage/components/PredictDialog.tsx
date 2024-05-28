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
import { tablePatient } from "../../../types/Patient";

const PredictDialog = ({
  predictStatus,
  predictDialogHide,
  patients,
}: {
  predictStatus: boolean;
  predictDialogHide: () => void;
  patients: tablePatient | undefined;
}) => {
  const [AIStatus, setAIStatus] = useState(false);
  const AIDialogOpen = () => {
    setAIStatus(true);
  };
  const AIDialogHide = () => {
    setAIStatus(false);
  };
  const handleCloseAll = () => {
    predictDialogHide(); // Close PredictDialog
    AIDialogHide(); // Close AIDialog
  };

  return (
    patients && (
      <Dialog
        className="predictDialog"
        open={predictStatus}
        onClose={predictDialogHide}
      >
        <DialogTitle sx={{ fontSize: "1.5rem" }}>預測資料確認</DialogTitle>
        <DialogContent className="predictDialog-content">
          <ConfirmPanel patients={patients} />
        </DialogContent>
        <DialogActions>
          <IconButton
            className="deleteIcon-predict"
            aria-label="close"
            onClick={predictDialogHide}
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
          <AIDialog
            open={AIStatus}
            handleClose={handleCloseAll}
            patients={patients}
          />
        </DialogActions>
      </Dialog>
    )
  );
};

export default PredictDialog;
