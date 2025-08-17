import { useEffect, useState, lazy } from 'react';
import { CounterProvider } from '@/context/counterContext';
import LazyWrapper from './components/LazyWrapper';

// Lazy load components
const SignUp = lazy(() => import('./components/SignUp'));
const ContextTester = lazy(() => import('./components/ContextTester'));

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
        <LazyWrapper>
          <ContextTester />
        </LazyWrapper>
        <LazyWrapper>
          <SignUp />
        </LazyWrapper>
      </div>
    </CounterProvider>
  );
}

export default App;
