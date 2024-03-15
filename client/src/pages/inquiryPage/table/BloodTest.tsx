import "./BloodTest.css";
import { useState } from "react";
import { BloodTest as typeBloodTest } from "../../../types/Patient";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const BloodTest = ({
  setReplaceComponent,
}: {
  setReplaceComponent: (table: string) => void;
}) => {
  const [BloodTestScore, setBloodTestScore] = useState<typeBloodTest>({
    testDate: "",
    ACHR: 0,
    TSH: 0,
    freeThyroxine: 0,
    ANA: 0,
    uricAcid: 0,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({
    ACHR: "",
    TSH: "",
    freeThyroxine: "",
    ANA: "",
    uricAcid: "",
  });

  const [warnings, setWarnings] = useState<{ [key: string]: string }>({
    ACHR: "",
    TSH: "",
    freeThyroxine: "",
    ANA: "",
    uricAcid: "",
  });

  const maxValues: { [key: string]: number } = {
    ACHR: 1,
    TSH: 50,
    freeThyroxine: 10,
    ANA: 2560,
    uricAcid: 50,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "testDate") {
      console.log(value);
      setBloodTestScore({ ...BloodTestScore, [name]: value });
      return;
    }

    const numericValue = value.trim() !== "" ? parseFloat(value) : 0;
    if (!isNaN(numericValue) || value === "") {
      if (numericValue > maxValues[name]) {
        // 设置超过最大值的警告提示
        setWarnings({
          ...warnings,
          [name]: `正常範圍到 ${maxValues[name]},請確認！`,
        });
      } else {
        // 清除对应输入框的错误消息和警告提示
        setErrors({ ...errors, [name]: "" });
        // 清除警告提示
        setWarnings({ ...warnings, [name]: "" });
      }
      // 无论是否超过范围，都设置血液检测分数
      setBloodTestScore({ ...BloodTestScore, [name]: numericValue });
    } else {
      // 设置对应输入框的错误消息
      setErrors({ ...errors, [name]: "請輸入有效的數字！" });
    }
  };

  return (
    <div className="inquiry-table-BloodTest-all">
      <div className="inquiry-table-BloodTest-bg">
        <div className="inquiry-table-BloodTest-head">
          <button
            className="BloodTest-backToRight"
            onClick={() => setReplaceComponent("right")}
          >
            <IoIosArrowDropleftCircle />
          </button>
          <p>BloodTest</p>
        </div>
        <div className="inquiry-table-BloodTest-content">
          <div className="inquiry-table-BloodTest-content-row">
            <div className="inquiry-table-BloodTest-content-row-testdate">
              <label htmlFor="testDate">Test Date:</label>
              <input
                type="date"
                id="testDate"
                name="testDate"
                value={BloodTestScore.testDate}
                onChange={handleChange}
              />
            </div>
            <div className="inquiry-table-BloodTest-content-row-ACHR">
              <div className="inquiry-table-BloodTest-content-row-ACHR-head">
                <label htmlFor="ACHR">ACHR</label>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  defaultValue="0"
                  onChange={handleChange}
                  type="text"
                  id="ACHR"
                  name="ACHR"
                />
                {errors.ACHR && (
                  <div className="BloodTest-alert-input">{errors.ACHR}</div>
                )}
                <Stack>
                  {warnings.ACHR && (
                    <Alert severity="info">{warnings.ACHR}</Alert>
                  )}
                </Stack>
                {!BloodTestScore.ACHR && (
                  <div className="BloodTest-placeholder">(nmol/mL)</div>
                )}
              </div>
            </div>
          </div>
          <div className="inquiry-table-BloodTest-content-row">
            <div className="inquiry-table-BloodTest-content-row-TSH">
              <div className="inquiry-table-BloodTest-content-row-TSH-head">
                <label htmlFor="TSH">TSH</label>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  defaultValue="0"
                  onChange={handleChange}
                  type="text"
                  id="TSH"
                  name="TSH"
                />
                {errors.TSH && (
                  <div className="BloodTest-alert-input">{errors.TSH}</div>
                )}
                <Stack>
                  {warnings.TSH && (
                    <Alert severity="info">{warnings.TSH}</Alert>
                  )}
                </Stack>
                {!BloodTestScore.TSH && (
                  <div className="BloodTest-placeholder"> (uIU/mL)</div>
                )}
              </div>
            </div>
            <div className="inquiry-table-BloodTest-content-row-freeThyroxine">
              <div className="inquiry-table-BloodTest-content-row-freeThyroxine-head">
                <label htmlFor="freeThyroxine">freeThyroxine</label>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  defaultValue="0"
                  onChange={handleChange}
                  type="text"
                  id="freeThyroxine"
                  name="freeThyroxine"
                />
                {errors.freeThyroxine && (
                  <div className="BloodTest-alert-input">
                    {errors.freeThyroxine}
                  </div>
                )}
                <Stack>
                  {warnings.freeThyroxine && (
                    <Alert severity="info">{warnings.freeThyroxine}</Alert>
                  )}
                </Stack>
                {!BloodTestScore.freeThyroxine && (
                  <div className="BloodTest-placeholder"> (ng/dL)</div>
                )}
              </div>
            </div>
          </div>
          <div className="inquiry-table-BloodTest-content-row">
            <div className="inquiry-table-BloodTest-content-row-ANA">
              <div className="inquiry-table-BloodTest-content-row-ANA-head">
                <label htmlFor="ANA">ANA</label>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  defaultValue="0"
                  onChange={handleChange}
                  type="text"
                  id="ANA"
                  name="ANA"
                />
                {errors.ANA && (
                  <div className="BloodTest-alert-input">{errors.ANA}</div>
                )}
                <Stack>
                  {warnings.ANA && (
                    <Alert severity="info">{warnings.ANA}</Alert>
                  )}
                </Stack>
              </div>
            </div>
            <div className="inquiry-table-BloodTest-content-row-uricAcid">
              <div className="inquiry-table-BloodTest-content-row-uricAcid-head">
                <label htmlFor="uricAcid">uricAcid</label>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  defaultValue="0"
                  onChange={handleChange}
                  type="text"
                  id="uricAcid"
                  name="uricAcid"
                />
                {errors.uricAcid && (
                  <div className="BloodTest-alert-input">{errors.uricAcid}</div>
                )}
                <Stack>
                  {warnings.uricAcid && (
                    <Alert severity="info">{warnings.uricAcid}</Alert>
                  )}
                </Stack>
                {!BloodTestScore.uricAcid && (
                  <div className="BloodTest-placeholder"> (mg/dL)</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="inquiry-table-BloodTest-submit">
          <button
            onClick={() => {
              if (confirm("確定送出結果嗎?")) {
                console.log("送出結果：", BloodTestScore);
              }
              setReplaceComponent("right");
            }}
          >
            儲存
          </button>
        </div>
      </div>
    </div>
  );
};
export default BloodTest;
