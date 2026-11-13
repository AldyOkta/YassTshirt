import React from 'react';
import { RefreshCw, MessageCircle, AlertTriangle } from 'lucide-react';
import { openWhatsApp, WA_MESSAGES } from '@/lib/wa';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // In production, errors can be forwarded to monitoring
    // Silently handle error in client console
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-cream flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl border border-line shadow-card p-6 sm:p-8 text-center space-y-6">
            
            {/* Icon */}
            <div className="w-16 h-16 mx-auto rounded-full bg-navy/5 flex items-center justify-center text-navy">
              <AlertTriangle className="w-8 h-8 text-amber-500" />
            </div>

            {/* Title & Desc */}
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-black text-navy tracking-tight">
                Halaman Mengalami Kendala
              </h2>
              <p className="text-sm text-mute leading-relaxed">
                Terjadi kendala teknis saat memuat tampilan. Jangan khawatir, kami tetap melayani konsultasi dan pemesanan sablon kaos.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-navy hover:bg-navy-dark text-white text-sm font-bold shadow-sm transition-transform active:scale-95 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Muat Ulang Halaman</span>
              </button>

              <button
                type="button"
                onClick={() => openWhatsApp(WA_MESSAGES.general)}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-wa hover:bg-wa-hover text-white text-sm font-bold shadow-sm transition-transform active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Hubungi via WhatsApp</span>
              </button>
            </div>

          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
