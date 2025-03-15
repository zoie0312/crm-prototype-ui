import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useState, useEffect } from 'react';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { createEmotionCache } from '@/utils/createEmotionCache';

// Client-side cache, shared for the whole session of the user in the browser
const clientSideEmotionCache = createEmotionCache();

// Create a theme instance for our Bank CRM
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Bank blue
      light: '#4791db',
      dark: '#115293',
    },
    secondary: {
      main: '#388e3c', // Money green
      light: '#5eae60',
      dark: '#276128',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
        },
      },
    },
  },
});

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App({ Component, pageProps, emotionCache = clientSideEmotionCache }: MyAppProps) {
  const [mounted, setMounted] = useState(false);

  // Fix for hydration issues with MUI
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {mounted && <Component {...pageProps} />}
      </ThemeProvider>
    </CacheProvider>
  );
}
