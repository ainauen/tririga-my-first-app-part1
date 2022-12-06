import React from "react";
import { Button } from "carbon-components-react";
import { TriLoginApi } from "@tririga/tririga-react-components";
import { ReactComponent as NotAuthorized } from "./icons/Not-authorized.svg";


const cssBase = "unauthorizedPage";

export default class UnauthorizedPage extends React.PureComponent {
  render() {
    return (
      <div className={cssBase}>
        <NotAuthorized />
        <div className={`${cssBase}__header`}>
      
        </div>
        <div className={`${cssBase}__description`}>

        </div>
        <Button
          className={`${cssBase}__login`}
          kind="primary"
          onClick={this.handleLoginClick}
        >

        </Button>
      </div>
    );
  }

  handleLoginClick = async () => {
    await TriLoginApi.logout();
    location.reload();
  };
}
