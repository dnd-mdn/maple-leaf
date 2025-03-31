import { useEffect } from 'react';
import useLocalStorageState from 'use-local-storage-state';

import Nav from 'react-bootstrap/Nav';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import { SunIcon, MoonIcon } from '@primer/octicons-react';

function ThemeSwitcher({ className, size = 22 }) {
    const preference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    const [theme, setTheme] = useLocalStorageState('theme', { defaultValue: preference });
    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

    useEffect(() => document.documentElement.setAttribute('data-bs-theme', theme), [theme]);

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