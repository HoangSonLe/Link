import React, { Fragment } from "react";
import BaseConsumer from "BaseComponent/BaseConsumer";
import { withStyles } from "@material-ui/core";
import {
  RowTextField,
  RowSwitch,
  I3Div,
  I3Select,
  ShouldUpdateWrapper,
} from "../../importer";
import PropTypes from "prop-types";
import { LisCommunicationMode } from "../../general/enum";

class TypeComunationMode extends BaseConsumer {
  constructor(props) {
    super(props);
  }
  _changeText = (item, key, value) => {
    this.updateObject(item, { [key]: value });
  };
  //render TCP
  _renderTCPChannel = () => {
    let { lis, classes } = this.props;
    return (
      <Fragment>
        <ShouldUpdateWrapper
          value={lis.tcpChannel.ip ? lis.tcpChannel.ip : ""}
          onChange={(text) => this._changeText(lis.tcpChannel, "ip", text)}
        >
          <RowTextField title="TCP/IP Address" />
        </ShouldUpdateWrapper>
        <ShouldUpdateWrapper
          value={lis.tcpChannel.port ? lis.tcpChannel.port : ""}
          onChange={(text) => this._changeText(lis.tcpChannel, "port", text)}
        >
          <RowTextField title="TCP/IP Port" />
        </ShouldUpdateWrapper>
        <ShouldUpdateWrapper
          value={lis.tcpChannel.timeOut ? lis.tcpChannel.timeOut : 0}
          onChange={(text) => this._changeText(lis.tcpChannel, "timeOut", text)}
        >
          <RowTextField
            title="Time out (second)"
            className={classes.inputText}
            type="number"
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
              },
            }}
          />
        </ShouldUpdateWrapper>
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
    return (
      <Fragment>
        <ShouldUpdateWrapper
          value={lis.serialChannel.portName ? lis.serialChannel.portName : ""}
          onChange={(text) =>
            this._changeText(lis.serialChannel, "portName", text)
          }
        >
          <RowTextField title="Port name (eg. COM1)" />
        </ShouldUpdateWrapper>
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
        <ShouldUpdateWrapper
          value={lis.serialChannel.timeOut ? lis.serialChannel.timeOut : 0}
          onChange={(text) =>
            this._changeText(lis.serialChannel, "timeOut", text)
          }
        >
          <RowTextField
            title="Time out (second)"
            className={classes.inputText}
            type="number"
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
              },
            }}
          />
        </ShouldUpdateWrapper>
        <I3Div margin={"md"}>
          <I3Div variant="h6" fontWeight="bold" margin="xs">
            Baud rate
          </I3Div>
          <ShouldUpdateWrapper
            options={data.baudRate}
            onChange={(item) =>
              this.updateObject(lis.serialChannel, {
                baudRate: item.value,
              })
            }
            value={data.baudRate.find(
              (opt) => opt.value == lis.serialChannel.baudRate
            )}
          >
            <I3Select
              getOptionLabel={(opt) => {
                return opt.label;
              }}
              getOptionValue={(opt) => {
                return opt.value;
              }}
              placeholder="Select BaudRate"
              color="lighterGray"
            />
          </ShouldUpdateWrapper>
        </I3Div>
        <I3Div margin={"md"}>
          <I3Div variant="h6" fontWeight="bold" margin="xs">
            Handshake
          </I3Div>
          <ShouldUpdateWrapper
            options={data.handshake}
            onChange={(item) =>
              this.updateObject(lis.serialChannel, {
                handshake: item.value,
              })
            }
            value={data.handshake.find(
              (opt) => opt.value == lis.serialChannel.handshake
            )}
          >
            <I3Select
              getOptionLabel={(opt) => {
                return opt.label;
              }}
              getOptionValue={(opt) => {
                return opt.value;
              }}
              placeholder="Select Handshake"
              color="lighterGray"
            />
          </ShouldUpdateWrapper>
        </I3Div>
        <I3Div margin={"md"}>
          <I3Div variant="h6" fontWeight="bold" margin="xs">
            Parity
          </I3Div>
          <ShouldUpdateWrapper
            options={data.parity}
            onChange={(item) =>
              this.updateObject(lis.serialChannel, {
                parity: item.value,
              })
            }
            value={data.parity.find(
              (opt) => opt.value == lis.serialChannel.parity
            )}
          >
            <I3Select
              getOptionLabel={(opt) => {
                return opt.label;
              }}
              getOptionValue={(opt) => {
                return opt.value;
              }}
              placeholder="Select Parity"
              color="lighterGray"
            />
          </ShouldUpdateWrapper>
        </I3Div>
        <I3Div margin={"md"}>
          <I3Div variant="h6" fontWeight="bold" margin="xs">
            Stop bits
          </I3Div>
          <ShouldUpdateWrapper
            options={data.stopBits}
            onChange={(item) =>
              this.updateObject(lis.serialChannel, {
                stopBits: item.value,
              })
            }
            value={data.stopBits.find(
              (opt) => opt.value == lis.serialChannel.stopBits
            )}
          >
            <I3Select
              getOptionLabel={(opt) => {
                return opt.label;
              }}
              getOptionValue={(opt) => {
                return opt.value;
              }}
              placeholder="Select  Stop bits"
              color="lighterGray"
            />
          </ShouldUpdateWrapper>
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
        <ShouldUpdateWrapper
          value={
            lis.folderChannel.rootFolder ? lis.folderChannel.rootFolder : ""
          }
          onChange={(text) =>
            this._changeText(lis.folderChannel, "rootFolder", text)
          }
        >
          <RowTextField title="Shared folder" />
        </ShouldUpdateWrapper>
        <ShouldUpdateWrapper
          value={lis.folderChannel.inputFile ? lis.folderChannel.inputFile : ""}
          onChange={(text) =>
            this._changeText(lis.folderChannel, "inputFile", text)
          }
        >
          <RowTextField title="Input File" />
        </ShouldUpdateWrapper>
        <ShouldUpdateWrapper
          value={
            lis.folderChannel.outputFile ? lis.folderChannel.outputFile : ""
          }
          onChange={(text) =>
            this._changeText(lis.folderChannel, "outputFile", text)
          }
        >
          <RowTextField title="Output File" />
        </ShouldUpdateWrapper>
      </Fragment>
    );
  };
  //render Content
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
              {lis ? (
                <ShouldUpdateWrapper
                  options={data.lisCommunationMode}
                  onChange={(item) => {
                    this.updateObject(lis, { communicationMode: item.value });
                  }}
                  value={data.lisCommunationMode.find(
                    (opt) => opt.value == lis.communicationMode
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
              ) : null}
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
