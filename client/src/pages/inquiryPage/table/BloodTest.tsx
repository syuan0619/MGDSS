import "./BloodTest.css";
import { useEffect, useState } from "react";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { BloodTest } from "../../../types/Patient";
import typeChange from "../../../types/Change";
import { useParams } from "react-router-dom";
import api from "../../../api";

const TableBloodTest = ({
  setReplaceComponent,
  selectedDate,
  bloodTestscore,
  setbloodTestscore,
  getAllData,
  changeOrNot,
  setChangeOrNot,
}: {
  setReplaceComponent: (table: string) => void;
  selectedDate: string;
  bloodTestscore: BloodTest;
  setbloodTestscore: React.Dispatch<React.SetStateAction<BloodTest>>;
  getAllData: () => Promise<void>;
  changeOrNot: typeChange;
  setChangeOrNot: React.Dispatch<React.SetStateAction<typeChange>>;
}) => {
  const defaultBloodTest: BloodTest = {
    testDate: selectedDate,
    ACHR: 0,
    TSH: 0,
    freeThyroxine: 0,
    ANA: 0,
    uricAcid: 0,
  };
  const [defaultRes, setDefaultRes] = useState<BloodTest>(defaultBloodTest);
  const routeParams = useParams();
  const getDefaultData = async () => {
    try {
      const response = await api.get(
        `/inquiry/${routeParams.id}/bloodTest/${selectedDate}`
      );
      setDefaultRes(response.data.table);
      setbloodTestscore(response.data.table);
    } catch {
      return;
    }
  };
  useEffect(() => {
    getDefaultData();
  }, [selectedDate]);

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

    const numericValue = value.trim() !== "" ? parseFloat(value) : 0;
    console.log(numericValue);
    console.log(typeof numericValue);
    if (numericValue !== 0 || value === ".") {
      if (numericValue > maxValues[name]) {
        setErrors({ ...errors, [name]: "" });
        setWarnings({
          ...warnings,
          [name]: `正常範圍到 ${maxValues[name]},請確認！`,
        });
      } else {
        setErrors({ ...errors, [name]: "" });
        setWarnings({ ...warnings, [name]: "" });
        setbloodTestscore({ ...bloodTestscore, [name]: numericValue });
      }
    } else {
      setWarnings({ ...warnings, [name]: "" });
      setErrors({ ...errors, [name]: "請輸入有效的數字！" });
      setbloodTestscore({ ...bloodTestscore, [name]: numericValue });
    }
  };

  const handleSubmit = async () => {
    if (
      bloodTestscore.ACHR === defaultBloodTest.ACHR &&
      bloodTestscore.ANA === defaultBloodTest.ANA &&
      bloodTestscore.TSH === defaultBloodTest.TSH &&
      bloodTestscore.freeThyroxine === defaultBloodTest.freeThyroxine &&
      bloodTestscore.uricAcid === defaultBloodTest.uricAcid
    ) {
      alert("請輸入有效欄位!");
    } else {
      console.log("bloodTestscore", bloodTestscore);
      setReplaceComponent("right");
      setChangeOrNot({ ...changeOrNot, changeBloodTest: true });
      getAllData();
    }
  };

  return (
    <div className="inquiry-table-BloodTest-all">
      <div className="inquiry-table-BloodTest-bg">
        <div className="inquiry-table-BloodTest-head">
          <div className="inquiry-table-BloodTest-return">
            <button
              className="BloodTest-backToRight"
              onClick={() => setReplaceComponent("right")}
            >
              <IoIosArrowDropleftCircle />
            </button>
          </div>
          <div className="inquiry-table-BloodTest-head-title">
            <p>BloodTest</p>
          </div>
          <div className="inquiry-table-BloodTest-content-row-sum"></div>
        </div>
        <div className="inquiry-table-BloodTest-content">
          <div className="inquiry-table-BloodTest-content-row">
            <div className="inquiry-table-BloodTest-content-row-ACHR">
              <div className="inquiry-table-BloodTest-content-row-ACHR-head">
                <label htmlFor="ACHR">ACHR</label>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  value={bloodTestscore.ACHR}
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
                {!bloodTestscore.ACHR && (
                  <div className="BloodTest-placeholder">(nmol/mL)</div>
                )}
              </div>
            </div>
            <div className="inquiry-table-BloodTest-content-row-freeThyroxine">
              <div className="inquiry-table-BloodTest-content-row-freeThyroxine-head">
                <label htmlFor="freeThyroxine">freeThyroxine</label>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  value={bloodTestscore.freeThyroxine}
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
                {!bloodTestscore.freeThyroxine && (
                  <div className="BloodTest-placeholder"> (ng/dL)</div>
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
                  value={bloodTestscore.TSH}
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
                {!bloodTestscore.TSH && (
                  <div className="BloodTest-placeholder"> (uIU/mL)</div>
                )}
              </div>
            </div>
            <div className="inquiry-table-BloodTest-content-row-uricAcid">
              <div className="inquiry-table-BloodTest-content-row-uricAcid-head">
                <label htmlFor="uricAcid">uricAcid</label>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  value={bloodTestscore.uricAcid}
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
                {!bloodTestscore.uricAcid && (
                  <div className="BloodTest-placeholder"> (mg/dL)</div>
                )}
              </div>
            </div>
          </div>
          <div className="inquiry-table-BloodTest-content-row">
            <div
              style={{
                width: "100%",
                display: " flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                marginLeft: "7%",
              }}
            >
              <div className="inquiry-table-BloodTest-content-row-ANA">
                <div className="inquiry-table-BloodTest-content-row-ANA-head">
                  <label htmlFor="ANA">ANA</label>
                </div>
                <div style={{ position: "relative" }}>
                  <input
                    value={bloodTestscore.ANA}
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
            </div>
          </div>
        </div>
        <div className="inquiry-table-BloodTest-submit">
          <button onClick={handleSubmit}>儲存</button>
        </div>
      </div>
    </div>
  );
};
export default TableBloodTest;
