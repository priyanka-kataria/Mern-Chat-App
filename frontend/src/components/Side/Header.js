import { useState, useEffect } from 'react';

const Header = ({ user, onSearchClick, onProfileClick, onLogout }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenWidth = () => {
            setIsMobile(window.innerWidth <= 768); // Define mobile breakpoint
        };
        
        checkScreenWidth();
        window.addEventListener('resize', checkScreenWidth);
        
        return () => window.removeEventListener('resize', checkScreenWidth);
    }, []);

    return (
        <div
        style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 20px',
            backgroundColor: 'white',
            borderBottom: '5px solid #38B2AC',
            flexDirection: 'row', // Always keep row layout
            gap: '10px', // Consistent gap for all screen sizes
            boxSizing: 'border-box', // Ensure consistent sizing
        }}
    >
        {/* Search Button */}
        <button
            onClick={onSearchClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                background: 'none',
                border: 'none',
                fontSize: '14px', // Consistent font size
                color: '#555',
                cursor: 'pointer',
                padding: '5px',
            }}
        >
            <i
                className="fa-solid fa-magnifying-glass"
                style={{
                    marginRight: '8px', // Keep margin for icon
                }}
            ></i>
            Search user
        </button>
    
        {/* Title */}
        <h2
            style={{
                fontSize: '24px', // Consistent font size
                fontFamily: 'Work sans',
                color: '#333',
                margin: 0,
            }}
        >
            Talk-A-Tive
        </h2>
    
        {/* Avatar and Logout */}
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px', // Consistent gap
            }}
        >
            {/* User Avatar */}
            <img
                src={user.pic}
                alt="Avatar"
                style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                }}
                onClick={onProfileClick}
            />
    
            {/* Logout Button */}
            <button
                onClick={onLogout}
                style={{
                    background: 'none',
                    border: 'none',
                    color: '#38B2AC',
                    fontSize: '14px', // Consistent font size
                    cursor: 'pointer',
                    padding: '5px',
                }}
            >
                Logout
            </button>
        </div>
    </div>
    
    );
};

export default Header;
