import React from 'react';
import { useAppDispatch } from '@/store/hooks';
import { useSelector } from 'react-redux';
import {
  increment,
  decrement,
  incrementByAmount,
  reset,
} from '@/store/slices/counterSlice';

import './index.css';

const Counter: React.FC = () => {
  const dispatch = useAppDispatch();
  const count = useSelector(
    (state: { counter: { value: number } }) => state.counter.value
  );

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleIncrementByAmount = (amount: number) => {
    dispatch(incrementByAmount(amount));
  };

  const handleReset = () => {
    dispatch(reset());
  };

  return (
    <div className="counter">
      <h2>Redux Counter Demo</h2>

      <div className="counter-display">
        <span className="counter-value">{count}</span>
      </div>

      <div className="counter-controls">
        <button onClick={handleDecrement} className="counter-btn decrement">
          -1
        </button>

        <button onClick={handleIncrement} className="counter-btn increment">
          +1
        </button>
      </div>

      <div className="counter-actions">
        <button
          onClick={() => handleIncrementByAmount(5)}
          className="counter-btn increment-amount"
        >
          +5
        </button>

        <button
          onClick={() => handleIncrementByAmount(10)}
          className="counter-btn increment-amount"
        >
          +10
        </button>

        <button onClick={handleReset} className="counter-btn reset">
          Reset
        </button>
      </div>

      <div className="counter-info">
        <p>This counter demonstrates Redux state management with:</p>
        <ul>
          <li>State updates with actions</li>
          <li>TypeScript integration</li>
          <li>Redux Toolkit usage</li>
          <li>Component state synchronization</li>
        </ul>
      </div>
    </div>
  );
};

export default Counter;
