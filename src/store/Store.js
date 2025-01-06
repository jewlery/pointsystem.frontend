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
    dashboardReducer: DashboardReducer
  },
});

export default store;
