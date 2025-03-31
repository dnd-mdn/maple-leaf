import Header from './components/Header.js';
import Container from 'react-bootstrap/Container';
import packageJson from '../package.json';

import Progress from './components/Progress.js';

function App() {
    
    return (
        <>
            <Header />
            <Container>
                <h1 className="h3 mt-3">Maple Leaf tools <small className="text-body-secondary fs-6">v{packageJson.version}</small></h1>
                <br />
               


                <Progress complete={1} active={1} remain={4} message="Loading..." />
            </Container>
        </>
    );
}

export default App;