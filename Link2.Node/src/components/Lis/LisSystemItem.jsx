import React from "react";
import { withStyles } from "@material-ui/core";
import { IconButtonGroup, I3Component, I3Icon } from "../../importer";
import { EModalType, LisCommunicationMode, ImageLis } from "../../general/enum";
import PropTypes from "prop-types";

import { Item, Styles } from "../../base-components/Item";
import CloneLisDetailModal from "./CloneLisDetailModal";

class LisSystemItem extends Item {
  constructor(props) {
    super(props);
  }
  _openModal = (title) => {
    this.openModal(
      () => ({
        title: title,
        body: <CloneLisDetailModal data={this.props.lisSystem} />,
      }),
      EModalType.Right,
      true
    );
  };
  //Xóa LisSystem và callback ra Lis
  _onDeleteItem = () => {
    let { lisSystem, isInLab, onDelete } = this.props;
    this.confirm("Delete this LIS system?", {
      cancel: {
        title: "Cancle", // text hiển thị trên nút cancel
        handle: () => {
          // hành động thực hiện sau khi nhấn nút cancel
        },
      },
      okay: {
        title: "Delete", // text hiển thị trên nút oke
        handle: () => {
          isInLab
            ? onDelete(lisSystem)
            : this.ajaxPost({
                url: "/api/link/DeleteLisSystem?id=" + lisSystem.id,
                success: (ack) => {
                  onDelete(lisSystem);
                },
                error: (ack) => {
                  for (let i of ack.ErrorMessage) {
                    this.error(i);
                  }
                },
              });
        },
      },
    });
  };

  renderImage() {
    let image = "";
    switch (this.props.lisSystem.communicationMode) {
      case LisCommunicationMode.FolderChannel:
        image = ImageLis.FolderChannel;
        break;
      case LisCommunicationMode.SerialChannel:
        image = ImageLis.SerialChannel;
        break;
      case LisCommunicationMode.TCPChannel:
        image = ImageLis.TCPChannel;
        break;
      default:
        break;
    }
    return <img src={"/dist/contents/images/" + image} />;
  }
  renderRightHeader() {}
  renderLeftHeader() {
    let { lisSystem } = this.props;
    return (
      <I3Component variant="body2" fontWeight="bolder" margin={"xs"}>
        {lisSystem.name}
      </I3Component>
    );
  }
  renderLeftFooter() {
    let { lisSystem } = this.props;
    let isActive = lisSystem.isActive;
    return (
      <React.Fragment>
        <I3Icon
          className={isActive ? "far fa-circle" : "fas fa-circle"}
          fontSize="caption"
          color={isActive ? "lightGreen" : "danger"}
          margin={["no", "xs", "no", "no"]}
        />
        <I3Component variant="caption" component="span">
          {isActive ? "Active" : "Inactive"}
        </I3Component>
      </React.Fragment>
    );
  }

  renderRightFooter() {
    let { lisSystem, isInLab } = this.props;
    let component = [];
    !isInLab
      ? component.push({
          className: "fas fa-pen",
          onClick: () => this._openModal("Edit Lis", false),
        })
      : null;

    lisSystem.canDelete && typeof this.props.onDelete === "function"
      ? component.push({
          className: "far fa-trash-alt",
          onClick: () => this._onDeleteItem(),
        })
      : null;
    return <IconButtonGroup components={component} />;
  }
}
LisSystemItem.protoTypes = {
  onDelete: PropTypes.func,
  lisSystem: PropTypes.object.isRequired,
};
LisSystemItem.defaultProps = {
  isInLab: false,
};
const Style = {
  ...Styles,
};
export default withStyles(Style)(LisSystemItem);
