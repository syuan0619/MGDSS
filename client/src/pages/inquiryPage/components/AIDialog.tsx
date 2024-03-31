import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
//import { IoReturnUpBack } from "react-icons/io5";
import "./AI.css";
import AICART from "./AICART";
import AISVM from "./AISVM";
import AIKNN from "./AIKNN";

interface AIDialogProps {
  open: boolean;
  handleClose: () => void;
}

const AIDialog: React.FC<AIDialogProps> = ({ open, handleClose }) => {
  return (
    <Dialog className="AIDialog" open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontSize: "1.5rem" }}>AI病情預測</DialogTitle>
      <DialogContent className="AIDialog-content">
        <AICART />
        <AISVM />
        <AIKNN />
      </DialogContent>
      <DialogActions>
        {/* <IconButton
          name="return"
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
          <IoReturnUpBack />
        </IconButton> */}
        <Button variant="contained" color="primary" onClick={handleClose}>
          關閉
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AIDialog;
