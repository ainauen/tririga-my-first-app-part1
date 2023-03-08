import React from 'react'
import { useHistory } from "react-router-dom";
  
const HomePage =() => {
    const history = useHistory();
    const employees = () => {
        history.push("/employees");
    }
    return (
        <div>
            <div className="jumbotron text-center">
                <h1 className="display-4">Hello From Tririga!</h1>
                <p className="lead">
                    Geeks for Geeks is a Computer Science portal.  
                    It contains well written, well thought and well 
                    explained computer science and programming articles
                </p>
  
                <hr className="my-4" />
                <p>
                    Real-time Live and self paced courses carefully
                    curated for you !
                </p>
  
                <p className="lead">
                    <button className="btn btn-success"
                        onClick={employees}> See Employees
                    </button>
                </p>
  
            </div>
    </div>
    )
}
  
export default HomePage;