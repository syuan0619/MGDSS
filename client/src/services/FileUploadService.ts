import api from "../api";

const upload = (file: File, onUploadProgress: any) => {
    const formData = new FormData();

    formData.append("file", file);

    return api.post("/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
    });
};

const getFiles = async () => {
    const files = await api.get("/files");
    return files;
};

const FileUploadService = {
    upload,
    getFiles,
};

export default FileUploadService;
