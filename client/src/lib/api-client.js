import { HOST } from "@/utils/constants";
import axios from "axios";


export const axiosObj = axios.create({
    baseURL : HOST ,
    withCredentials : true
})