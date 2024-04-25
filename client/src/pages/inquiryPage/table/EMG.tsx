import api from "../../../api";
import { useRef } from "react";
import "./EMG.css";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { noImageType } from "../../../types/Patient";
import typeChange from "../../../types/Change";

const TableEMG = ({
  setReplaceComponent,
  selectedDate,
  previewUrl,
  setPreviewUrl,
  recognizedResult,
  setRecognizedResult,
  modifiedResult,
  setModifiedResult,
  setResultHeader,
  setResultBody,
  getAllData,
  changeOrNot,
  setChangeOrNot,
}: {
  setReplaceComponent: (table: string) => void;
  selectedDate: string;
  previewUrl: string | undefined;
  setPreviewUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
  recognizedResult: string;
  setRecognizedResult: React.Dispatch<React.SetStateAction<string>>;
  modifiedResult: string;
  setModifiedResult: React.Dispatch<React.SetStateAction<string>>;
  setResultHeader: React.Dispatch<React.SetStateAction<noImageType>>;
  setResultBody: React.Dispatch<React.SetStateAction<Blob | undefined>>;
  getAllData: () => Promise<void>;
  changeOrNot: typeChange;
  setChangeOrNot: React.Dispatch<React.SetStateAction<typeChange>>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const fileSelectedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const formData = new FormData();
      const image = file;
      formData.append("file", image);
      getRecognized(formData).then((res) => {
        setResultBody(res.data);

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
            recognizedString += `\nPreActivation:\n\n         Amp\n1-5:  ${
              result.preActivation[0].split(" ")[0]
            }\n`;
            if (result.postActivation.length > 0) {
              recognizedString += `\nPostActivation:\n\n         Amp\n`;
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
  };

  const uploadHandler = () => {
    inputRef.current?.click();
  };

  const getRecognized = async (formData: FormData) => {
    return await api.post("/inquiry/recognize", formData, {
      responseType: "blob",
    });
  };

  const noSpaceNewLineResult: string[] = [];
  const handleModifiedResult = () => {
    const modified = modifiedResult;
    let word = "";
    for (let i = 0; i < modifiedResult.length; i++) {
      if (!(modified[i] == "\n" || modified[i] == "\r" || modified[i] == " ")) {
        word += modified[i];
      } else if (word.length > 0) {
        noSpaceNewLineResult.push(word);
        word = "";
      }
    }
  };

  const modifiedResultToEMG = () => {
    const sendResult: noImageType = {
      testDate: selectedDate,
      nasalis: {
        preActivation: 0,
        postActivation: [],
      },
      abd: {
        preActivation: 0,
        postActivation: [],
      },
      trapezius: {
        preActivation: 0,
        postActivation: [],
      },
    };

    noSpaceNewLineResult.map((eachWord, index) => {
      typeof eachWord === "string" ? toPureString(eachWord) : null;
      if (eachWord.toLowerCase() === "nasalis") {
        if (
          typeof noSpaceNewLineResult[index + 1] === "string" &&
          toPureString(noSpaceNewLineResult[index + 1])
            .toLowerCase()
            .includes("preactivation")
        ) {
          sendResult.nasalis.preActivation = toPureNumber(
            noSpaceNewLineResult[index + 4]
          );
        }
        if (
          typeof noSpaceNewLineResult[index + 5] === "string" &&
          toPureString(noSpaceNewLineResult[index + 5])
            .toLowerCase()
            .includes("postactivation")
        ) {
          sendResult.nasalis.postActivation.push(
            toPureNumber(noSpaceNewLineResult[index + 8])
          );
          sendResult.nasalis.postActivation.push(
            toPureNumber(noSpaceNewLineResult[index + 10])
          );
          sendResult.nasalis.postActivation.push(
            toPureNumber(noSpaceNewLineResult[index + 12])
          );
          sendResult.nasalis.postActivation.push(
            toPureNumber(noSpaceNewLineResult[index + 14])
          );
        }
      }
      if (eachWord.toLowerCase() === "abd") {
        if (
          typeof noSpaceNewLineResult[index + 1] === "string" &&
          toPureString(noSpaceNewLineResult[index + 1])
            .toLowerCase()
            .includes("preactivation")
        ) {
          sendResult.abd.preActivation = toPureNumber(
            noSpaceNewLineResult[index + 4]
          );
        }
        if (
          typeof noSpaceNewLineResult[index + 5] === "string" &&
          toPureString(noSpaceNewLineResult[index + 5])
            .toLowerCase()
            .includes("postactivation")
        ) {
          sendResult.abd.postActivation.push(
            toPureNumber(noSpaceNewLineResult[index + 8])
          );
          sendResult.abd.postActivation.push(
            toPureNumber(noSpaceNewLineResult[index + 10])
          );
          sendResult.abd.postActivation.push(
            toPureNumber(noSpaceNewLineResult[index + 12])
          );
          sendResult.abd.postActivation.push(
            toPureNumber(noSpaceNewLineResult[index + 14])
          );
        }
      }
      if (eachWord.toLowerCase() === "trapezius") {
        if (
          typeof noSpaceNewLineResult[index + 1] === "string" &&
          toPureString(noSpaceNewLineResult[index + 1])
            .toLowerCase()
            .includes("preactivation")
        ) {
          sendResult.trapezius.preActivation = toPureNumber(
            noSpaceNewLineResult[index + 4]
          );
        }
        if (
          typeof noSpaceNewLineResult[index + 5] === "string" &&
          toPureString(noSpaceNewLineResult[index + 5])
            .toLowerCase()
            .includes("postactivation")
        ) {
          sendResult.trapezius.postActivation.push(
            toPureNumber(noSpaceNewLineResult[index + 8])
          );
          sendResult.trapezius.postActivation.push(
            toPureNumber(noSpaceNewLineResult[index + 10])
          );
          sendResult.trapezius.postActivation.push(
            toPureNumber(noSpaceNewLineResult[index + 12])
          );
          sendResult.trapezius.postActivation.push(
            toPureNumber(noSpaceNewLineResult[index + 14])
          );
        }
      }
    });
    setResultHeader(sendResult);
  };

  const toPureNumber = (str: string | undefined): number => {
    if (str !== undefined) {
      let newStr = "";
      for (let i = 0; i < str.length; i++) {
        if (!(str[i] === "%")) {
          newStr += str[i];
        }
      }
      return Number(newStr);
    }
    return 0;
  };

  const toPureString = (str: string | undefined): string => {
    if (str !== undefined) {
      let newStr = "";
      for (let i = 0; i < str.length; i++) {
        if (!(str[i] === "%" || str[i] === ":")) {
          newStr += str[i];
        }
      }
      return newStr;
    }
    return "";
  };

  const sendResult = async () => {
    if (modifiedResult) {
      handleModifiedResult();
      modifiedResultToEMG();
      setReplaceComponent("right");
      setChangeOrNot({ ...changeOrNot, changeEMG: true });
      getAllData();
    } else {
      alert("請先上傳圖片");
    }
  };

  return (
    <div className="inquiry-table-EMG-all">
      <div className="inquiry-table-EMG-head-content">
        <div className="inquiry-table-EMG-head">
          <div className="inquiry-table-EMG-return">
            <button
              className="EMG-backToRight"
              onClick={() => {
                if (changeOrNot.changeEMG) {
                  setReplaceComponent("right");
                } else {
                  setPreviewUrl("");
                  setRecognizedResult("");
                  setModifiedResult("");
                  setReplaceComponent("right");
                }
              }}
            >
              <IoIosArrowDropleftCircle />
            </button>
          </div>
          <div className="inquiry-table-EMG-head-title">
            <p>電生理訊號</p>
          </div>
          <div className="inquiry-table-EMG-content-row-sum"></div>
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
                <img src={previewUrl} alt="Preview" onClick={uploadHandler} />
              ) : (
                <button onClick={uploadHandler}>檔案上傳/預覽</button>
              )}
            </div>
          </div>
          <div className="inquiry-table-EMG-content-right">
            <div className="inquiry-table-EMG-content-right-recognized-result">
              <h3 className="h3">辨識結果 : </h3>
              <textarea
                id="result"
                value={recognizedResult ? recognizedResult : ""}
                readOnly
              />
            </div>
            <div className="inquiry-table-EMG-content-right-modify">
              <h3 className="h3">手動修正 :</h3>
              <textarea
                id="modifyCon"
                value={modifiedResult ? modifiedResult : ""}
                onChange={(e) => {
                  setModifiedResult(e.target.value);
                }}
              />
            </div>
            <div className="inquiry-table-EMG-content-right-submit">
              <button
                id="submitButton"
                onClick={() => {
                  sendResult();
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

export default TableEMG;

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
