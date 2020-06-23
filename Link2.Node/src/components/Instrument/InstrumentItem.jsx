import React from "react";
import { withStyles } from "@material-ui/core";
import { IconButtonGroup, I3Component, I3Div, I3Icon } from "../../importer";
import { EModalType } from "../../general/enum";
import CloneInstrumentDetailModal from "./CloneInstrumentDetailModal";
import PropTypes from "prop-types";

import { Item, Styles } from "../../base-components/Item";

class InstrumentItem extends Item {
  constructor(props) {
    super(props);
  }
  _openModal = (title, isTestCommunication = false) => {
    !isTestCommunication
      ? this.openModal(
          () => ({
            title: title,
            body: (
              <CloneInstrumentDetailModal
                onSave={(newItem) =>
                  this._onUpdateItem(this.props.instrument, newItem)
                }
                data={this.props.instrument}
              />
            ),
          }),
          EModalType.Right,
          true
        )
      : this.openModal(
          () => ({
            title: title,
            body: <CloneInstrumentDetailModal />,
          }),
          EModalType.Right,
          true
        );
  };
  //Cập nhật Instrument
  _onUpdateItem = (oldItem, newItem) => {
    this.ajaxPost({
      url: "/api/link/AddOrUpdateInstrument",
      data: newItem,
      success: (ack) => {
        this.props.onUpdate(this.props.instrument, ack.data);
      },
      error: (ack) => {
        for (let i of ack.ErrorMessage) {
          this.error(i);
        }
      },
    });
  };
  //Hàm xóa instrument, check nếu là xóa trong Lab thì gọi API khác
  _onDeleteItem = () => {
    let { instrument, isInLab, onDelete } = this.props;
    this.confirm("Delete this Instrument?", {
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
                url: "/api/link/DeleteInstrument/?id=" + instrument.id,
                success: (ack) => {
                  onDelete(instrument);
                },
                error: (ack) => {
                  for (let i of ack.ErrorMessage) {
                    this.error(i);
                  }
                },
              })
            : onDelete(instrument);
        },
      },
    });
  };

  renderImage() {
    return (
      <img
        height="80%"
        src={"/dist/contents/images/" + this.props.instrument.image}
      />
    );
  }
  renderRightHeader() {
    return (
      <I3Component variant="caption" margin={"xs"}>
        {this.props.instrument.serialNumber}
      </I3Component>
    );
  }

  renderRightFooter() {
    let { instrument, isInLab } = this.props;
    let canDelete = isInLab ? true : !instrument.isAssigned;
    let component = [];
    !isInLab
      ? component.push({
          className: "fas fa-cogs",
          onClick: () => this._openModal("Communication test results", true),
        })
      : null;
    typeof this.props.onUpdate === "function"
      ? component.push({
          className: "fas fa-pen",
          onClick: () => this._openModal("Edit Instrument"),
        })
      : null;

    canDelete && typeof this.props.onDelete === "function"
      ? component.push({
          className: "far fa-trash-alt",
          onClick: () => this._onDeleteItem(),
        })
      : null;

    return <IconButtonGroup components={component} />;
  }
  renderLeftHeader() {
    let { instrument } = this.props;
    return (
      <I3Component variant="body2" fontWeight="bolder" margin={"xs"}>
        {instrument.name}
      </I3Component>
    );
  }
  renderLeftFooter() {
    let { instrument } = this.props;
    let isActive = instrument.isActive;
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
InstrumentItem.protoTypes = {
  isInLab: PropTypes.bool,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
  instrument: PropTypes.object.isRequired,
};

InstrumentItem.defaultProps = {
  isInLab: false,
};

const Style = {
  ...Styles,
};
export default withStyles(Style)(InstrumentItem);
