import React from "react";
import BaseConsumer from "BaseComponent/BaseConsumer";
import { I3Div, I3Icon } from "../importer";

export default class LastDivItem extends BaseConsumer {
  consumerContent() {
    const { classes, title, margin, iconClassName, onClick } = this.props;
    return (
      <I3Div
        onClick={onClick}
        variant="h6"
        borderColor="gray"
        border={true}
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        margin={"xs"}
        color="blue"
        fontWeight="bold"
        height="82px"
        // padding={["no", "no", "no", "md"]}
      >
        <I3Icon
          lineHeight="20px"
          color="blue"
          className={iconClassName ? iconClassName : "fas fa-plus-circle"}
          margin={["no", "sm", "no", "no"]}
        />
        {title}
      </I3Div>
    );
  }
}
