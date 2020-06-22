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
    const { lis, onSave } = this.props;

    return (
      <BaseButton
        width="110px"
        onClick={() => {
          onSave(lis);
          // this.closeThisModal();
        }}
      >
        Save
      </BaseButton>
    );
  }
}
LisDetail.protoTypes = {
  lis: PropTypes.object,
  onSave: PropTypes.func,
};
