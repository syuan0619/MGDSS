import "./OCRPreview.css";

function FileInputWithPreview({
  setUploadedFile,
  setPreviewUrl,
  previewUrl,
  inputRef,
}: {
  setUploadedFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  setPreviewUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
  previewUrl: string | undefined;
  inputRef: React.RefObject<HTMLInputElement>;
}) {
  const fileSelectedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      console.log(file.name);
      setUploadedFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          console.log(reader.result);
          setPreviewUrl(reader.result);
        }
      };
    }
  };

  const buttonHandler = () => {
    inputRef.current?.click();
  };

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
