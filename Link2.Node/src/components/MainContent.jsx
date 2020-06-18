import React from "react";
import BaseConsumer from "BaseComponent/BaseConsumer";
import {
  I3Div,
  I3CustomTabs,
  Lab,
  Instrument,
  Lis,
  Button,
} from "../importer";
import { withStyles } from "@material-ui/core";
import { EModalType } from "../general/enum";
import BaseModal from "../base-components/BaseModal";
import BaseButton from "../base-components/BaseButton";

class MainContent extends BaseConsumer {
  _createTab = () => {
    return [
      {
        tabName: "Labs",
        tabContent: <Lab lab={this.props.routeData.lab}></Lab>,
      },
      {
        tabName: "Instruments",
        tabContent: <Instrument instrument={this.props.routeData.instrument}></Instrument>,
      },
      // {
      //   tabName: "Lis",
      //   tabContent: <Lis lis={this.props.routeData.lis}></Lis>,
      // },
    ];
  };

  consumerContent() {
    let { classes, routeData } = this.props;
    return (
      <I3Div margin={"md"}>
        <I3CustomTabs className={classes.Tab} indicator={true} tabs={this._createTab()}></I3CustomTabs>
      </I3Div>
    );
  }
}
const Styles = {
  DivTab: {
    "& .tabRootButton": {
      borderRight: "1px solid #eaebef",
      borderLeft: "1px solid #eaebef",
      background: "linear-gradient(to bottom, white 50%, #e0e0e0a3 95%)",
      "&:last-child": {
        borderRight: "none"
      }
    },
    "& .tabSelected": {
      background: "#fff",
      borderTop: "3px solid #004e87",
      borderRadius: " 6px 6px 0 0",
      color: "#004e87"
    }
  }
};
export default withStyles(Styles)(MainContent);
