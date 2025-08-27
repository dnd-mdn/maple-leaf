import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { MarkGithubIcon } from '@primer/octicons-react';

import ThemeSwitcher from './ThemeSwitcher.js';
import packageJson from '../package.json';

function Header() {
    return (
        <Navbar className="border-bottom">
            <Container>
                <Navbar.Brand href="https://github.com/dnd-mdn">dnd-mdn</Navbar.Brand>
                <Nav>
                    <OverlayTrigger placement="bottom" overlay={<Tooltip>View project on GitHub</Tooltip>}>
                        <Nav.Link href={packageJson.repository.url.replace('.git', '')} target="_blank">
                            <MarkGithubIcon size={22} />
                        </Nav.Link>
                    </OverlayTrigger>
                    <ThemeSwitcher size={22} />
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;