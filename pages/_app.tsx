// App component - Root component cho Next.js application
import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header component */}
      <Header />
      
      {/* Main content */}
      <main className="flex-1">
        <Component {...pageProps} />
      </main>
      
      {/* Footer component */}
      <Footer />
    </div>
  );
}

