import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  mode: ThemeMode;
  toggleColorMode: () => void;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleColorMode: () => {},
  setMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Initialize theme from localStorage or default to 'light'
  const [mode, setMode] = useState<ThemeMode>('light');

  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode') as ThemeMode | null;
    if (savedMode) {
      setMode(savedMode);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setMode('system');
    }
  }, []);

  // Update localStorage when mode changes
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  // Determine actual theme based on mode and system preference
  const getActualTheme = (): 'light' | 'dark' => {
    if (mode === 'system') {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return mode;
  };

  const actualTheme = getActualTheme();

  // Toggle between light and dark mode
  const toggleColorMode = () => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Create theme based on mode
  const theme = createTheme({
    palette: {
      mode: actualTheme,
      ...(actualTheme === 'light'
        ? {
            // Light mode palette
            primary: {
              main: '#0056b3',
            },
            secondary: {
              main: '#6c757d',
            },
            background: {
              default: '#f5f7fa',
              paper: '#ffffff',
            },
          }
        : {
            // Dark mode palette
            primary: {
              main: '#4d8fcc',
            },
            secondary: {
              main: '#8c959e',
            },
            background: {
              default: '#121212',
              paper: '#1e1e1e',
            },
            text: {
              primary: '#e0e0e0',
              secondary: '#aaaaaa',
            },
          }),
    },
  });

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode, setMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}; 