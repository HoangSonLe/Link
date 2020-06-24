import React from "react";
import {
  BaseConsumer,
  I3Div,
  RowTextField,
  RowSwitch,
  I3Select,
  ShouldUpdateWrapper,
} from "../../importer";
import PropTypes from "prop-types";
export default class InstrumentDetail extends BaseConsumer {
  constructor(props) {
    super(props);
    this.state = {
      _optionsInstrumentType: [],
    };
  }
  //Lấy giá trì Options cho Instrument
  componentDidMount() {
    this.ajaxGet({
      url: "/api/link/GetOptionsForAnalyser",
      success: (ack) => {
        this.updateLocalObject(this.state._optionsInstrumentType, ack.data);
      },
      error: (ack) => {
        for (let i of ack.ErrorMessage) {
          this.error(i);
        }
      },
    });
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

  consumerContent() {
    let { instrument } = this.props;
    return (
      <I3Div margin="xs">
        <ShouldUpdateWrapper
          value={instrument.name ? instrument.name : ""}
          onChange={(text) => this._changeText(instrument, "name", text)}
        >
          <RowTextField title="Instrument name" />
        </ShouldUpdateWrapper>
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
        <ShouldUpdateWrapper
          value={instrument.serialNumber ? instrument.serialNumber : ""}
          onChange={(text) =>
            this._changeText(instrument, "serialNumber", text)
          }
        >
          <RowTextField title="Serial Number" />
        </ShouldUpdateWrapper>
        <I3Div margin={"md"}>
          <I3Div variant="h6" fontWeight="bold" margin="xs">
            Instrument type
          </I3Div>
          <ShouldUpdateWrapper
            options={this.state._optionsInstrumentType}
            onChange={(item) => {
              this.updateObject(this.props.instrument, {
                machineType: item.value,
              });
            }}
            value={this.state._optionsInstrumentType.find(
              (opt) => opt.value == this.props.instrument.machineType
            )}
          >
            <I3Select
              getOptionLabel={(opt) => {
                return opt.label;
              }}
              getOptionValue={(opt) => {
                return opt.value;
              }}
              placeholder="Select Type"
              color="lighterGray"
            />
          </ShouldUpdateWrapper>
        </I3Div>
        <ShouldUpdateWrapper
          value={instrument.tanFolder ? instrument.tanFolder : ""}
          onChange={(text) => this._changeText(instrument, "tanFolder", text)}
        >
          <RowTextField title="TAN folder" />
        </ShouldUpdateWrapper>
        <ShouldUpdateWrapper
          value={instrument.astmFolder ? instrument.astmFolder : ""}
          onChange={(text) => this._changeText(instrument, "astmFolder", text)}
        >
          <RowTextField title="ASTM folder" />
        </ShouldUpdateWrapper>
      </I3Div>
    );
  }
}
InstrumentDetail.protoTypes = {
  instrument: PropTypes.object.isRequired,
};
