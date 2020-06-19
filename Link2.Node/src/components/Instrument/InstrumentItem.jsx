import React from "react";
import { withStyles } from "@material-ui/core";
import { IconButtonGroup, I3Component, I3Div } from "../../importer";
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
      : null;
  };
  _onUpdateItem = (oldItem, newItem) => {
    this.ajaxPost({
      url: "/api/link/AddOrUpdateInstrument",
      data: newItem,
      success: (ack) => {
        this.props.onUpdate(this.props.instrument, ack.data);
      },
      error: (ack) => {
        this.error("Lỗi !!!");
      },
    });
  };
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
          this.ajaxPost({
            url: "/api/link/DeleteInstrument/?id=" + this.props.instrument.id,
            success: (ack) => {
              this.props.onDelete(this.props.instrument);
            },
            error: (ack) => {
              this.error("Lỗi !!!");
            },
          });
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
    let { instrument } = this.props;
    let component = [];
    typeof this.props.onUpdate === "function"
      ? component.push({
          className: "fas fa-pen",
          onClick: () => this._openModal("Edit Instrument"),
        })
      : null;

    !instrument.isAssigned && typeof this.props.onDelete === "function"
      ? component.push({
          className: "far fa-trash-alt",
          onClick: () => this._onDeleteItem(),
        })
      : null;
    return <IconButtonGroup components={component} />;
  }
}
InstrumentItem.protoTypes = {
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
  instrument: PropTypes.object.isRequired,
};
const Style = {
  ...Styles,
};
export default withStyles(Style)(InstrumentItem);
