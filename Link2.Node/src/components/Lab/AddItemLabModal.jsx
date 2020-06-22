import React from "react";
import ModalLayout from "../../layout/ModalLayout";

import { BaseButton } from "../../importer";
import AddItemLab from "./AddItemLab";

export default class AddItemLabModal extends ModalLayout {
  constructor(props) {
    super(props);
    this.selectedItem = [];
  }
  //thêm vào danh sách chọn
  _onAddInstrumentToLab = (newItems) => {
    this.selectedItem = newItems;
  };
  modalBody() {
    const { typeAdd, lab, ...others } = this.props;
    return (
      <AddItemLab
        onAddInstrumentToLab={this._onAddInstrumentToLab}
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
