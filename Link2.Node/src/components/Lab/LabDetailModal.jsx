import React from "react";
import ModalLayout from "../../layout/ModalLayout";

import { BaseButton } from "../../importer";
import LabDetail from "./LabDetail";
import PropTypes from "prop-types";

export default class LabDetailModal extends ModalLayout {
  dataToCompare() {
    return this.props.lab;
  }
  componentDidMount() {
    this.setInitDataToCompare(this.props.lab);
  }

  modalBody() {
    const { lab, onDelete } = this.props;
    return (
      <LabDetail
        onDelete={() => {
          onDelete();
          this.closeThisModal();
        }}
        lab={lab}
      />
    );
  }
  leftFooter() {
    return (
      <BaseButton variant="outlined" onClick={this._close}>
        Cancel
      </BaseButton>
    );
  }

  rightFooter() {
    const { lab, onSave } = this.props;

    return (
      <BaseButton
        width="110px"
        onClick={(data) => {
          typeof onSave === "function"
            ? this._onAddItem(lab)
            : this._onUpdateItem(lab);
        }}
      >
        Save
      </BaseButton>
    );
  }
  //Cập nhật Lab
  _onUpdateItem = (newItem) => {
    this.ajaxPost({
      url: "/api/link/AddOrUpdateLab",
      data: newItem,
      success: (ack) => {
        this.props.commitData(() => this.success("Updated Item"));
        this.closeThisModal();
      },
      error: (ack) => {
        for (let i of ack.ErrorMessage) {
          this.error(i);
        }
      },
    });
  };
  //Thêm lab mới
  _onAddItem = (newItem) => {
    this.ajaxPost({
      url: "/api/link/AddOrUpdateLab",
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
LabDetailModal.protoTypes = {
  lab: PropTypes.object,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  commitData: PropTypes.func,
};
