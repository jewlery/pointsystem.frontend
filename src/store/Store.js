import { configureStore } from '@reduxjs/toolkit';
import CustomizerReducer from './customizer/CustomizerSlice';
import CreditReducer from "./apps/credit/creditSlice";
import ClientCreditReducer from "./apps/client-credit/clientCreditSlice";
import AchatReducer from "./apps/achat/achatSlice";
import BenifReducer from "./apps/benif/benifSlice";
import TpeReducer from "./apps/tpe/tpeSlice";
import LuiseReducer from "./apps/luise/luiseSlice";
import ClientReducer from "./apps/client/clientSlice";
import DashboardReducer from './apps/dashboard/dashboardSlice';
import UserReducer from './apps/users/userSlice'; // Import the userSlice
import CompanyReducer from './apps/company/companySlice'; // Import the companySlice
import EmployeeReducer from './apps/employee/employeeSlice'; // Import the employeeSlice
import WorkdayReducer from './apps/workday/workdaySlice'; // Import the workdaySlice
import AttendancesReducer from './apps/attendance/attendanceSlice'; // Import the attendancesSlice
import DeviceReducer from './apps/device/deviceSlice'; // Import the attendancesSlice
import RawAttendanceReducer from './apps/raw-attendance/rawAttendanceSlice'; // Import the attendancesSlice

export const store = configureStore({
  reducer: {
    customizer: CustomizerReducer,
    creditReducer: CreditReducer,
    clientCreditReducer: ClientCreditReducer,
    achatReducer: AchatReducer,
    benifReducer: BenifReducer,
    tpeReducer: TpeReducer,
    luiseReducer: LuiseReducer,
    clientReducer: ClientReducer,
    dashboardReducer: DashboardReducer,
    userReducer: UserReducer, // Add the userReducer
    companyReducer: CompanyReducer, // Add the companyReducer
    employeeReducer: EmployeeReducer, // Add the employeeReducer
    workdayReducer: WorkdayReducer, // Add the workdayReducer
    attendanceReducer: AttendancesReducer, // Add the attendancesReducer
    deviceReducer: DeviceReducer, // Add the attendancesReducer
    rawAttendance: RawAttendanceReducer, // Add the attendancesReducer
  },
});

export default store;
