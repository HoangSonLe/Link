import React from "react";
import ModalLayout from "../../layout/ModalLayout";

import { BaseButton } from "../../importer";
import AddItemLab from "./AddItemLab";
import PropTypes from "prop-types";

export default class AddItemLabModal extends ModalLayout {
  constructor(props) {
    super(props);
    this.selectedItem = [];
  }
  //thêm vào danh sách chọn
  _onAddItemToLab = (newItems) => {
    this.selectedItem = newItems;
  };
  modalBody() {
    const { typeAdd, lab, ...others } = this.props;
    return (
      <AddItemLab
        onAddItemToLab={this._onAddItemToLab}
        lab={lab}
        typeAdd={typeAdd}
      />
    );
  }
  leftFooter() {
    return (
      <BaseButton variant="outlined" onClick={this.closeThisModal}>
        Cancel
      </BaseButton>
    );
  }

  rightFooter() {
    const { typeAdd, onSave, ...others } = this.props;

    return (
      <BaseButton
        width="110px"
        onClick={() => {
          onSave(this.selectedItem);
          this.closeThisModal();
        }}
      >
        Save
      </BaseButton>
    );
  }
}
AddItemLabModal.propTypes = {
  lab: PropTypes.object,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
};
