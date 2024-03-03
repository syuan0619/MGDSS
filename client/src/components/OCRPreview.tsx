import { useState } from "react";

function FileInputWithPreview({
  setUploadedFile,
}: {
  setUploadedFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}) {
  const [selectedFile, setSelectedFile] = useState<string>();
  const [previewUrl, setPreviewUrl] = useState<string>();

  const fileSelectedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  console.log("Selected File:", selectedFile);

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={fileSelectedHandler}
        style={{ marginLeft: "5rem" }}
        id="fileInput"
      />
      {previewUrl && (
        <div>
          <img
            src={previewUrl}
            alt="Preview"
            style={{
              maxWidth: "18vw",
              maxHeight: "17vh",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default FileInputWithPreview;
