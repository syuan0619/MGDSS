import {
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableHead,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";

const VerifyListDialog = ({
  verifyListStatus,
  verifyListDialogHide,
  verifyList,
  setVerifyList,
  setIsVerifyListRevised,
  sendVerifyList,
}: {
  verifyListStatus: boolean;
  verifyListDialogHide: () => void;
  verifyList: string[];
  setVerifyList: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  setIsVerifyListRevised: React.Dispatch<React.SetStateAction<boolean>>;
  sendVerifyList: () => Promise<void>;
}) => {
  const [componentVerifyList, setComponentVerifyList] = useState<string[]>();
  const deleteVerifiedAccount = (item: string) => {
    const temp = verifyList.filter((e) => {
      return e !== item;
    });
    setComponentVerifyList(temp);
    setVerifyList(temp);
    setIsVerifyListRevised(true);
  };
  useEffect(() => {
    setComponentVerifyList(verifyList);
  }, []);

  return (
    <Dialog
      open={verifyListStatus}
      onClose={verifyListDialogHide}
      aria-labelledby="自動驗證帳號清單"
    >
      <DialogTitle>自動驗證帳號清單</DialogTitle>
      <DialogContent sx={{ width: "25rem" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ height: "4vh" }}>
              <TableCell align="center" sx={{ color: "#9E9FA5" }}>
                驗證碼
              </TableCell>
              <TableCell align="center" sx={{ color: "#9E9FA5" }}>
                刪除
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ cursor: "pointer" }}>
            {componentVerifyList &&
              componentVerifyList.map((item, index) => (
                <TableRow key={index} hover={true}>
                  <TableCell align="center" sx={{ fontSize: "2vh" }}>
                    {item}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => {
                        deleteVerifiedAccount(item);
                      }}
                    >
                      <DeleteIcon fontSize="large" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <IconButton
          aria-label="close"
          onClick={verifyListDialogHide}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Button variant="contained" color="primary" onClick={sendVerifyList}>
          修改
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VerifyListDialog;
