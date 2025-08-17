import { Suspense, Component } from 'react';
import type { ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface LazyWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  errorFallback?: ReactNode;
}

// Error Boundary Component
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div
            style={{
              padding: '20px',
              textAlign: 'center',
              color: '#d32f2f',
              border: '1px solid #d32f2f',
              borderRadius: '8px',
              margin: '10px',
            }}
          >
            <h3>Something went wrong</h3>
            <p>Please try refreshing the page</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              style={{
                padding: '8px 16px',
                backgroundColor: '#d32f2f',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Try Again
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

// Default Loading Component
const DefaultLoadingSpinner = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px',
      fontSize: '16px',
      color: '#666',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      margin: '10px',
    }}
  >
    <div style={{ marginRight: '10px' }}>
      <div
        style={{
          width: '20px',
          height: '20px',
          border: '2px solid #ddd',
          borderTop: '2px solid #007bff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      ></div>
    </div>
    Loading...
  </div>
);

// LazyWrapper Component
export const LazyWrapper = ({
  children,
  fallback = <DefaultLoadingSpinner />,
  errorFallback,
}: LazyWrapperProps) => {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default LazyWrapper;
