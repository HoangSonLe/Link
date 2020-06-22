import React from "react";
import {
  BaseConsumer,
  I3Div,
  RowTextField,
  RowSwitch,
  I3Select,
} from "../../importer";
import PropTypes from "prop-types";
export default class InstrumentDetail extends BaseConsumer {
  constructor(props) {
    super(props);
    this.state = {
      _optionsInstrumentType: [],
    };
  }
  //Bật tắt true / false theo key truyền vào
  _changeActive = (key) => {
    this.updateObject(this.props.instrument, {
      [key]: !this.props.instrument[key],
    });
  };
  //Hàm change text theo key
  _changeText = (item, key, value) => {
    this.updateObject(item, { [key]: value });
  };
  //Lấy giá trì Options cho Instrument
  componentDidMount() {
    this.ajaxGet({
      url: "/api/link/GetOptionsForAnalyser",
      success: (ack) => {
        this.updateLocalObject(this.state._optionsInstrumentType, ack.data);
      },
    });
  }
  consumerContent() {
    let { instrument } = this.props;
    return (
      <I3Div margin="xs">
        <RowTextField
          title="Instrument name"
          value={instrument.name ? instrument.name : ""}
          onChange={(text) => this._changeText(instrument, "name", text)}
        />
        <RowSwitch
          title={"Active"}
          isActive={instrument.isActive}
          onChange={() => this._changeActive("isActive")}
        />
        <RowSwitch
          title={"Auto Send to instrument"}
          isActive={instrument.autoSendToHost}
          onChange={() => this._changeActive("autoSendToHost")}
        />
        <RowTextField
          title="Serial Number"
          value={instrument.serialNumber ? instrument.serialNumber : ""}
          onChange={(text) =>
            this._changeText(instrument, "serialNumber", text)
          }
        />
        <I3Div margin={"md"}>
          <I3Div variant="h6" fontWeight="bold" margin="xs">
            Instrument type
          </I3Div>
          <I3Select
            onChange={(item) => {
              this.updateObject(this.props.instrument, {
                machineType: item.value,
              });
            }}
            value={this.state._optionsInstrumentType.find(
              (opt) => opt.value == this.props.instrument.machineType
            )}
            getOptionLabel={(opt) => {
              return opt.label;
            }}
            getOptionValue={(opt) => {
              return opt.value;
            }}
            placeholder="Select Type"
            options={this.state._optionsInstrumentType}
            color="lighterGray"
          />
        </I3Div>
        <RowTextField
          title="TAN folder"
          value={instrument.tanFolder ? instrument.tanFolder : ""}
          onChange={(text) => this._changeText(instrument, "tanFolder", text)}
        />
        <RowTextField
          title="ASTM folder"
          value={instrument.astmFolder ? instrument.astmFolder : ""}
          onChange={(text) => this._changeText(instrument, "astmFolder", text)}
        />
      </I3Div>
    );
  }
}
InstrumentDetail.protoTypes = {
  instrument: PropTypes.object.isRequired,
};
