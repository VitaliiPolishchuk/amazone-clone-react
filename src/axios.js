import axios from "axios";
import env from "react-dotenv";

const instance = axios.create({
  baseURL: `${env.API_URL}/api`,
});

export default instance;
