


import Header from './Header.js';
import FeedGenerator from './FeedGenerator.js';
import Container from 'react-bootstrap/Container';

function App() {
    return (
        <>
            <Header />
            <Container>
                <h1 class="h3">Maple Leaf tools</h1>
                <FeedGenerator />
            </Container>
        </>
    );
}

export default App;
