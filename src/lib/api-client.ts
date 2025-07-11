import { OpenDppClient } from "@open-dpp/api-client";
import { API_ROOT_URL } from "../const";

const apiClient = new OpenDppClient({
  baseURL: API_ROOT_URL,
});

export default apiClient;
