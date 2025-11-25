import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '80vh',
                    backgroundColor: '#f0f2f5',
                    fontFamily: 'Inter, sans-serif'
                }}>
                    <div style={{
                        backgroundColor: '#ffffff',
                        padding: '40px',
                        borderRadius: '20px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                        textAlign: 'center',
                        maxWidth: '400px'
                    }}>
                        <h2 style={{ color: '#e03131', marginBottom: '20px' }}>
                            Something went wrong
                        </h2>
                        <p style={{ color: '#666', marginBottom: '20px' }}>
                            The calculator encountered an error. Please refresh the page to try again.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            style={{
                                backgroundColor: '#1971c2',
                                color: 'white',
                                border: 'none',
                                padding: '12px 24px',
                                borderRadius: '8px',
                                fontSize: '16px',
                                cursor: 'pointer',
                                fontWeight: '600'
                            }}
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
