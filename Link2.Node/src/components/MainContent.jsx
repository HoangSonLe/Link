import React from "react";
import BaseConsumer from "BaseComponent/BaseConsumer";
import {
  I3Div,
  I3CustomTabs,
  Lab,
  Instrument,
  Lis,
} from "../importer";
// import { withStyles } from "@material-ui/core";

export default class MainContent extends BaseConsumer {
  _createTab = () => {
    let { routeData } = this.props;
    return [
      {
        tabName: "Labs",
        tabContent: <Lab lab={routeData.lab}></Lab>,
      },
      {
        tabName: "Instruments",
        tabContent: <Instrument instrument={routeData.instrument}></Instrument>,
      },
      {
        tabName: "Lis",
        tabContent: <Lis lis={routeData.lis}></Lis>,
      },
    ];
  };

  consumerContent() {
    let { classes } = this.props;
    return (
      <I3Div margin={"md"}>
        <I3CustomTabs indicator={true} tabs={this._createTab()}></I3CustomTabs>
      </I3Div>
    );
  }
}
// const Styles = {
//   DivTab: {
//     "& .tabRootButton": {
//       borderRight: "1px solid #eaebef",
//       borderLeft: "1px solid #eaebef",
//       background: "linear-gradient(to bottom, white 50%, #e0e0e0a3 95%)",
//       "&:last-child": {
//         borderRight: "none"
//       }
//     },
//     "& .tabSelected": {
//       background: "#fff",
//       borderTop: "3px solid #004e87",
//       borderRadius: " 6px 6px 0 0",
//       color: "#004e87"
//     }
//   }
// };

