import Header from './components/Header.js';
import Container from 'react-bootstrap/Container';
import packageJson from '../package.json';

import React, { useRef } from 'react';
import Console from "./components/Console.js";
import Generator from './components/Generator.js';

function App() {
    const consoleRef = useRef();


    return (
        <>
            <Header />
            <Container>
                <h1 className="h3 mt-3">Maple Leaf tools <small className="text-body-secondary fs-6">v{packageJson.version}</small></h1>
                <br />

                <div>
                    <Console ref={consoleRef} />
                    <button onClick={() => consoleRef.current.log("Hello world!")}>Log</button>
                    <button onClick={() => consoleRef.current.warn("Careful!")}>Warn</button>
                    <button onClick={() => consoleRef.current.error("Oops!")}>Error</button>
                </div>

                <Generator />
            </Container>
        </>
    );
}

export default App;