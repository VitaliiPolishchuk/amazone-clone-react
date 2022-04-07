// import { useContext } from React
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import axios from "./axios";
import { useStateValue } from "./StateProvider";

const useAxios = () => {
  // const {authTokens, setUser, setAuthTokens} = useContext(AuthContext)
  const [{ authTokens }, dispatch] = useStateValue();

  const axiosInstance = axios.create({
    headers: { Authorization: `Bearer ${authTokens?.access}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwt_decode(authTokens.access);
    console.log("user", user);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    const response = await axios.post(`/token/refresh/`, {
      refresh: authTokens.refresh,
    });

    localStorage.setItem("authTokens", JSON.stringify(response.data));

    // setAuthTokens(response.data)
    dispatch({
      type: "SET_AUTH_TOKENS",
      tokens: response.data,
    });
    // setUser(jwt_decode(response.data.response))

    req.headers.Authorization = `Bearer ${response.data.access}`;

    return req;
  });

  return axiosInstance;
};

export default useAxios;
