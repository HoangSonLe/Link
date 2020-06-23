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
      <BaseButton variant="outlined" onClick={this.closeThisModal}>
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
          onSave(lab);
          // this.closeThisModal();
        }}
      >
        Save
      </BaseButton>
    );
  }
}
LabDetailModal.protoTypes = {
  lab: PropTypes.object,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
};
