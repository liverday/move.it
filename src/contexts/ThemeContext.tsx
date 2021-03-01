import React, { createContext, useEffect, useCallback, useState, useContext } from 'react';

import Cookies from 'js-cookie';

import { Theme, themes } from '../styles/theme';

export type ThemeOptions = 'light' | 'dark';

interface ThemeContextData {
    theme: Theme;
    themeName: ThemeOptions;
    toggleTheme(): void;
}

const ThemeContext = createContext({} as ThemeContextData);

interface ThemeProviderProps {
    themeName: ThemeOptions;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, ...rest }) => {
    const [themeName, setThemeName] = useState<ThemeOptions>(rest.themeName || 'light');

    const toggleTheme = useCallback(() => {
        setThemeName(themeName === 'dark' ? 'light' : 'dark');
    }, [themeName]);

    const theme = themes[themeName];

    useEffect(() => {
        Object.keys(theme).forEach(key => {
            document.documentElement.style.setProperty(`--${key}`, theme[key]);
        })
        Cookies.set('theme', themeName);
    }, [themeName]);

    return (
        <ThemeContext.Provider value={{
            theme,
            themeName,
            toggleTheme  
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme(): ThemeContextData {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('should be used with ThemeProvider');
    }

    return context;
}