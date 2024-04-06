import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import EmailIcon from "@mui/icons-material/Email";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Account } from "../../types/Account";
import api from "../../api";

const AccountsPage = () => {
  const navigate = useNavigate();
  const userData = sessionStorage.getItem("userData");

  useEffect(() => {
    if (!userData) {
      alert("請先登入!");
      navigate("/");
    }
  });

  //登出
const onclickLogout = () => {
    const confirmLogout = window.confirm("確定要登出嗎?");
    if (confirmLogout) {
        alert("登出成功!");
        sessionStorage.removeItem("userData");
        console.log("userData", userData);
        navigate(`/`);
    }
};

  const [account, setAccount] = useState<Account[]>();
  const data = async () => {
    const response = await api.get("/account");
    setAccount(response.data);
  };

  useEffect(() => {
    data();
  }, []);

  //搜尋病患
  const [search, setSearch] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const SearchName = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(search);
  };

  //check
  const handleCheck = async (id: string) => {
    const confirm = window.confirm("確定要審核通過嗎?");
    if (confirm) {
      console.log("check id : " + id);
    }
  };

  //delete
  const handleDelete = async (id: string) => {
    const confirm = window.confirm("確定要刪除嗎?");
    if (confirm) {
      console.log("delete id : " + id);
    }
  };

  //email
  const [emailStatus, setEmailStatus] = useState<boolean>(false);
  const [email, setEmail] = useState<{
    email: string;
    subject: string;
    text: string;
  }>({
    email: "",
    subject: "",
    text: "",
  });
  const emailDialogOpen = () => {
    setEmailStatus(true);
  };
  const emailDialogHide = () => {
    setEmailStatus(false);
  };
  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
  };
  const waitingForEmailSending = async () => {
    console.log("waiting for email sending...");
  };
  const sendEmail = async () => {
    const confirm = window.confirm("確定要發送嗎?");
    if (confirm) {
      console.log(email);
      waitingForEmailSending();
      setEmail({
        email: "",
        subject: "",
        text: "",
      });
      setEmailStatus(false);
    }
  };

  //revise
  const [reviseStatus, setReviseStatus] = useState<boolean>(false);
  const [revise, setRevise] = useState<{
    id: string;
    data: {
      name: string;
      role: string;
      auth: string;
    };
  }>({
    id: "",
    data: {
      name: "",
      role: "",
      auth: "",
    },
  });
  const reviseDialogOpen = () => {
    setReviseStatus(true);
  };
  const reviseDialogHide = () => {
    setReviseStatus(false);
  };
  const changeRevise = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRevise({
      ...revise,
      data: { ...revise.data, [e.target.name]: e.target.value },
    });
  };
  const sendRevise = async () => {
    const confirm = window.confirm("確定要修改嗎?");
    if (confirm) {
      console.log(revise);
    }
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          display: "flex",
          justifyContent: "center",
          boxShadow: "0",
        }}
      >
        <Box sx={{ width: "90vw", height: "100vh", marginTop: "2vh" }}>
          <h1>Backstage Center</h1>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              marginBottom: "5vh",
            }}
          >
            <Paper
              component="form"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "13rem",
                height: "2.5rem",
                borderRadius: "0.7rem",
                "&:hover": {
                  backgroundColor: "#DDDDDD",
                },
                marginLeft: "2.5rem",
                marginTop: "-0.6rem",
                backgroundColor: "#F3F3F3",
                boxShadow: "0",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="搜尋病患"
                inputProps={{ "aria-label": "搜尋病患" }}
                value={search}
                onChange={handleSearch}
              />
              <IconButton
                type="submit"
                sx={{ p: "10px", cursor: "pointer" }}
                aria-label="search"
                onClick={SearchName}
                onSubmit={SearchName}
              >
                <SearchIcon />
              </IconButton>
              <Box>
                <ExitToAppIcon
                  fontSize="large"
                  aria-label="close"
                  onClick={onclickLogout}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                  }}
                ></ExitToAppIcon>
              </Box>
            </Paper>
          </Box>

          <Table aria-label="simple table">
            <TableHead>
              <TableRow sx={{ height: "5vh" }}>
                <TableCell align="center" sx={{ color: "#9E9FA5" }}>
                  姓名
                </TableCell>
                <TableCell align="center" sx={{ color: "#9E9FA5" }}>
                  帳號
                </TableCell>
                <TableCell align="center" sx={{ color: "#9E9FA5" }}>
                  身份驗證碼
                </TableCell>
                <TableCell align="center" sx={{ color: "#9E9FA5" }}>
                  帳號狀態
                </TableCell>
                <TableCell align="center" sx={{ color: "#9E9FA5" }}>
                  審核
                </TableCell>
                <TableCell align="center" sx={{ color: "#9E9FA5" }}>
                  發送電子郵件
                </TableCell>
                <TableCell align="center" sx={{ color: "#9E9FA5" }}>
                  修改
                </TableCell>
                <TableCell align="center" sx={{ color: "#9E9FA5" }}>
                  刪除
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ cursor: "pointer" }}>
              {account &&
                account.map((item, index) => (
                  <TableRow key={index} hover={true}>
                    <TableCell align="center" sx={{ fontSize: "2vh" }}>
                      {item.name}
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "2vh" }}>
                      {item.email}
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "2vh" }}>
                      {item.role}
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "2vh" }}>
                      {!item.isVerified ? "未驗證" : ""}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleCheck("account-id")}>
                        <DoneIcon fontSize="large" />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={emailDialogOpen}>
                        <EmailIcon fontSize="large" />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={reviseDialogOpen}>
                        <EditIcon fontSize="large" />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleDelete("account-id")}>
                        <DeleteIcon fontSize="large" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>

      {/* email dialog */}
      <Dialog
        open={emailStatus}
        onClose={emailDialogHide}
        aria-labelledby="發送電子郵件"
      >
        <DialogTitle>發送電子郵件</DialogTitle>
        <DialogContent sx={{ margingTop: "5vh" }}>
          <TextField
            label="收件者"
            variant="outlined"
            name="email"
            value={"email"}
            onChange={changeEmail}
          />
          <p />
          <TextField
            label="主旨"
            variant="outlined"
            name="subject"
            value={"subject"}
            onChange={changeEmail}
          />
          <p />
          <TextField
            label="內文"
            variant="outlined"
            name="text"
            value={"text"}
            onChange={changeEmail}
          />
          <p />
        </DialogContent>
        <DialogActions>
          <IconButton
            aria-label="close"
            onClick={emailDialogHide}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Button variant="contained" color="primary" onClick={sendEmail}>
            發送
          </Button>
        </DialogActions>
      </Dialog>

      {/* revise dialog */}
      <Dialog
        open={reviseStatus}
        onClose={reviseDialogHide}
        aria-labelledby="修改帳號內容"
      >
        <DialogTitle>修改帳號內容</DialogTitle>
        <DialogContent sx={{ margingTop: "5vh" }}>
          <TextField
            label="姓名"
            variant="outlined"
            name="name"
            value={revise.data.name}
            onChange={changeRevise}
          />
          <p />
          <TextField
            label="身份"
            variant="outlined"
            name="role"
            value={revise.data.role}
            onChange={changeRevise}
          />
          <p />
          <TextField
            label="身份驗證碼"
            variant="outlined"
            name="auth"
            value={revise.data.auth}
            onChange={changeRevise}
          />
          <p />
        </DialogContent>
        <DialogActions>
          <IconButton
            aria-label="close"
            onClick={reviseDialogHide}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Button variant="contained" color="primary" onClick={sendRevise}>
            發送
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AccountsPage;
