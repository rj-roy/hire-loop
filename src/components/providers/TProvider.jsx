'use client';

import { ThemeProvider } from "next-themes";

const TProvider = ({children}) => {
    return (
        <ThemeProvider
            attribute='class'
            defaultTheme="system"
            enableSystem
        >
            {children}
        </ThemeProvider>
    );
};

export default TProvider;