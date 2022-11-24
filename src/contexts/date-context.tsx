import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";

type DateContextValue = {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
};

const initialSettings = { date: new Date(), setDate: () => {} };

const DateContext = React.createContext<DateContextValue>(initialSettings);

export default DateContext;
export const DateConsumer = DateContext.Consumer;
//export const DateProvider = DateContext.Provider;

export const DateProvider = ({ children }: { children: ReactNode }) => {
  const [date, setDate] = useState(initialSettings.date);

  return <DateContext.Provider value={{ date: date, setDate }}>{children}</DateContext.Provider>;
};
