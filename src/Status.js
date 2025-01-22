
import { useState, useEffect } from 'react';

function Status({ url }) {

    const [requestState, setRequestState] = useState({
        data: [],
        loading: true,
        failed: false,
    });

    useEffect(() => {
        const retrieveArticles = async () => {
          try {
            console.log(url)
            const response = await fetch(url);
            const meta = await response.text()
            setRequestState((prevState) => ({
              ...prevState,
              data: meta,
            }));
          } catch (err) {
            setRequestState((prevState) => ({
              ...prevState,
              failed: true,
            }));
          } finally {
            setRequestState((prevState) => ({
              ...prevState,
              loading: false,
            }));
          }
        };
        retrieveArticles();
      }, [url]);

    return (
        <div>
          {requestState.loading ? (
            <p>Data is currently loading...</p>
          ) : requestState.failed ? (
            <p>There was an issue loading the articles.</p>
          ) : (
            <p>{requestState.data}</p>
          )}
        </div>
      );
}

export default Status;