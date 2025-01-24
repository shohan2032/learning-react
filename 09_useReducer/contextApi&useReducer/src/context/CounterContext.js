import { createContext, useContext } from "react";

export const CounterContext = createContext({
    dispatch: () => {},
});
export const CounterContextProvider = CounterContext.Provider;
export default function useCounter() {
  return useContext(CounterContext);
}