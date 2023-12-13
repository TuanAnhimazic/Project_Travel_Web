
import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_URL_API,
    timeout: 50000,
});



  


instance.interceptors.response.use(
    (response) => {
      // Xử lý phản hồi trước khi nó được truyền vào mã gọi gốc
      return response;
    },
    (error) => {
      // Xử lý lỗi phản hồi
      return Promise.reject(error);
    }
  );
  


export default instance;