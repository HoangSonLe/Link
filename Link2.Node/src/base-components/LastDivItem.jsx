import React from "react";
import BaseConsumer from "BaseComponent/BaseConsumer";
import { I3Div, I3Icon } from "../importer";
import PropTypes from "prop-types";
import { EModalType } from "../general/enum";

export default class LastDivItem extends BaseConsumer {
  _onDataLoaded = (modalFunc) => {
    this.openModal(modalFunc, EModalType.Right, true);
  };

  consumerContent() {
    const { title, iconClassName, onClick } = this.props;
    return (
      <I3Div
        onClick={() => onClick(this._onDataLoaded)}
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
LastDivItem.propType = {
  title: PropTypes.string,
  iconClassName: PropTypes.string,
  onClick: PropTypes.func,
};
