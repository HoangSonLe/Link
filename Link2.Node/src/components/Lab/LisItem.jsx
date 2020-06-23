import React from "react";
import { withStyles } from "@material-ui/core";
import {
  IconButtonGroup,
  BaseCheckboxItem,
  I3Icon,
  I3Component,
} from "../../importer";
import PropTypes from "prop-types";

import { Item, Styles } from "../../base-components/Item";

class LisItem extends Item {
  constructor(props) {
    super(props);
  }
  //Xóa LIS trong LAB
  // _onUpdateItem = (oldItem, newItem) => {
  //   this.updateObject(
  //     oldItem,
  //     newItem,
  //     () => this.success("Updated Item"),
  //     this.props.onUpdate
  //   );
  // };
  //Xóa LIS bằng callback ra ngoài
  _onDeleteItem = () => {
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
          this.props.onDelete(this.props.lis);
        },
      },
    });
  };
  //Cập nhật isMirror
  _onClickLisCheck = (e, item) => {
    var { checked } = e.target;
    this.ajaxPost({
      url:
        "/api/link/CheckMirrorLisInLab?idLis=" +
        item.lisId +
        "&idLab=" +
        this.props.lab.id,
      success: (ack) => {
        this.updateObject(item, { isMirror: checked });
      },
      error: (ack) => {
        for (let i of ack.ErrorMessage) {
          this.error(i);
        }
      },
    });
  };
  renderImage() {
    return (
      <img src={"/dist/contents/images/" + this.props.lis.lisSystem.image} />
    );
  }
  renderRightHeader() {
    return (
      <BaseCheckboxItem
        label={"Mirror"}
        onChange={(e) => this._onClickLisCheck(e, this.props.lis)}
        checked={this.props.lis.isMirror}
        isMulti={true}
      />
    );
  }

  renderRightFooter() {
    let { lis } = this.props;
    let component = [];
    typeof this.props.onDelete === "function"
      ? component.push({
          className: "far fa-trash-alt",
          onClick: this._onDeleteItem,
        })
      : null;

    return <IconButtonGroup components={component} />;
  }
  renderLeftHeader() {
    let { lis } = this.props;
    return (
      <I3Component variant="body2" fontWeight="bolder" margin={"xs"}>
        {lis.lisSystem.name}
      </I3Component>
    );
  }
  renderLeftFooter() {
    let { lis } = this.props;
    let isActive = lis.lisSystem.isActive;
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
}

LisItem.protoTypes = {
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
  lis: PropTypes.object.isRequired,
  lab: PropTypes.object.isRequired,
};
const Style = {
  ...Styles,
};
export default withStyles(Style)(LisItem);
