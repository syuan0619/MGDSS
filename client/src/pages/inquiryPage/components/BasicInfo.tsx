import { useState } from "react";
import "../Visit.css";

//basic data component
function BasicInfo() {
  const [change, setChange] = useState({
    patientName: "",
    birth: "",
    sex: "",
    age: "",
    height: "",
    weight: "",
    state: "",
    other: "",
    onset: "",
    symptom: "",
  });

  const changeInput = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setChange({ ...change, [name]: value });
  };

  function onSubmitChange() {
    console.log([change, setChange]);
  }

  //switch readonly
  const [readOnly, setReadOnly] = useState(true);
  const switchReadOnly = () => {
    setReadOnly((prevReadOnly) => !prevReadOnly);
  };

  return (
    <>
      <div className="basicinfo">
        <div>
          姓名:
          <input
            type="text"
            className="textfield"
            name="patientName"
            onChange={changeInput}
            readOnly={readOnly}
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
          ></input>
        </div>
        <div></div>
      </div>
      <button
        className="button"
        onClick={() => {
          switchReadOnly();
          onSubmitChange();
        }}
      >
        {readOnly ? "編輯" : "完成"}
      </button>
    </>
  );
}

export default BasicInfo;
