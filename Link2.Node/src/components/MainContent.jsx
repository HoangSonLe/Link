import React from "react";
import BaseConsumer from "BaseComponent/BaseConsumer";
import { I3Div, I3CustomTabs, Lab, Instrument, Lis } from "../importer";

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
    return (
      <I3Div margin={"md"}>
        <I3CustomTabs indicator={true} tabs={this._createTab()}></I3CustomTabs>
      </I3Div>
    );
  }
}
