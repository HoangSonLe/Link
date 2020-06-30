import React from "react";
import _ from "lodash";
import BaseConsumer from "BaseComponent/BaseConsumer";
import { I3Div, I3TextField, ShouldUpdateWrapper } from "../importer";
import PropTypes from "prop-types";

export default class RowTextField extends BaseConsumer {
  _onChangeInput = (e) => {
    this._debounceChange(e.target.value);
  };
  _debounceChange = _.debounce((text) => {
    this.props.onChange(text);
  }, 300);
  consumerContent() {
    let { title, value, onChange, ...otherProps } = this.props;
    return (
      <I3Div margin={"md"}>
        {title ? (
          <I3Div variant="h6" fontWeight="bold" margin="xs">
            {title}
          </I3Div>
        ) : null}

        <I3TextField
          variant="outlined"
          value={value}
          onChange={this._onChangeInput}
          {...otherProps}
        />
      </I3Div>
    );
  }
}
RowTextField.protoTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
