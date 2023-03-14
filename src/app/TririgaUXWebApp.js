import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createPortal } from "react-dom";
import { Route, Switch } from "react-router-dom";
import {HomePage } from "../pages";
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
