import axios from "axios";
import {BASE_URL} from './constents/constents'

const instance = axios.create({
    baseURL: BASE_URL,
     
  });

  export default instance;