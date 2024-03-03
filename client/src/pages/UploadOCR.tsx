import { Button, Grid, TextField } from "@mui/material";
import { ArrowBackRounded } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router-dom";
import "../style/UploadOCR.css";
import FileInputWithPreview from "../components/OCRPreview";

const VisitPage = () => {
  return (
    <>
      <div className="container">
        <div className="top">
          <div className="topcontext">
            <div className="topinnercontext">
              <div className="topinnercontextleft">
                <Link to="/patient">
                  <Button>
                    <ArrowBackRounded
                      sx={{
                        fontSize: "3rem",
                        color: "#0080FF",
                      }}
                    ></ArrowBackRounded>
                  </Button>
                </Link>
                <div className="numbox">001</div>
              </div>
              <div className="topinnercontextright">
                <button className="addNewScaleButton">新增量表</button>
                <button className="addRNSButton">新增電生理訊號量表</button>
                <button className="predictButton">病情預測</button>
                <button className="finishButton">結束看診</button>
              </div>
            </div>
          </div>
        </div>

        <div className="left">
          <div className="context">
            <div className="innercontext">
              <h3>病患資料</h3>

              <div className="basicdata">
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={6}>
                    姓名:
                  </Grid>
                  <Grid item xs={6}>
                    <TextField size="small" fullWidth />
                  </Grid>
                  <Grid item xs={6}>
                    生日:
                  </Grid>
                  <Grid item xs={6}>
                    <TextField size="small" fullWidth />
                  </Grid>
                  <Grid item xs={6}>
                    性別:
                  </Grid>
                  <Grid item xs={6}>
                    <TextField size="small" fullWidth />
                  </Grid>
                  <Grid item xs={6}>
                    年齡:
                  </Grid>
                  <Grid item xs={6}>
                    <TextField size="small" fullWidth />
                  </Grid>
                  <Grid item xs={6}>
                    身高:
                  </Grid>
                  <Grid item xs={6}>
                    <TextField size="small" fullWidth />
                  </Grid>
                  <Grid item xs={6}>
                    體重:
                  </Grid>
                  <Grid item xs={6}>
                    <TextField size="small" fullWidth />
                  </Grid>
                  <Grid item xs={6}>
                    狀態:
                  </Grid>
                  <Grid item xs={6}>
                    <TextField size="small" fullWidth />
                  </Grid>

                  <Grid item xs={6}>
                    其他:
                  </Grid>
                  <Grid item xs={6}>
                    <TextField size="small" fullWidth />
                  </Grid>
                  <Grid item xs={6}>
                    發病日期:
                  </Grid>
                  <Grid item xs={6}>
                    <TextField size="small" fullWidth />
                  </Grid>
                  <Grid item xs={6}>
                    初始症狀:
                  </Grid>
                  <Grid item xs={6}>
                    <TextField size="small" fullWidth />
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="rightBg">
            <div className="head">
              <p>電生理訊號</p>
            </div>
            <div className="recog">
              <div className="contextLeftBg">
                <div className="uploadArea">
                  <div className="title">
                    <label htmlFor="pic" id="pic">
                      檔案上傳/預覽
                    </label>
                    <AddCircleIcon
                      style={{
                        fill: "#89b9ad",
                        fontSize: "2rem",
                      }}
                    />
                  </div>
                  <FileInputWithPreview />
                </div>
              </div>
              <div className="contextRightBg">
                <h3 id="headResult">辨識結果 : </h3>
                <input type="text" id="result" readOnly />
              </div>
            </div>
            <div className="modify">
              <h3 id="headModify">手動修正 :</h3>
              <input type="text" id="modifyCon" />
            </div>
            <div className="forButton">
              <button id="submitButton">將結果加入病歷</button>
            </div>
          </div>
        </div>

        <div className="clearfix"></div>
      </div>
    </>
  );
};

export default VisitPage;
