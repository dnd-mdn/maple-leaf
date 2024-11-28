import React, { useState } from 'react';

import * as ca from 'canada-api';

function FeedGenerator() {
    const [status, setStatus] = useState(['Waiting...', 0]);
    const [isLoading, setIsLoading] = useState(false);

    const performAsyncTask = async () => {
        setIsLoading(true);



        setIsLoading(false);
        
    };

    return (
        <>
            <progress value={status[1]}></progress>
            <button onClick={performAsyncTask} disabled={isLoading}>Start</button>
            <p className="text-muted">Check the console (F12) for detailed logs.</p>
        </>
    );
}


export default FeedGenerator;