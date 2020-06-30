import React from "react";
import BaseConsumer from "BaseComponent/BaseConsumer";
import { I3Div } from "../importer";
import Switch from "@material-ui/core/Switch";
import PropTypes from "prop-types";

export default class RowSwitch extends BaseConsumer {
  consumerContent() {
    let { title, isActive, onChange } = this.props;
    return (
      <I3Div
        display="flex"
        alignItems="center"
        justifyContent="center"
        margin={"md"}
      >
        <I3Div
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          variant="h6"
          fontWeight="bold"
        >
          {title}
        </I3Div>
        <I3Div
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          flexGrow={"1"}
        >
          <Switch
            checked={isActive}
            onChange={onChange}
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </I3Div>
      </I3Div>
    );
  }
}
RowSwitch.protoTypes = {
  title: PropTypes.string,
  isActive: PropTypes.string,
  onChange: PropTypes.func,
};
