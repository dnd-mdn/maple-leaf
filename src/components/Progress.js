
import { ProgressBar } from "react-bootstrap";

/**
 * 
 * @param {*} param0 
 */
const Progress = ({ complete, active, remain, message }) => {
    const total = complete + active + remain;
    
    complete = (complete / total) * 100;
    active = (active / total) * 100;
  
    return <>
        <ProgressBar>
            <ProgressBar variant="success" now={complete} key={1} />
            <ProgressBar variant="warning" now={active} key={2} />
        </ProgressBar>
        <p className="card-text">{message}</p>
    </>

}


export default Progress;