import api from "../../../api";
import FileInputWithPreview from "../components/OCRPreview";
import { useEffect, useRef, useState } from "react";
import "./EMG.css";

const EMG = ({
  setReplaceComponent,
}: {
  setReplaceComponent: (table: string) => void;
}) => {
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
          (result: { musclePart: string; preActivation: string[] }) => {
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
    <div className="inquiry-table-EMG-all">
      <div className="inquiry-table-EMG-head-content">
        <div className="inquiry-table-EMG-head">
          <p>電生理訊號</p>
        </div>

        <div className="inquiry-table-EMG-content">
          <div className="inquiry-table-EMG-content-left">
            <FileInputWithPreview
              setUploadedFile={setUploadedFile}
              inputRef={inputRef}
            />
          </div>
          <div className="inquiry-table-EMG-content-right">
            <div className="inquiry-table-EMG-content-right-recognized-result">
              <h3 className="h3">辨識結果 : </h3>
              <textarea
                id="result"
                defaultValue={recognizedResult ? recognizedResult : ""}
                readOnly
              />
            </div>
            <div className="inquiry-table-EMG-content-right-modify">
              <h3 className="h3">手動修正 :</h3>
              <textarea
                id="modifyCon"
                defaultValue={recognizedResult ? recognizedResult : ""}
                onChange={(e) => {
                  setRecognizedResult(e.target.value);
                }}
              />
            </div>
            <div className="inquiry-table-EMG-content-right-submit">
              <button
                id="submitButton"
                onClick={() => {
                  if (confirm("確定送出結果嗎?")) {
                    console.log("送出結果：", recognizedResult);
                  }
                  setReplaceComponent("right");
                }}
              >
                將結果加入病歷
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMG;