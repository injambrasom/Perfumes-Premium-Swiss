import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught React Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-neutral-800 border border-neutral-700 rounded-xl p-6 shadow-2xl space-y-4">
            <h2 className="text-xl font-serif text-[#C5A059] font-bold">Erro de Carregamento</h2>
            <p className="text-sm text-neutral-300">
              Ocorreu um problema ao renderizar a página.
            </p>
            <pre className="text-xs bg-black/50 text-red-400 p-3 rounded text-left overflow-auto max-h-40">
              {this.state.error?.toString()}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-2 bg-[#C5A059] text-black font-semibold rounded hover:bg-[#b38f48] transition-colors"
            >
              Recarregar Aplicação
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
