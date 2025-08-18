import { createContext, useState, useCallback } from 'react';
import type { Dispatch, SetStateAction } from 'react';

const CounterContext = createContext({
  count: 0,
  setCount: (() => {}) as Dispatch<SetStateAction<number>>,
});

const CounterProvider = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);

  // Memoize the setCount function to prevent unnecessary re-renders
  const memoizedSetCount = useCallback((value: SetStateAction<number>) => {
    setCount(value);
  }, []);

  return (
    <CounterContext.Provider value={{ count, setCount: memoizedSetCount }}>
      {children}
    </CounterContext.Provider>
  );
};

export { CounterContext, CounterProvider };
