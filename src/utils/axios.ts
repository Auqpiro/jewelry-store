import axios, { AxiosError } from "axios";
import md5 from "md5";

function getAuthToken() {
  const currentDate = new Date();
  const shiftHourFromRuCentralToUTC = Number(import.meta.env.VITE_SHIFT_FROM_UTC);
  const shiftDate = currentDate.getUTCHours() + shiftHourFromRuCentralToUTC >= 24 ? 1 : 0;
  const currentDay = `${currentDate.getUTCDate() + shiftDate}`.padStart(2, "0");
  const currentUTCYear = currentDate.getUTCFullYear();
  const isLeapYear = currentUTCYear % 4 === 0 && (currentUTCYear % 100 !== 0 || currentUTCYear % 400 === 0);
  const lastDateFeb = isLeapYear ? 29 : 28;
  const lastDateInMouthes = [31, lastDateFeb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const shiftMonth = currentDate.getUTCDate() === lastDateInMouthes[currentDate.getUTCMonth()] ? shiftDate : 0;
  const currentMonth = `${currentDate.getMonth() + 1 + shiftMonth}`.padStart(2, "0");
  const shiftYear = currentDate.getUTCMonth() === 11 && shiftMonth ? shiftMonth + 1 : shiftMonth;
  const currentYear = currentDate.getUTCFullYear() + shiftYear;
  const timestamp = `${currentYear}${currentMonth}${currentDay}`;
  const authToken: string = md5(`Valantis_${timestamp}`);
  return authToken;
}

const API_URL = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "X-Auth": getAuthToken(),
  },
});

instance.interceptors.request.use(
  (config) => config,
  (error: AxiosError) => {
    const { message, code, config } = error;
    console.error(`Error ${code}: ${message}`);
    if (!config) {
      return Promise.reject(error);
    }
    return instance(config);
  }
);

export default instance;
