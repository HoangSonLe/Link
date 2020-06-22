import React from "react";
import { withStyles } from "@material-ui/core";
import { IconButtonGroup, I3Component, I3Div } from "../../importer";
import { EModalType } from "../../general/enum";
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
        body: (
          <CloneLisDetailModal
            onSave={(newItem) => this._onUpdateItem(newItem)}
            data={this.props.lisSystem}
          />
        ),
      }),
      EModalType.Right,
      true
    );
  };
  //Cập nhật LisSystem callback ra ngoài Lis
  _onUpdateItem = (newItem) => {
    let { lisSystem } = this.props;
    this.ajaxPost({
      url: "/api/link/AddOrUpdateLisSystem",
      data: newItem,
      success: (ack) => {
        this.props.onUpdate(lisSystem, newItem);
      },
      error: (ack) => {
        this.error("Lỗi !!!");
      },
    });
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
          !isInLab
            ? this.ajaxPost({
                url: "/api/link/DeleteLisSystem?id=" + lisSystem.id,
                success: (ack) => {
                  onDelete(lisSystem);
                },
                error: (ack) => {
                  this.error(ack.ErrorMessage);
                },
              })
            : onDelete(lisSystem);
        },
      },
    });
  };

  renderImage() {
    return <img src={"/dist/contents/images/" + this.props.lisSystem.image} />;
  }
  renderRightHeader() {}

  renderRightFooter() {
    let { lisSystem } = this.props;
    let component = [];
    typeof this.props.onUpdate === "function"
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
  onUpdate: PropTypes.func,
  lisSystem: PropTypes.object.isRequired,
};
LisSystemItem.defaultProps = {
  isInLab: false,
};
const Style = {
  ...Styles,
};
export default withStyles(Style)(LisSystemItem);
