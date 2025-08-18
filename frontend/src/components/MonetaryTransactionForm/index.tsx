import { useState, useCallback } from 'react';

import './index.css';

export default function MonetaryTransactionForm() {
  const [form, setForm] = useState({
    amount: '',
    description: '',
  });

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(form);
    },
    [form]
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  return (
    <form onSubmit={onSubmit} className="monetary-transaction-form">
      <h2>Monetary Transaction Form</h2>
      <input
        id="amount"
        data-testid="amount"
        type="number"
        name="amount"
        placeholder="Amount"
        onChange={handleChange}
        required
      />
      <input
        id="description"
        data-testid="description"
        type="text"
        name="description"
        placeholder="Description"
        onChange={handleChange}
        required
      />
      <button
        style={{
          backgroundColor: 'blue',
          color: 'white',
          padding: '10px',
          borderRadius: '10px',
        }}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
