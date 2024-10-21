// src/app/components/Popup.tsx
import React from 'react';

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ isOpen, children }) => {
    if (!isOpen) return null;

    return (
        <div style={overlayStyle as React.CSSProperties}>
            <div style={popupStyle}>
                {children}
            </div>
        </div>
    );
};

// Styles
const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const popupStyle = {
    background: 'white',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
};

export default Popup;
