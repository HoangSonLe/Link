import React, { Fragment } from "react";
import BaseConsumer from "BaseComponent/BaseConsumer";
import { withStyles } from "@material-ui/core";
import {
  GridContainer,
  GridItem,
  I3Icon,
  I3Div,
  I3Component,
} from "../importer";
import PropTypes from "prop-types";

class Item extends BaseConsumer {
  constructor(props) {
    super(props);
  }
  renderImage() {
    throw "Should render Image";
  }
  renderLeftHeader() {
    throw "Should render Left Header";
  }
  renderRightHeader() {
    throw "Should render Right Header";
  }
  renderLeftFooter() {
    throw "Should render Left Footer";
  }
  renderRightFooter() {
    throw "Should render Right Footer";
  }
  consumerContent() {
    let { classes } = this.props;
    return (
      <GridContainer className={classes.DivContainer}>
        <GridItem
          xs={4}
          sm={4}
          xs={4}
          className={classes.DivImg + " " + classes.DetroyPadding}
        >
          {this.renderImage()}
        </GridItem>
        <GridItem xs={8} sm={8} xs={8} className={classes.DetroyPadding}>
          <GridContainer className={classes.RightTopDiv}>
            <GridItem
              xs={8}
              sm={8}
              xs={8}
              className={classes.HeadStart + " " + classes.DetroyPaddingRight}
            >
              {this.renderLeftHeader()}
              {/* <I3Component variant="body2" fontWeight="bolder" margin={"xs"}>
                {header}
              </I3Component> */}
            </GridItem>
            <GridItem
              xs={4}
              sm={4}
              xs={4}
              className={classes.HeadEnd + " " + classes.DetroyPadding}
            >
              {this.renderRightHeader()}
            </GridItem>
          </GridContainer>
          <GridContainer className={classes.RightBottomDiv}>
            <GridItem xs={4} sm={4} xs={4}>
              <I3Div
                className={classes.HeadStart + " " + classes.DetroyPadding}
              >
                {this.renderLeftFooter()}
                {/* <I3Icon
                  className={isActive ? "far fa-circle" : "fas fa-circle"}
                  fontSize="caption"
                  color={isActive ? "lightGreen" : "danger"}
                  margin={["no", "xs", "no", "no"]}
                />
                <I3Component variant="caption" component="span">
                  {isActive ? "Active" : "Inactive"}
                </I3Component> */}
              </I3Div>
            </GridItem>
            <GridItem xs={8} sm={8} xs={8}>
              <I3Div className={classes.HeadEnd + " " + classes.DetroyPadding}>
                {this.renderRightFooter()}
              </I3Div>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  }
}

const Styles = {
  DetroyPadding: {
    padding: "0 !important",
    "& > div": {
      height: "50%",
    },
  },
  DetroyPaddingRight: {
    paddingRight: "0 !important",
  },
  RightTopDiv: {
    borderBottom: "1px solid grey",
    margin: "0 !important",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  RightBottomDiv: {
    margin: "0 !important",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  HeadStart: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    fontWeight: 600,
    padding: "0 !important",
  },
  HeadEnd: {
    display: "flex",
    fontSize: "14px",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: "10px",
    "& .MuiFormControlLabel-root": {
      marginRight: "10px !important",
    },
  },

  DivContainer: {
    width: "auto",
    border: "solid 1px #bfcad3",
    height: "82px",
    boxShadow: " 0 2px 5px 0 rgba(0, 0, 0, 0.3)",
    backgroundColor: "#ffffff",
    margin: "0px !important",
  },
  DivImg: {
    height: "82px",
    display: "flex",
    alignItems: "center",
    borderRight: "solid 1px #bfcad3",
    justifyContent: "center",
  },
};
Item.protoTypes = {};
export default withStyles(Styles)(Item);

export { Item, Styles };
