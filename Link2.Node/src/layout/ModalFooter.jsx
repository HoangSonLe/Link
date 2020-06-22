import { withStyles } from "@material-ui/core";
import BaseConsumer from "BaseComponent/BaseConsumer";
import React, { Fragment } from "react";
import { EModalType } from "../general/enum";
import { I3Div } from "../importer";

class ModalFooter extends BaseConsumer {
  constructor(props) {
    super(props);
  }
  consumerContent() {
    const { classes, rightFooter, leftFooter, type } = this.props;
    let padding;
    if (type == EModalType.Right) {
      padding = ["md", "md", "md", "md"];
    } else {
      padding = ["no", "lg4", "no", "lg4"];
    }
    return (
      <Fragment>
        <I3Div
          className={classes.Footer}
          borderColor="lighterGray"
          border={[true, false, false, false]}
          padding={padding}
          display="flex"
          alignItems="center"
        >
          <I3Div
            flexGrow="1"
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
          >
            {leftFooter}
          </I3Div>
          <I3Div
            flexGrow="1"
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            {rightFooter}
          </I3Div>
        </I3Div>
      </Fragment>
    );
  }
}

export default withStyles({
  Footer: {
    position: "sticky",
    bottom: "0px",
    background: "white",
    zIndex: 2,
  },
})(ModalFooter);
