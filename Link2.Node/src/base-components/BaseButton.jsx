import React from "react";
import { I3Div, I3Icon } from "../importer";
import { FontWeight } from "../themeStyles/Color";
import cx from "classnames";
import {
  availableMarginAndPadding,
  getColorFromName,
} from "general/CleanNodeHelper";

import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

class BaseButton extends React.Component {
  static defaultProps = {
    variant: "solid",
    disabled: false,
  };
  static propTypes = {
    classes: PropTypes.object,
    variant: PropTypes.oneOf(["solid", "outlined", "text"]),
    // margin: PropTypes.oneOf([
    //   PropTypes.oneOf([
    //     PropTypes.oneOf(availableMarginAndPadding),
    //     PropTypes.arrayOf(PropTypes.oneOf(availableMarginAndPadding)),
    //   ]),
    //   PropTypes.arrayOf(
    //     PropTypes.oneOf([
    //       PropTypes.oneOf(availableMarginAndPadding),
    //       PropTypes.arrayOf(PropTypes.oneOf(availableMarginAndPadding)),
    //     ])
    //   ),
    // ]),
    iconClassName: PropTypes.string,
  };
  _onClick = (e) => {
    if (this.props.disabled == false) {
      typeof this.props.onClick == "function" && this.props.onClick(e);
    }
  };
  render() {
    let {
      classes,
      onClick,
      variant,
      margin,
      width,
      iconClassName,
      children,
      disabled,
      ...otherProps
    } = this.props;
    let customStyles = {};
    let rootClasses = cx({
      [classes.root]: true,
      [classes.solid]: variant === "solid",
      [classes.outlined]: variant === "outlined",
      [classes.text]: variant === "text",
      [classes.disabled]: disabled,
    });
    if (width) {
      customStyles.width = width;
    }
    return (
      <I3Div
        margin={margin}
        fontWeight={FontWeight.bold}
        variant="body1"
        display="inline-flex"
      >
        <button
          onClick={this._onClick}
          style={customStyles}
          className={rootClasses}
          {...otherProps}
        >
          {iconClassName ? (
            <I3Icon
              lineHeight="20px"
              className={iconClassName}
              color="blue"
              margin={["no", "sm", "no", "no"]}
            />
          ) : null}
          {children}
        </button>
      </I3Div>
    );
  }
}
let color = getColorFromName("blue");
export default withStyles({
  root: {
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    minWidth: "84px",
    fontFamily: "inherit",
    fontWeight: "inherit",
    fontSize: "inherit",
    lineHeight: "inherit",
    padding: "10px 15px",
    lineHeight: "20px",
    "&:focus": {
      outline: "none",
    },
    "&:hover": {
      boxShadow:
        "0 2px 2px 0 rgba(86, 137, 175), 0 3px 1px -2px rgba(153, 153, 153, 0.2), 0 1px 5px 0 rgba(153, 153, 153, 0.12)",
    },
  },
  solid: {
    backgroundColor: color,
    color: "white",
  },
  outlined: {
    backgroundColor: "white",
    color: color,
    border: "2px solid " + color,
    padding: "8px 14px",
  },
  text: {
    backgroundColor: "unset",
    color: color,
  },
  disabled: {
    opacity: ".54",
  },
})(BaseButton);
