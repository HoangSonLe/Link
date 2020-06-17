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
      {
        tabName: "Lis",
        tabContent: <Lis lis={this.props.routeData.lis}></Lis>,
      },
    ];
  };
  _handClick = () => {
    this.openModal(
      () => ({
        title: "Dị ứng",
        body: (
          <BaseModal
            leftFooter={
              <BaseButton variant="outlined" width="110px">
                Cancel
              </BaseButton>
            }
            rightFooter={<BaseButton width="110px">Save</BaseButton>}
          ></BaseModal>
        ),
      }),
      EModalType.Right,
      true
    );
  };
  consumerContent() {
    let { routeData } = this.props;
    return (
      <I3Div margin={"md"}>
        <I3CustomTabs indicator={true} tabs={this._createTab()}></I3CustomTabs>
        <BaseButton variant="outlined" margin={"sm"}>
          Cancle
        </BaseButton>
        <Button onClick={this._handClick}>Modal</Button>
      </I3Div>
    );
  }
}
const Styles = {};
export default withStyles(Styles)(MainContent);
