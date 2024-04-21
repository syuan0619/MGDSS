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
import { Account, returnAccount } from "../../types/Account";
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
      sessionStorage.removeItem("userData");
      console.log("userData", userData);
      navigate(`/`);
    }
  };

  const [account, setAccount] = useState<returnAccount[]>();
  const [fixedAccount, setFixedAccount] = useState<returnAccount[]>();
  const data = async () => {
    const response = await api.get("/account");
    setAccount(response.data);
    setFixedAccount(response.data);
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
    const searchedAccount: returnAccount[] = [];
    fixedAccount?.forEach((eachAccount) => {
      if (
        eachAccount.authCode.includes(search) ||
        eachAccount.email.includes(search) ||
        eachAccount.name.includes(search)
      ) {
        searchedAccount.push(eachAccount);
      } else if (search === "審" || search === "核" || search === "審核") {
        searchedAccount.push(eachAccount);
      } else if (
        eachAccount.isVerified &&
        (search.includes("通") ||
          search.includes("過") ||
          search.includes("審核通") ||
          search.includes("審核通過"))
      ) {
        searchedAccount.push(eachAccount);
      } else if (
        !eachAccount.isVerified &&
        (search.includes("等") ||
          search.includes("待") ||
          search.includes("等待審") ||
          search.includes("等待審核"))
      ) {
        searchedAccount.push(eachAccount);
      }
    });
    setAccount(searchedAccount);
  };

  //check
  const handleCheck = async (item: returnAccount) => {
    const checkAccount: Account = {
      name: item.name,
      email: item.email,
      password: item.password,
      role: item.role,
      authCode: item.authCode,
      isVerified: !item.isVerified,
    };
    const confirm = window.confirm("確定要審核通過嗎?");
    if (confirm) {
      await api.put(`/account/${item._id}`, checkAccount).then((res) => {
        console.log(res.data);
        data();
      });
    }
  };

  //delete
  const handleDelete = async (id: string) => {
    const confirm = window.confirm("確定要刪除嗎?");
    if (confirm) {
      await api.delete(`/account/${id}`).then((res) => {
        console.log(res.data);
        data();
      });
    }
  };

  //revise
  const [reviseStatus, setReviseStatus] = useState<boolean>(false);
  const [revise, setRevise] = useState<{
    id: string;
    account: Account;
  }>({
    id: "",
    account: {
      name: "",
      email: "",
      password: "",
      role: "doctor",
      authCode: "",
      isVerified: false,
    },
  });
  const reviseDialogOpen = (item: returnAccount) => {
    setReviseStatus(true);
    setRevise({
      id: item._id,
      account: {
        name: item.name,
        email: item.email,
        password: item.password,
        role: item.role,
        authCode: item.authCode,
        isVerified: item.isVerified,
      },
    });
  };
  const reviseDialogHide = () => {
    setReviseStatus(false);
    setRevise({
      id: "",
      account: {
        name: "",
        email: "",
        password: "",
        role: "doctor",
        authCode: "",
        isVerified: false,
      },
    });
  };
  const changeRevise = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRevise({
      ...revise,
      account: { ...revise.account, [e.target.name]: e.target.value },
    });
  };
  const sendRevise = async () => {
    if (revise.account.role != "doctor" && revise.account.role != "nurse") {
      console.log("revise.account.role != ");
    } else {
      const confirm = window.confirm("確定要修改嗎?");
      if (confirm) {
        await api.put(`/account/${revise.id}`, revise.account).then((res) => {
          console.log(res.data);
          data();
          reviseDialogHide();
        });
      }
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
                      {item.authCode}
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "2vh" }}>
                      {!item.isVerified ? "等待審核" : "審核通過"}
                    </TableCell>
                    <TableCell align="center">
                      {!item.isVerified ? (
                        <IconButton onClick={() => handleCheck(item)}>
                          <DoneIcon fontSize="large" />
                        </IconButton>
                      ) : (
                        ""
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={emailDialogOpen}>
                        <EmailIcon fontSize="large" />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => reviseDialogOpen(item)}>
                        <EditIcon fontSize="large" />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleDelete(item._id)}>
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
            label="電子郵件"
            variant="outlined"
            name="email"
            value={revise.account.email}
            onChange={changeRevise}
          />
          <p />
          <TextField
            label="姓名"
            variant="outlined"
            name="name"
            value={revise.account.name}
            onChange={changeRevise}
          />
          <p />
          <TextField
            label="密碼"
            variant="outlined"
            name="password"
            value={revise.account.password}
            onChange={changeRevise}
          />
          <p />
          <TextField
            label="身份"
            variant="outlined"
            name="role"
            value={revise.account.role}
            onChange={changeRevise}
          />
          <p />
          <TextField
            label="身份驗證碼"
            variant="outlined"
            name="auth"
            value={revise.account.authCode}
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
