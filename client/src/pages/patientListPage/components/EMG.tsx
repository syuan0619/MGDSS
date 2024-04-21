import api from "../../../api";
import { useEffect, useRef, useState } from "react";
import "../../inquiryPage/table/EMG.css";

const EMG = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [uploadedFile, setUploadedFile] = useState<File>();
  const [recognizedResult, setRecognizedResult] = useState<string>("");
  const [modifiedResult, setModifiedResult] = useState<string>("");
  console.log(modifiedResult);

  const fileSelectedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const buttonHandler = () => {
    inputRef.current?.click();
  };

  const getRecognized = async (formData: FormData) => {
    return await api.post("/inquiry/recognize", formData, {
      responseType: "blob",
    });
  };

  useEffect(() => {
    if (uploadedFile) {
      const formData = new FormData();
      const image = uploadedFile;
      formData.append("file", image);
      getRecognized(formData).then((res) => {
        const imageBlob = URL.createObjectURL(res.data);
        setPreviewUrl(imageBlob);

        const results = JSON.parse(res.headers.results) as [];
        let recognizedString = "";
        results.forEach(
          (result: {
            musclePart: string;
            preActivation: string[];
            postActivation: string[];
          }) => {
            recognizedString += `測試部位: ${result.musclePart}\n`;
            recognizedString += `\nPreActivation:\n\n       Amp\n1-5:  ${
              result.preActivation[0].split(" ")[0]
            }\n`;
            if (result.postActivation.length > 0) {
              recognizedString += `\nPostActivation:\n\n       Amp\n`;
              result.postActivation.forEach((postAct, idx) => {
                if (idx % 3 === 0) {
                  recognizedString += `1-5:  ${postAct.split(" ")[0]}\n`;
                }
              });
            } else {
              recognizedString += "\n";
            }
          }
        );
        setRecognizedResult(recognizedString);
        setModifiedResult(recognizedString);
      });
    }
  }, [uploadedFile]);

  return (
    <div className="inquiry-table-EMG-all">
      <div className="inquiry-table-EMG-head-content">
        <div className="inquiry-table-EMG-head">
          <div>
            <p>電生理訊號</p>
          </div>
          <div></div>
        </div>

        <div className="inquiry-table-EMG-content">
          <div className="inquiry-table-EMG-content-left">
            <div className="fileInput">
              <input
                type="file"
                accept="image/*"
                onChange={fileSelectedHandler}
                ref={inputRef}
              />
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" />
              ) : (
                <button onClick={buttonHandler}>檔案上傳/預覽</button>
              )}
            </div>
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
                defaultValue={modifiedResult ? modifiedResult : ""}
                onChange={(e) => {
                  setModifiedResult(e.target.value);
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

// 圖片上傳後預覽
// const reader = new FileReader();
// reader.readAsDataURL(file);
// reader.onloadend = () => {
//   if (typeof reader.result === "string") {
//     setPreviewUrl(reader.result);
//     setUploadedFile(file);
//   }
// };

// 圖片回傳1
// console.log(res.data);
// const binaryDataBuffer = res.data;
// const bufferArray = new Uint8Array(binaryDataBuffer).buffer;
// const blob = new Blob([bufferArray], {
//   type: "image/png",
// });
// const reader = new FileReader();
// reader.readAsDataURL(blob);
// reader.onload = () => {
//   console.log(reader.result);
// };
// reader.onerror = () => {
//   console.log(reader.error);
// };

// 圖片回傳2
// console.log(typeof res.data);
// const textEncoder = new TextEncoder();
// const uint8Array = textEncoder.encode(res.data);
// console.log(typeof uint8Array);
// const blob = new Blob([uint8Array]);
// console.log(blob);
// const imageBlob = URL.createObjectURL(blob);

// 舊版輸出
// recognizedString += `測試部位: ${result.musclePart}\n`;
// recognizedString += "測試結果(Amp, Area): \n";
// recognizedString += `\nPreActivation:\n`;
// result.preActivation.forEach((preAct, idx) => {
//   if (idx % 3 === 0) {
//     recognizedString += `1-5: ${preAct}\n`;
//   } else if (idx % 3 === 1) {
//     recognizedString += `#1: ${preAct}\n`;
//   } else if (idx % 3 === 2) {
//     recognizedString += `#5: ${preAct}\n\n`;
//   }
// });
// if (result.postActivation.length > 0) {
//   recognizedString += `\nPostActivation:\n`;
//   result.postActivation.forEach((postAct, idx) => {
//     if (idx % 3 === 0) {
//       recognizedString += `1-5: ${postAct}\n`;
//     } else if (idx % 3 === 1) {
//       recognizedString += `#1: ${postAct}\n`;
//     } else if (idx % 3 === 2) {
//       recognizedString += `#5: ${postAct}\n\n`;
//     }
//   });
// } else {
//   recognizedString += "\n";
// }

// setUploadedFile(res.data);
// setIsUploaded(true);
// console.log(res.data);
// const results = res.data as [];
// let recognizedString = "";
// results.forEach(
//   (result: { musclePart: string; preActivation: string[] }) => {
//     recognizedString += `測試部位: ${result.musclePart}\n`;
//     recognizedString += "測試結果(Amp, Area): \n";
//     recognizedString += `1~5: (${result.preActivation[0]})\n`;
//     recognizedString += `#1: (${result.preActivation[1]})\n`;
//     recognizedString += `#5: (${result.preActivation[2]})\n\n`;
//   }
// );
