import { useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { Info } from "../../../types/Patient";
import "./Left.css";
import DoneIcon from "@mui/icons-material/Done";
const Left = ({ info }: { info: Info }) => {
  const [change, setChange] = useState<Info>(info);

  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setChange({ ...change, [name]: value });
  };

  const currentDate = new Date();
  const currentAge = currentDate.getFullYear() - parseInt(info.DOB.slice(0, 4));

  function onSubmitChange() {
    console.log(change);
  }

  //switch readonly
  const [readOnly, setReadOnly] = useState(true);
  const switchReadOnly = () => {
    setReadOnly((prevReadOnly) => !prevReadOnly);
  };

  return (
    <div className="inquiry-components-left-bg">
      <div className="inquiry-components-left">
        <div className="inquiry-components-left-header">
          <div className="inquiry-components-left-space"></div>
          <div className="inquiry-components-left-title">基本資料</div>
          <div className="inquiry-components-left-button">
            <button
              className="inquiry-components-edit-button"
              onClick={() => {
                switchReadOnly();
                onSubmitChange();
              }}
            >
              {readOnly ? <FaPencil className="tableIcon" /> : <DoneIcon />}
            </button>
          </div>
        </div>
        <div className="inquiry-components-left-footer">
          <div className="inquiry-components-left-footer-basicdata">
            <div className="inquiry-components-left-footer-basicdata-left">
              <div>姓名:</div>
              <div>生日:</div>
              <div>性別:</div>
              <div>年齡:</div>
              <div>身高:</div>
              <div>體重:</div>
              <div style={{ letterSpacing: "0.3rem" }}>其他就醫日期:</div>
              <div style={{ letterSpacing: "0.3rem" }}>其他就醫時數:</div>
              <div>其他疾病:</div>
              <div>發病日期:</div>
              <div>初始症狀:</div>
            </div>
            <div className="inquiry-components-left-footer-basicdata-right">
              <div>
                <input
                  type="text"
                  className="textfield"
                  name="patientName"
                  onChange={changeInput}
                  readOnly={readOnly}
                  defaultValue={info.name}
                ></input>
              </div>
              <div>
                <input
                  type="date"
                  className="textfield"
                  name="birth"
                  onChange={changeInput}
                  readOnly={readOnly}
                  defaultValue={info.DOB}
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  className="textfield"
                  name="sex"
                  onChange={changeInput}
                  readOnly={readOnly}
                  defaultValue={info.sex}
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  className="textfield"
                  name="age"
                  onChange={changeInput}
                  readOnly={readOnly}
                  defaultValue={currentAge}
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  className="textfield"
                  name="height"
                  onChange={changeInput}
                  readOnly={readOnly}
                  defaultValue={info.height}
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  className="textfield"
                  name="weight"
                  onChange={changeInput}
                  readOnly={readOnly}
                  defaultValue={info.weight}
                ></input>
              </div>
              <div>
                <input
                  type="date"
                  className="textfield"
                  name="other"
                  onChange={changeInput}
                  readOnly={readOnly}
                  defaultValue={info.otherHospitalRecord.recentlyDate}
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  className="textfield"
                  name="other"
                  onChange={changeInput}
                  readOnly={readOnly}
                  defaultValue={info.otherHospitalRecord.totalTimes}
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  className="textfield"
                  name="state"
                  onChange={changeInput}
                  readOnly={readOnly}
                  defaultValue={info.otherDisease}
                ></input>
              </div>
              <div>
                <input
                  type="date"
                  className="textfield"
                  name="onset"
                  onChange={changeInput}
                  readOnly={readOnly}
                  defaultValue={info.attackDate}
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  className="textfield"
                  name="symptom"
                  onChange={changeInput}
                  readOnly={readOnly}
                  defaultValue={info.beginSymptom}
                ></input>
              </div>
            </div>
            {/* <div>
              姓名:
              <input
                type="text"
                className="textfield"
                name="patientName"
                onChange={changeInput}
                readOnly={readOnly}
                defaultValue={info.name}
              ></input>
            </div>
            <div>
              生日:
              <input
                type="date"
                className="textfield"
                name="birth"
                onChange={changeInput}
                readOnly={readOnly}
                defaultValue={info.DOB}
              ></input>
            </div>
            <div>
              性別:
              <input
                type="text"
                className="textfield"
                name="sex"
                onChange={changeInput}
                readOnly={readOnly}
                defaultValue={info.sex}
              ></input>
            </div>
            <div>
              年齡:
              <input
                type="text"
                className="textfield"
                name="age"
                onChange={changeInput}
                readOnly={readOnly}
                defaultValue={currentAge}
              ></input>
            </div>
            <div>
              身高:
              <input
                type="text"
                className="textfield"
                name="height"
                onChange={changeInput}
                readOnly={readOnly}
                defaultValue={info.height}
              ></input>
            </div>
            <div>
              體重:
              <input
                type="text"
                className="textfield"
                name="weight"
                onChange={changeInput}
                readOnly={readOnly}
                defaultValue={info.weight}
              ></input>
            </div>
            <div>
              其他就醫日期:
              <input
                type="date"
                className="textfield"
                name="other"
                onChange={changeInput}
                readOnly={readOnly}
                defaultValue={info.otherHospitalRecord.recentlyDate}
              ></input>
            </div>
            <div>
              其他就醫時數:
              <input
                type="text"
                className="textfield"
                name="other"
                onChange={changeInput}
                readOnly={readOnly}
                defaultValue={info.otherHospitalRecord.totalTimes}
              ></input>
            </div>
            <div>
              其他疾病:
              <input
                type="text"
                className="textfield"
                name="state"
                onChange={changeInput}
                readOnly={readOnly}
                defaultValue={info.otherDisease}
              ></input>
            </div>
            <div>
              發病日期:
              <input
                type="date"
                className="textfield"
                name="onset"
                onChange={changeInput}
                readOnly={readOnly}
                defaultValue={info.attackDate}
              ></input>
            </div>
            <div>
              初始症狀:
              <input
                type="text"
                className="textfield"
                name="symptom"
                onChange={changeInput}
                readOnly={readOnly}
                defaultValue={info.beginSymptom}
              ></input>
            </div> */}
          </div>
          <div className="inquiry-inquiry-components-left-submit"></div>
        </div>
      </div>
    </div>
  );
};
export default Left;
