import { useContext, useCallback } from 'react';
import { CounterContext } from '@/context/counterContext';

const ContextTester = () => {
  const { count, setCount } = useContext(CounterContext);

  // Memoize the click handler
  const handleIncreaseCount = useCallback(() => {
    setCount(count + 1);
  }, [count, setCount]);

  return (
    <div>
      <div className="text-center mt-3">
        <h2 className="text-3xl">Context Tester Component</h2>
      </div>
      <div className="text-center">
        <h3 className="text-2xl">Count is: {count}</h3>
        <button
          onClick={handleIncreaseCount}
          style={{
            backgroundColor: 'pink',
            color: 'white',
            padding: '10px',
            borderRadius: '10px',
            marginBottom: '10px',
          }}
        >
          Increase Count
        </button>
      </div>
    </div>
  );
};

export default ContextTester;
