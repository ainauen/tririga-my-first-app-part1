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
                    React tutorial, brought to you by SERCO to teach you how to build a React App and have it run on the Tririga Server!
                </p>
  
                <hr className="my-4" />
                <p className="mr-2 ml-2 p-3">
                    Real-time Live and self paced courses, designed for anyone to learn!
                </p>
  
                {/* <p className="lead">
                    <button className="btn btn-secondary m-3"
                        onClick={employees}> See Employees
                    </button>
                </p> */}
  
            </div>
    </div>
    )
}
  
export default HomePage;