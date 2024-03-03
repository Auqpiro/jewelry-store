import axios from "axios";
import md5 from "md5";

const API_URL = import.meta.env.VITE_API_URL;

const currentDate = new Date();

const shiftHourFromRuCentralToUTC = Number(import.meta.env.VITE_SHIFT_FROM_UTC);
const currentUTCDate = currentDate.getUTCHours()
const shiftDate = currentUTCDate + shiftHourFromRuCentralToUTC >= 24 ? 1 : 0;
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
const authToken: string = md5(`Valantis_${timestamp}`)

const abortController = new AbortController();

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "X-Auth": authToken,
  },
  signal: abortController.signal,
});

export { abortController };

export default instance;
