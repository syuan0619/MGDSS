import { Button, Grid, TextField } from "@mui/material";
import { ArrowBackRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./UploadOCR.css";
import FileInputWithPreview from "./OCRPreview";
import { useEffect, useState, useRef } from "react";
import api from "../../../api";

const UploadOCR = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploadedFile, setUploadedFile] = useState<File>();
    const [recognizedResult, setRecognizedResult] = useState<string>("");
    // const [modifiedResult, setModifiedResult] = useState<string>("");
    const getRecognized = async (formData: FormData) => {
        return await api.post("/recognize", formData);
    };
    useEffect(() => {
        if (uploadedFile) {
            const formData = new FormData();
            const image = uploadedFile;
            formData.append("file", image);
            getRecognized(formData).then((res) => {
                // console.log(res.data);
                const results = res.data as [];
                let recognizedString = "";
                results.forEach(
                    (result: {
                        musclePart: string;
                        preActivation: string[];
                    }) => {
                        recognizedString += `測試部位: ${result.musclePart}\n`;
                        recognizedString += "測試結果(Amp, Area): \n";
                        recognizedString += `1~5: (${result.preActivation[0]})\n`;
                        recognizedString += `#1: (${result.preActivation[1]})\n`;
                        recognizedString += `#5: (${result.preActivation[2]})\n\n`;
                    }
                );
                setRecognizedResult(recognizedString);
                // setModifiedResult(recognizedString);
            });
        }
    }, [uploadedFile]);

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
                                        />
                                    </Button>
                                </Link>
                                <div className="numbox">001</div>
                            </div>
                            <div className="topinnercontextright">
                                <button className="addNewScaleButton">
                                    新增量表
                                </button>
                                <button className="addRNSButton">
                                    新增電生理訊號量表
                                </button>
                                <button className="predictButton">
                                    病情預測
                                </button>
                                <button className="finishButton">
                                    結束看診
                                </button>
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

                        <div className="middle">
                            <div className="contextLeftBg">
                                <FileInputWithPreview
                                    setUploadedFile={setUploadedFile}
                                    inputRef={inputRef}
                                />
                            </div>
                            <div className="middle-right">
                                <div className="contextRightBg">
                                    <h3 className="h3">辨識結果 : </h3>
                                    <textarea
                                        id="result"
                                        defaultValue={
                                            recognizedResult
                                                ? recognizedResult
                                                : ""
                                        }
                                        readOnly
                                    />
                                </div>
                                <div className="modify">
                                    <h3 className="h3">手動修正 :</h3>
                                    <textarea
                                        id="modifyCon"
                                        defaultValue={
                                            recognizedResult
                                                ? recognizedResult
                                                : ""
                                        }
                                        onChange={(e) => {
                                            setRecognizedResult(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="submit">
                                    <button
                                        id="submitButton"
                                        onClick={() => {
                                            if (confirm("確定送出結果嗎?")) {
                                                console.log(
                                                    "送出結果：",
                                                    recognizedResult
                                                );
                                            }
                                        }}
                                    >
                                        將結果加入病歷
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UploadOCR;
