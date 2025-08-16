import { useEffect, useState } from 'react';
import { CounterProvider } from '@/context/counterContext';
import ContextTester from './components/ContextTester';

function App() {
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    fetch('/api/saludo')
      .then((res) => res.json())
      .then((data) => setMensaje(data.mensaje));
  }, []);

  return (
    <CounterProvider>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          border: '2px solid gray',
          borderRadius: '10px',
          padding: '10px',
        }}
      >
        <h1>Frontend funcionando 🚀</h1>
        <p>{mensaje}</p>
        <ContextTester />
      </div>
    </CounterProvider>
  );
}

export default App;
