import { createContext, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

const CounterContext = createContext({
  count: 0,
  setCount: (() => {}) as Dispatch<SetStateAction<number>>,
});

const CounterProvider = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);

  return (
    <CounterContext.Provider value={{ count, setCount }}>
      {children}
    </CounterContext.Provider>
  );
};

export { CounterContext, CounterProvider };
