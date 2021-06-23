import axios from "axios";

class ExcelUploadService {
    upload(file, onUploadProgress) {
        let formData = new FormData();
    
        formData.append("file", file);
    
        return axios.post("http://localhost:8080/excel/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
          },
          onUploadProgress,
        });
      }
    
      // getFiles() {
      //   return http.get("/files");
      // }
}

export default new ExcelUploadService();