import {createBrowserRouter,} from "react-router-dom";
import {ExchangePage, RootLayout, StakePage} from '../pages';
import {PATHS} from "./constants";

export const appRouter = createBrowserRouter([{
  path: PATHS.MAIN,
  element: <RootLayout/>,
  children: [{
    path: PATHS.EXCHANGE,
    element: <ExchangePage/>
  }, {
    path: PATHS.STAKE,
    element: <StakePage/>
  }]
}])
