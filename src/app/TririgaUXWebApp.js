import React from "react";
import { createPortal } from "react-dom";
import { Route, Switch } from "react-router-dom";
import {EmployeeePage } from "../pages";
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
