import { useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { Info } from "../../../types/Patient";
import "./Left.css";

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
              {readOnly ? (
                <FaPencil className="tableIcon" />
              ) : (
                <FaPencil className="tableIcon" />
              )}
            </button>
          </div>
        </div>
        <div className="inquiry-components-left-footer">
          <div className="inquiry-components-left-footer-basicdata">
            <div>
              姓名:
              <input
                type="text"
                className="textfield"
                name="patientName"
                onChange={changeInput}
                readOnly={readOnly}
                value={info.name}
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
                value={info.DOB}
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
                value={info.sex}
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
                value={currentAge}
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
                value={info.height}
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
                value={info.weight}
              ></input>
            </div>
            <div>
              狀態:
              <input
                type="text"
                className="textfield"
                name="state"
                onChange={changeInput}
                readOnly={readOnly}
                value={info.status}
              ></input>
            </div>
            <div>
              其他:
              <input
                type="text"
                className="textfield"
                name="other"
                onChange={changeInput}
                readOnly={readOnly}
                value={info.other}
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
                value={info.attackDate}
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
                value={info.beginSymptom}
              ></input>
            </div>
          </div>
          <div className="inquiry-inquiry-components-left-submit"></div>
        </div>
      </div>
    </div>
  );
};
export default Left;
