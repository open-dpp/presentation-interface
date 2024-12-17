import axios from "axios";
import {logout} from "./keycloak";
import {API_ROOT_URL} from "../const.ts";

const axiosIns = axios.create({
    baseURL: API_ROOT_URL,
});

axiosIns.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        // const authStore = useAuthStore();
        if (
            error.response &&
            error.response.status === 401 &&
            error.message === "Unauthorized"
        ) {
            logout();
        }
        return Promise.reject(error);
    }
);

export const setAxiosAuthHeader = (token: string) => {
    axiosIns.defaults.headers.common.Authorization = "Bearer " + token;
};

export default axiosIns;
