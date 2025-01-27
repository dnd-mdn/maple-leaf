import React, { useState } from 'react';

import { DWANTester, GCNETTester } from './WebsiteChecker.js';

function FeedGenerator() {
    const [status, setStatus] = useState(['Waiting...', 0]);
    const [isLoading, setIsLoading] = useState(false);

    const performAsyncTask = async () => {
        setIsLoading(true);



        setIsLoading(false);
        
    };

    return (
        <>
            <DWANTester />
            <GCNETTester />
            
        </>
    );
}


export default FeedGenerator;