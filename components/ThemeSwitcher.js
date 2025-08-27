import { useEffect, useState } from 'react';
import useLocalStorageState from 'use-local-storage-state';

import Nav from 'react-bootstrap/Nav';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import { SunIcon, MoonIcon } from '@primer/octicons-react';

function ThemeSwitcher({ className, size = 22 }) {
    const [theme, setTheme] = useLocalStorageState('theme', null);

    useEffect(() => {
        if (!theme) {
            const preference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
            setTheme(preference);
        }

        document.documentElement.setAttribute('data-bs-theme', theme);
    }, [theme, setTheme]);

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    return (
        <OverlayTrigger placement="bottom" overlay={<Tooltip>Switch theme</Tooltip>}>
            <Nav.Link href="#" onClick={toggleTheme} className={className}>
                {theme === 'dark' ? (
                    <SunIcon size={size} className="text-light" />
                ) : (
                    <MoonIcon size={size} className="text-dark" />
                )}
            </Nav.Link>
        </OverlayTrigger>
    );
}

export default ThemeSwitcher;