import useAxios from 'axios-hooks';
import TimeAgo from 'timeago-react';
import { AlertIcon, ClockIcon, IssueClosedIcon } from '@primer/octicons-react';

function Status({ url }) {
  const [{ data, loading, error, response }, refetch] = useAxios(url);

  async function refresh() {
    try {
      await refetch();
    } catch (error) {
      console.error(error);
    }
  }

  console.log(response);

  if (loading) {
    return <div>
      {url}<br />
      <span className="text-info">
        <ClockIcon size={22} className="mr-2" /> 
        Loading...
      </span>
    </div>
  }

  if (error) {
    return <div>
      {url}<br />
      <span className="text-danger">
        <AlertIcon size={22} className="me-2" />
        {error.message}
      </span>

      <button onClick={refresh} className="btn btn-link">Refresh</button>
    </div>
  }

  return (
    <div>

      {url}<br />
      <span className="text-success">
        <IssueClosedIcon size={22} className="me-2" />
        Modified <TimeAgo datetime={new Date(data['jcr:lastModified'])} title={data['jcr:lastModified']} />
      </span>

      <button onClick={refetch} className="btn btn-link">Refresh</button>
    </div>
  )
}

export default Status;