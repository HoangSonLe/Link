import React from "react";
import { withStyles } from "@material-ui/core";

import {
  BaseConsumer,
  I3Div,
  RowTextField,
  RowSwitch,
  I3Select,
  GridContainer,
  GridItem,
  I3TextField,
  Button,
  BaseButton,
} from "../../importer";
class LabDetail extends BaseConsumer {
  constructor(props) {
    super(props);
    this.state = {
      _optionsTimeZones: [],
    };
    window.detail = this;
  }
  _changeActive = (key) => {
    this.updateObject(this.props.instrument, {
      [key]: !this.props.instrument[key],
    });
  };
  _changeText = (item, key, value) => {
    this.updateObject(item, { [key]: value });
  };
  _onDeleteLab = () => {
    let { lab, onDelete } = this.props;
    this.ajaxPost({
      url: "/api/link/DeleteLab?id=" + lab.id,
      success: (ack) => {
        onDelete();
      },
      error: (ack) => {
        this.error(ack.ErrorMessage);
      },
    });
  };
  componentDidMount() {
    this.ajaxGet({
      url: "/api/link/GetOptionsForLabEditting",
      success: (ack) => {
        this.updateLocalObject(this.state._optionsTimeZones, ack.data);
      },
      error: (ack) => {
        this.error(ack.ErrorMessage);
      },
    });
  }
  consumerContent() {
    let { classes, lab } = this.props;

    return (
      <I3Div margin="xs">
        <RowTextField
          title="Laboratory name"
          value={lab.name ? lab.name : ""}
          onChange={(text) => this._changeText(lab, "name", text)}
        />
        <I3Div margin={"md"}>
          <I3Div variant="h6" fontWeight="bold" margin="xs">
            Timezone
          </I3Div>
          <I3Select
            onChange={(item) => {
              this.updateObject(this.props.lab, { timeZoneId: item.value });
            }}
            value={this.state._optionsTimeZones.find(
              (opt) => opt.value == this.props.lab.timeZoneId
            )}
            getOptionLabel={(opt) => {
              return opt.label;
            }}
            getOptionValue={(opt) => {
              return opt.value;
            }}
            placeholder="Select Timezone"
            options={this.state._optionsTimeZones}
            color="lighterGray"
          />
        </I3Div>
        <GridContainer margin={"md"}>
          <GridItem xs={6} className={classes.Div}>
            Priority
          </GridItem>
          <GridItem xs={6}>
            <RowTextField
              className={classes.inputText}
              value={lab.priority ? lab.priority : ""}
              type="number"
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                },
              }}
              onChange={(e) => this._changeText(lab, "priority", e)}
            />
          </GridItem>
        </GridContainer>
        <I3Div display="flex" alignItems="center" justifyContent="flex-end">
          <BaseButton
            onClick={this._onDeleteLab}
            iconClassName="far fa-trash-alt"
            fontWeight="bolder"
            variant="text"
            margin="xs"
          >
            DELETE LAB
          </BaseButton>
        </I3Div>
      </I3Div>
    );
  }
}
const Styles = {
  Div: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  inputText: {
    margin: 0,
    padding: "0px",
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
};
export default withStyles(Styles)(LabDetail);
