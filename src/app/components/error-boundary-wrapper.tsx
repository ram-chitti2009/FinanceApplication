'use client';

import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './error-fallback';

interface Props {
  children: React.ReactNode;
  type?: string;
}

export default function ErrorBoundaryWrapper({ children, type }: Props) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error) => {
        // You can log the error here or send it to an error reporting service
        console.error(`Error in ${type || 'component'}:`, error);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
