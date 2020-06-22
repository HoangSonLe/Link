import React, { Fragment } from "react";
import BaseConsumer from "BaseComponent/BaseConsumer";
import { withStyles } from "@material-ui/core";
import { RowTextField, RowSwitch, I3Div, I3Select } from "../../importer";
import PropTypes from "prop-types";
import { LisCommunicationMode } from "../../general/enum";

class TypeComunationMode extends BaseConsumer {
  constructor(props) {
    super(props);
  }
  _changeText = (item, key, value) => {
    this.updateObject(item, { [key]: value });
  };
  _renderTCPChannel = () => {
    let { lis, classes } = this.props;
    return (
      <Fragment>
        <RowTextField
          title="TCP/IP Address"
          value={lis.tcpChannel.ip ? lis.tcpChannel.ip : ""}
          onChange={(text) =>
            this._changeText(lis.tcpChannel, "rootFoldiper", text)
          }
        />
        <RowTextField
          title="TCP/IP Port"
          value={lis.tcpChannel.port ? lis.tcpChannel.port : ""}
          onChange={(text) => this._changeText(lis.tcpChannel, "port", text)}
        />
        <RowTextField
          title="Time out (second)"
          className={classes.inputText}
          value={lis.tcpChannel.timeOut ? lis.tcpChannel.timeOut : 10}
          type="number"
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline,
            },
          }}
          onChange={(text) => this._changeText(lis.tcpChannel, "timeOut", text)}
        />
      </Fragment>
    );
  };

  //Serial Channel
  _changeActiveSerialChannel = (key) => {
    this.updateObject(this.props.lis.serialChannel, {
      [key]: !this.props.lis.serialChannel[key],
    });
  };
  _renderSerialChannel = () => {
    let { data, lis, classes } = this.props;
    console.log("serial", data);
    return (
      <Fragment>
        <RowTextField
          title="Port name (eg. COM1)"
          value={lis.serialChannel.portName ? lis.serialChannel.portName : ""}
          onChange={(text) =>
            this._changeText(lis.serialChannel, "portName", text)
          }
        />
        <RowSwitch
          title="DTSDSR"
          isActive={lis.serialChannel.dtsdsr ? lis.serialChannel.dtsdsr : false}
          onChange={() => this._changeActiveSerialChannel("dtsdsr")}
        />
        <RowSwitch
          title="RTSCTS"
          isActive={lis.serialChannel.rtscts ? lis.serialChannel.rtscts : false}
          onChange={() => this._changeActiveSerialChannel("rtscts")}
        />
        <RowTextField
          title="Time out (second)"
          className={classes.inputText}
          value={lis.serialChannel.timeOut ? lis.serialChannel.timeOut : 0}
          type="number"
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline,
            },
          }}
          onChange={(text) =>
            this._changeText(lis.serialChannel, "timeOut", text)
          }
        />
        <I3Div margin={"md"}>
          <I3Div variant="h6" fontWeight="bold" margin="xs">
            Baud rate
          </I3Div>
          <I3Select
            onChange={(item) =>
              this.updateObject(lis.serialChannel, {
                baudRate: item.value,
              })
            }
            value={data.baudRate.find(
              (opt) => opt.value == lis.serialChannel.baudRate
            )}
            getOptionLabel={(opt) => {
              return opt.label;
            }}
            getOptionValue={(opt) => {
              return opt.value;
            }}
            placeholder="Select BaudRate"
            options={data.baudRate}
            color="lighterGray"
          />
        </I3Div>
        <I3Div margin={"md"}>
          <I3Div variant="h6" fontWeight="bold" margin="xs">
            Handshake
          </I3Div>
          <I3Select
            onChange={(item) =>
              this.updateObject(lis.serialChannel, {
                handshake: item.value,
              })
            }
            value={data.handshake.find(
              (opt) => opt.value == lis.serialChannel.handshake
            )}
            getOptionLabel={(opt) => {
              return opt.label;
            }}
            getOptionValue={(opt) => {
              return opt.value;
            }}
            placeholder="Select Timezone"
            options={data.handshake}
            color="lighterGray"
          />
        </I3Div>
        <I3Div margin={"md"}>
          <I3Div variant="h6" fontWeight="bold" margin="xs">
            Parity
          </I3Div>
          <I3Select
            onChange={(item) =>
              this.updateObject(lis.serialChannel, {
                parity: item.value,
              })
            }
            value={data.parity.find(
              (opt) => opt.value == lis.serialChannel.parity
            )}
            getOptionLabel={(opt) => {
              return opt.label;
            }}
            getOptionValue={(opt) => {
              return opt.value;
            }}
            placeholder="Select Timezone"
            options={data.parity}
            color="lighterGray"
          />
        </I3Div>
        <I3Div margin={"md"}>
          <I3Div variant="h6" fontWeight="bold" margin="xs">
            Stop bits
          </I3Div>
          <I3Select
            onChange={(item) =>
              this.updateObject(lis.serialChannel, {
                stopBits: item.value,
              })
            }
            value={data.stopBits.find(
              (opt) => opt.value == lis.serialChannel.stopBits
            )}
            getOptionLabel={(opt) => {
              return opt.label;
            }}
            getOptionValue={(opt) => {
              return opt.value;
            }}
            placeholder="Select Timezone"
            options={data.stopBits}
            color="lighterGray"
          />
        </I3Div>
      </Fragment>
    );
  };
  //FolderChannel
  _changeActiveFolderChannel = (key) => {
    this.updateObject(this.props.lis.folderChannel, {
      [key]: !this.props.lis.folderChannel[key],
    });
  };
  _changeTextFolderChannel = (item, key, value) => {
    this.updateObject(item, { [key]: value });
  };
  _renderFolderChannel = () => {
    let { data, lis } = this.props;
    return (
      <Fragment>
        <RowSwitch
          title="Need Ack"
          isActive={
            lis.folderChannel.needAck ? lis.folderChannel.needAck : false
          }
          onChange={() => this._changeActiveFolderChannel("needAck")}
        />
        <RowTextField
          title="Shared folder"
          value={
            lis.folderChannel.rootFolder ? lis.folderChannel.rootFolder : ""
          }
          onChange={(text) =>
            this._changeText(lis.folderChannel, "rootFolder", text)
          }
        />
        <RowTextField
          title="Input File"
          value={lis.folderChannel.inputFile ? lis.folderChannel.inputFile : ""}
          onChange={(text) =>
            this._changeText(lis.folderChannel, "inputFile", text)
          }
        />
        <RowTextField
          title="Output File"
          value={
            lis.folderChannel.outputFile ? lis.folderChannel.outputFile : ""
          }
          onChange={(text) =>
            this._changeText(lis.folderChannel, "outputFile", text)
          }
        />
      </Fragment>
    );
  };
  _renderTypeComunationMode = () => {
    let component = <Fragment></Fragment>;
    let { lis } = this.props;
    switch (lis.communicationMode) {
      case LisCommunicationMode.FolderChannel:
        component = this._renderFolderChannel();
        break;
      case LisCommunicationMode.SerialChannel:
        component = this._renderSerialChannel();
        break;
      case LisCommunicationMode.TCPChannel:
        component = this._renderTCPChannel();
        break;
      default:
        break;
    }
    return component;
  };
  consumerContent() {
    let { classes, data, lis } = this.props;
    return (
      <Fragment>
        {data && data.lisCommunationMode ? (
          <>
            <I3Div margin={"md"}>
              <I3Div variant="h6" fontWeight="bold" margin="xs">
                Type
              </I3Div>
              <I3Select
                onChange={(item) => {
                  this.updateObject(lis, { communicationMode: item.value });
                }}
                value={data.lisCommunationMode.find(
                  (opt) => opt.value == lis.communicationMode
                )}
                getOptionLabel={(opt) => {
                  return opt.label;
                }}
                getOptionValue={(opt) => {
                  return opt.value;
                }}
                placeholder="Select Timezone"
                options={data.lisCommunationMode}
                color="lighterGray"
              />
            </I3Div>
            {this._renderTypeComunationMode()}
          </>
        ) : null}
      </Fragment>
    );
  }
}

const Styles = {
  inputText: {
    margin: 0,
    padding: "0px",
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
};
TypeComunationMode.protoTypes = {
  data: PropTypes.object,
  lis: PropTypes.object,
};
export default withStyles(Styles)(TypeComunationMode);
