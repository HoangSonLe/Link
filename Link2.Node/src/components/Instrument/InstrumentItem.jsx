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
        this.error(ack.ErrorMessage);
      },
    });
  };
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
                  this.error("Lỗi !!!");
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
    let { instrument, canDelete } = this.props;
    let component = [];
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
}
InstrumentItem.protoTypes = {
  isInLab: PropTypes.bool,
  canDelete: PropTypes.bool,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
  instrument: PropTypes.object.isRequired,
  //Some protoTypes of Item
};

InstrumentItem.defaultProps = {
  isInLab: false,
};

const Style = {
  ...Styles,
};
export default withStyles(Style)(InstrumentItem);
