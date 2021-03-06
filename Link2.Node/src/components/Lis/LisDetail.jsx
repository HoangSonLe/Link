import React from "react";
import {
  BaseConsumer,
  I3Div,
  RowTextField,
  RowSwitch,
  I3Select,
  ShouldUpdateWrapper,
} from "../../importer";
import TypeComunationMode from "./TypeComunationMode";
import PropTypes from "prop-types";

export default class LisDetail extends BaseConsumer {
  constructor(props) {
    super(props);
    this.state = {
      optionsForLisEdit: {},
    };
  }
  componentDidMount() {
    let { optionsForLisEdit } = this.state;
    this.ajaxGet({
      url: "/api/link/GetOptionsForLisEdit",
      success: (ack) => {
        this.updateLocalObject(optionsForLisEdit, ack.data);
      },
      error: (ack) => {
        for (let i of ack.ErrorMessage) {
          this.error(i);
        }
      },
    });
  }
  _changeActive = (key) => {
    this.updateObject(this.props.lis, { [key]: !this.props.lis[key] });
  };
  _changeText = (item, key, value) => {
    this.updateObject(item, { [key]: value });
  };
  consumerContent() {
    let { lis } = this.props;
    let { optionsForLisEdit } = this.state;
    return (
      <I3Div margin="xs">
        <ShouldUpdateWrapper
          value={lis.name || ""}
          onChange={(text) => this._changeText(lis, "name", text)}
        >
          <RowTextField title="LIS name" />
        </ShouldUpdateWrapper>
        <RowSwitch
          title={"Active"}
          isActive={lis.isActive}
          onChange={() => this._changeActive("isActive")}
        />
        <RowSwitch
          title={"Send QC Result"}
          isActive={lis.sendQCResult}
          onChange={() => this._changeActive("sendQCResult")}
        />
        <RowSwitch
          title={"Auto Send to LIS"}
          isActive={lis.autoExport}
          onChange={() => this._changeActive("autoExport")}
        />
        {optionsForLisEdit.timeZones ? (
          <>
            <I3Div margin={"md"}>
              <I3Div variant="h6" fontWeight="bold" margin="xs">
                Timezone
              </I3Div>
              <ShouldUpdateWrapper
                options={optionsForLisEdit.timeZones}
                onChange={(item) => {
                  this.updateObject(this.props.lis, { timeZoneId: item.value });
                }}
                value={optionsForLisEdit.timeZones.find(
                  (opt) => opt.value == lis.timeZoneId
                )}
              >
                <I3Select
                  getOptionLabel={(opt) => {
                    return opt.label;
                  }}
                  getOptionValue={(opt) => {
                    return opt.value;
                  }}
                  placeholder="Select Timezone"
                  color="lighterGray"
                />
              </ShouldUpdateWrapper>
            </I3Div>
          </>
        ) : null}

        <TypeComunationMode data={optionsForLisEdit} lis={lis} />
      </I3Div>
    );
  }
}
LisDetail.protoTypes = {
  lis: PropTypes.object.isRequired,
};
