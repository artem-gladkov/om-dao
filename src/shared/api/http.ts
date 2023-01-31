import axios from "axios";
import { getEnvVariable } from "../config";

export const httpInstance = axios.create({ baseURL: getEnvVariable("REACT_APP_API_URL") });
