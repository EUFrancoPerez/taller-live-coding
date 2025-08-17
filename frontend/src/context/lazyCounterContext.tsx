import { lazy, Suspense } from 'react';
import { CounterProvider } from './counterContext';

// Lazy load the CounterProvider
const LazyCounterProvider = lazy(() =>
  Promise.resolve({
    default: CounterProvider,
  })
);

interface LazyCounterProviderWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const LazyCounterProviderWrapper = ({
  children,
  fallback = <div>Loading context...</div>,
}: LazyCounterProviderWrapperProps) => {
  return (
    <Suspense fallback={fallback}>
      <LazyCounterProvider>{children}</LazyCounterProvider>
    </Suspense>
  );
};

export default LazyCounterProviderWrapper;
