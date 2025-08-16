import { useEffect, useState } from 'react';
import { CounterProvider } from '@/context/counterContext';

import SignUp from './components/SignUp';
import ContextTester from './components/ContextTester';

import './App.css';

function App() {
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    fetch('/api/saludo')
      .then((res) => res.json())
      .then((data) => setMensaje(data.mensaje));
  }, []);

  return (
    <CounterProvider>
      <div className="app-container">
        <h1>Frontend funcionando 🚀</h1>
        <h2>{mensaje}</h2>
        <ContextTester />
        <SignUp />
      </div>
    </CounterProvider>
  );
}

export default App;
