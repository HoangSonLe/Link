import React from "react";
import { withStyles } from "@material-ui/core";

import {
  BaseConsumer,
  I3Div,
  RowTextField,
  I3Select,
  GridContainer,
  GridItem,
  BaseButton,
  ShouldUpdateWrapper,
} from "../../importer";
import PropTypes from "prop-types";

class LabDetail extends BaseConsumer {
  constructor(props) {
    super(props);
    this.state = {
      _optionsTimeZones: [],
    };
  }
  componentDidMount() {
    this.ajaxGet({
      url: "/api/link/GetOptionsForLabEditting",
      success: (ack) => {
        this.clearLocalListAndPushNewItems(
          this.state._optionsTimeZones,
          ack.data
        );
      },
      error: (ack) => {
        for (let i of ack.ErrorMessage) {
          this.error(i);
        }
      },
    });
  }
  _changeText = (item, key, value) => {
    this.updateObject(item, { [key]: value });
  };
  //Xóa Lab bắn  API và callback
  _onDeleteLab = () => {
    let { lab, onDelete } = this.props;
    this.ajaxPost({
      url: "/api/link/DeleteLab?id=" + lab.id,
      success: (ack) => {
        onDelete();
      },
      error: (ack) => {
        for (let i of ack.ErrorMessage) {
          this.error(i);
        }
      },
    });
  };

  consumerContent() {
    let { classes, lab, isAddNew } = this.props;

    return (
      <I3Div margin="xs">
        <ShouldUpdateWrapper
          value={lab.name || ""}
          onChange={(text) => this._changeText(lab, "name", text)}
        >
          <RowTextField title="Laboratory name" />
        </ShouldUpdateWrapper>
        <I3Div margin={"md"}>
          <I3Div variant="h6" fontWeight="bold" margin="xs">
            Timezone
          </I3Div>
          {lab ? (
            <ShouldUpdateWrapper
              onChange={(item) => {
                this.updateObject(this.props.lab, { timeZoneId: item.value });
              }}
              value={this.state._optionsTimeZones.find(
                (opt) => opt.value == this.props.lab.timeZoneId
              )}
              options={this.state._optionsTimeZones}
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
        <GridContainer margin={"md"}>
          <GridItem xs={4} className={classes.Div}>
            Priority
          </GridItem>
          <GridItem xs={8}>
            <ShouldUpdateWrapper
              value={lab.priority || ""}
              onChange={(e) => this._changeText(lab, "priority", e)}
            >
              <RowTextField
                className={classes.inputText}
                type="number"
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                  },
                }}
              />
            </ShouldUpdateWrapper>
          </GridItem>
        </GridContainer>
        {!isAddNew ? (
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
        ) : null}
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

LabDetail.defaultProps = {
  isAddNew: false,
};

LabDetail.propTypes = {
  onDelete: PropTypes.func,
  lab: PropTypes.object,
  isAddNew: PropTypes.bool,
};
export default withStyles(Styles)(LabDetail);
