import axios from "axios";
import md5 from "md5";

const API_URL = import.meta.env.VITE_API_URL;

console.log(API_URL);

const currentDate = new Date();
const shiftHourFromRuCentralToUTC = 3;
const shiftDayFromCurrentToRuCentral = Math.floor((currentDate.getUTCHours() + shiftHourFromRuCentralToUTC) / 24);
const currentYear = currentDate.getFullYear();
const currentMonth = `${currentDate.getMonth() + 1}`.padStart(2, "0");
const currentDay = `${currentDate.getDate() + shiftDayFromCurrentToRuCentral}`.padStart(2, "0");
const timestamp = `${currentYear}${currentMonth}${currentDay}`;

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "X-Auth": `${md5(`Valantis_${timestamp}`)}`,
  },
});

export default instance;
