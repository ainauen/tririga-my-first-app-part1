import React from "react";
import { createPortal } from "react-dom";
import { Route, Switch } from "react-router-dom";
import {EmployeeePage, HomePage } from "../pages";
//import HomePage from "../pages/HomePage/HomePage";
import { Routes } from "../utils";

const cssBase = "tririgaUXWebApp";

export default class TririgaUXWebApp extends React.PureComponent {
  componentDidMount() {
    //MessageServices.addSubscriber(this.onMessageChange);
  }

  state = {
    message: null,
    loading: false,
  };

  render() {
    const { loading, message } = this.state;
    return (
      <div className={cssBase}>
        <Switch>
          <Route exact path={Routes.EMPLOYEES}>
            <EmployeeePage/>
          </Route>
          <Route exact path={Routes.HOME}>
            <HomePage/>
          </Route>
        </Switch>
      </div>
    );
  }

  onLoadingChange = (loading) => {
    this.setState({ loading });
  };

  onMessageChange = (message) => {
    this.setState({ message });
  };


}
