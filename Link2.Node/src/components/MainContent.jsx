import React from "react";
import BaseConsumer from "BaseComponent/BaseConsumer";
import {
  I3Div,
  I3CustomTabs,
  Lab,
  Instrument,
  Lis,
  I3Component,
} from "../importer";
import PropTypes from "prop-types";

export default class MainContent extends BaseConsumer {
  _createTab = () => {
    let { routeData } = this.props;
    return [
      {
        tabName: "Labs",
        tabContent: <Lab lab={routeData.lab}></Lab>,
      },
      // {
      //   tabName: "Instruments",
      //   tabContent: <Instrument instrument={routeData.instrument}></Instrument>,
      // },
      // {
      //   tabName: "Lis",
      //   tabContent: <Lis lis={routeData.lis}></Lis>,
      // },
    ];
  };

  consumerContent() {
    return (
      <I3Div margin={"md"}>
        <I3Component variant="h4" margin={["no", "no", "xs", "no"]}>
          Laboratory configuration
        </I3Component>
        <I3CustomTabs indicator={true} tabs={this._createTab()}></I3CustomTabs>
      </I3Div>
    );
  }
}
MainContent.propTypes = {
  routeData: PropTypes.object,
};
