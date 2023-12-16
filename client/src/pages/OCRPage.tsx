import { Box } from "@mui/material";
import { useState } from "react";
import Button from "@mui/material/Button";

function OCRPage() {
  const [upload, setUpload] = useState<File>();
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files;
    if (files && files.length > 0) {
      // Assuming you only want to handle the first selected file
      const file = files[0];
      setUpload(file);
    }
  };
  const handleSubmit = () => {
    console.log({ upload });
  };

  const input = document.querySelector<HTMLInputElement>("input");
  const preview = document.querySelector<HTMLElement>(".preview");

  if (input) {
    input.addEventListener("change", updateImageDisplay);
  }

  function updateImageDisplay() {
    if (!input || !preview) {
      return;
    }

    while (preview.firstChild) {
      preview.removeChild(preview.firstChild);
    }

    const curFiles = input.files;
    if (!curFiles || curFiles.length === 0) {
      const para = document.createElement("p");
      para.textContent = "No files currently selected for upload";
      preview.appendChild(para);
    } else {
      const list = document.createElement("ol");
      preview.appendChild(list);

      for (const file of Array.from(curFiles)) {
        const listItem = document.createElement("li");
        const para = document.createElement("p");
        if (validFileType(file)) {
          para.textContent = `file size ${returnFileSize(file.size)}.`;
          const image = document.createElement("img");
          image.src = URL.createObjectURL(file);
          image.style.maxWidth = "15rem";
          image.style.maxHeight = "13rem";

          listItem.appendChild(image);
          listItem.appendChild(para);
        } else {
          para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
          listItem.appendChild(para);
        }

        list.appendChild(listItem);
      }
    }
  }

  const fileTypes: string[] = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/jpg",
  ];

  function validFileType(file: File): boolean {
    return fileTypes.includes(file.type);
  }

  function returnFileSize(number: number): string {
    if (number < 1024) {
      return number + " bytes";
    } else if (number > 1024 && number < 1048576) {
      return (number / 1024).toFixed(1) + " KB";
    } else if (number > 1048576) {
      return (number / 1048576).toFixed(1) + " MB";
    } else {
      return "";
    }
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "10rem" }}>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            width: "40rem",
            height: "25rem",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            borderRadius: "2.2rem",
            border: "0.15rem solid #F2F1EB",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "-4rem",
              marginLeft: "-2rem",
            }}
          >
            <label
              htmlFor="chooseImg"
              style={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#BDCDD6",
                borderRadius: "1rem",
                padding: "0.4rem",
                cursor: "pointer",
              }}
            >
              Choose image to upload
            </label>
            {upload ? upload.name : ""}
            <div className="preview">
              <p>No files currently selected for upload</p>
            </div>
            <input
              type="file"
              accept="image/*"
              id="chooseImg"
              name="chooseImg"
              onChange={handleChange}
              style={{ opacity: "0" }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              marginTop: "12rem",
              marginBottom: "-7rem",
            }}
          >
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                backgroundColor: "#6096B4",
                marginLeft: "-3rem",
                borderRadius: "1rem",
              }}
            >
              UPLOAD
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default OCRPage;
