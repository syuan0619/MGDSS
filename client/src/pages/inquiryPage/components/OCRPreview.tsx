import { useState } from "react";
import "./OCRPreview.css";

function FileInputWithPreview({
    setUploadedFile,
    inputRef,
}: {
    setUploadedFile: React.Dispatch<React.SetStateAction<File | undefined>>;
    inputRef: React.RefObject<HTMLInputElement>;
}) {
    const [selectedFile, setSelectedFile] = useState<string>();
    const [previewUrl, setPreviewUrl] = useState<string>();

    const fileSelectedHandler = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setSelectedFile(file.name);
            setUploadedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    setPreviewUrl(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const buttonHandler = () => {
        inputRef.current?.click();
    };

    console.log("Selected File:", selectedFile);

    return (
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
    );
}

export default FileInputWithPreview;
