


import Header from './Header.js';
import FeedGenerator from './FeedGenerator.js';
import Container from 'react-bootstrap/Container';

import packageJson from '../package.json';


function App() {
    return (
        <>
            <Header />
            <Container>
                <h1 class="h3 mt-3">Maple Leaf tools <small class="text-body-secondary fs-6">v{packageJson.version}</small></h1>
                <FeedGenerator />
            </Container>
        </>
    );
}

export default App;
