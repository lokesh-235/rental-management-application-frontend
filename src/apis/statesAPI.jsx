import axios from "axios";

const API = axios.create({
    baseURL : 'https://gist.githubusercontent.com/anubhavshrimal/4aeb195a743d0cdd1c3806c9c222ed45/raw/181a34db4fcb8b37533b7c8b9c489b6c01573158/Indian_Cities_In_States_JSON'
})

export const getStates = () => API.get();