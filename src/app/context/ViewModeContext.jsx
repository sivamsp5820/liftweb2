import React, { createContext, useContext, useState } from 'react';

const ViewModeContext = createContext(undefined);

export const ViewModeProvider = ({ children }) => {
    const [viewMode, setViewModeState] = useState(() => {
        const saved = localStorage.getItem('wittur_view_mode');
        return saved || 'visual';
    });

    const setViewMode = (mode) => {
        setViewModeState(mode);
        localStorage.setItem('wittur_view_mode', mode);
    };

    return (
        <ViewModeContext.Provider value={{ viewMode, setViewMode }}>
            {children}
        </ViewModeContext.Provider>
    );
};

export const useViewMode = () => {
    const context = useContext(ViewModeContext);
    if (context === undefined) {
        throw new Error('useViewMode must be used within a ViewModeProvider');
    }
    return context;
};
