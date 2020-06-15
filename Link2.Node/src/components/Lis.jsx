import React from "react";
import BaseConsumer from "BaseComponent/BaseConsumer";
import { withStyles } from "@material-ui/core";
import { I3Div, I3Icon } from "../importer";
import Item from "./Item";
import BaseRouteWrapper from "BaseComponent/BaseRouteWrapper";
import StateManager from "BaseComponent/base/StateManager";
import IconButtonGroup from "../base-components/IconButtonGroup";

class Lis extends BaseConsumer {
  componentDidMount() {
    this.ajaxGet({
      url: "/api/link/getlissystems",
      success: (ack) => {
        console.log(ack.data);
        this.updateObject(this.props, { lis: { lisList: ack.data } });
        // this.ajaxGet({
        //   url: "/api/link/GetDefaultLis",
        //   success: (ack) => {
        //     this.updateObject(this.props.lis, { newLis: ack.data });
        //   },
        // });
      },
    });
  }
  _renderImage = (e) => {
    return (
      <img src="http://link2.i3solution.net.au/dist/Contents/img/lis/lan-icon.png" />
    );
  }
  _renderRightHeader = () => {
    return <BaseCheckboxItem label={"dcjds"} checked={true} isMulti={true} />
  }
  _renderLeftFooter = () => {
    return (
      <I3Div className={classes.HeadStart + " " + classes.DetroyPaddingRight + " " + classes.DetroyPaddingLeft} >
        <I3Icon className="far fa-circle" fontSize="h1" color="lightGreen" />
        <span>Active</span>
      </I3Div>
    )
  }
  _renderRightFooter = (e) => {
    return (
      <IconButtonGroup
        components={[
          {
            className: "fas fa-cogs",
            onClick: () => (console.log(e))
          },
          {
            className: "fas fa-pen",
            onClick: () => (alert(e))
          },
          {
            className: "far fa-trash-alt",
            onClick: () => (alert(e))
          }
        ]}
      />
    )
  }
  consumerContent() {
    let { lis } = this.props;
    console.log("ca", lis);
    if (lis === null) {
      return null;
    }
    let res = lis.lisList.map((e) => {
      return <Item
        key={e.id}
        header={e.name}
        isActive={false}
        canDelete={e.canDelete}
        rightFooter={this._renderRightFooter(e)}
        image={this._renderImage(e)}
      ></Item>;
    });
    return <I3Div>{res}</I3Div>;
  }
}
const Styles = {};
export default withStyles(Styles)(Lis);
