import React from "react";
import ModalLayout from "../../layout/ModalLayout";

import { BaseButton } from "../../importer";
import LisDetail from "./LisDetail";
import PropTypes from "prop-types";

export default class LisDetailModal extends ModalLayout {
  dataToCompare() {
    return this.props.lis;
  }
  componentDidMount() {
    this.setInitDataToCompare(this.props.lis);
  }
  modalBody() {
    const { lis } = this.props;
    return <LisDetail lis={lis} />;
  }
  leftFooter() {
    return (
      <BaseButton variant="outlined" onClick={this.closeThisModal}>
        Cancel
      </BaseButton>
    );
  }

  rightFooter() {
    let { lis, onSave } = this.props;
    return (
      <BaseButton
        width="110px"
        onClick={() => {
          typeof onSave === "function"
            ? this._onAddItem(lis)
            : this._onUpdateItem(lis);
        }}
      >
        Save
      </BaseButton>
    );
  }
  _onUpdateItem = (newItem) => {
    this.ajaxPost({
      url: "/api/link/AddOrUpdateLisSystem",
      data: newItem,
      success: (ack) => {
        this.props.commitData();
        this.closeThisModal();
      },
      error: (ack) => {
        for (let i of ack.ErrorMessage) {
          this.error(i);
        }
      },
    });
  };

  _onAddItem = (newItem) => {
    this.ajaxPost({
      url: "/api/link/AddOrUpdateLisSystem",
      data: newItem,
      success: (ack) => {
        this.props.onSave(ack.data);
        this.closeThisModal();
      },
      error: (ack) => {
        for (let i of ack.ErrorMessage) {
          this.error(i);
        }
      },
    });
  };
}
LisDetail.protoTypes = {
  lis: PropTypes.object,
  onSave: PropTypes.func,
  commitData: PropTypes.func,
};
