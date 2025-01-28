
import Header from './Header.js';
import Container from 'react-bootstrap/Container';

import packageJson from '../package.json';
import Status from './Status.js';


function App() {
    return (
        <>
            <Header />
            <Container>
                <h1 className="h3 mt-3">Maple Leaf tools <small className="text-body-secondary fs-6">v{packageJson.version}</small></h1>
                <Status url="https://www.canada.ca/content/dam/dnd-mdn/documents/json/maple-en.json/_jcr_content.json" />
            </Container>
        </>
    );
}

export default App;
