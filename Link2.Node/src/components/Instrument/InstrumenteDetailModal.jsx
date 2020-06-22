import React from "react";
import ModalLayout from "../../layout/ModalLayout";

import { BaseButton } from "../../importer";
import InstrumentDetail from "./InstrumentDetail";
import PropTypes from "prop-types";

export default class InstrumenteDetailModal extends ModalLayout {
  dataToCompare() {
    return this.props.instrument;
  }
  componentDidMount() {
    this.setInitDataToCompare(this.props.instrument);
  }
  modalBody() {
    const { instrument } = this.props;
    return <InstrumentDetail instrument={instrument} />;
  }
  leftFooter() {
    return (
      <BaseButton variant="outlined" onClick={this.closeThisModal}>
        Cancel
      </BaseButton>
    );
  }

  rightFooter() {
    const { instrument, onSave } = this.props;

    return (
      <BaseButton
        width="110px"
        onClick={() => {
          onSave(instrument);
          // this.closeThisModal();
        }}
      >
        Save
      </BaseButton>
    );
  }
}
InstrumenteDetailModal.protoTypes = {
  instrument: PropTypes.object.isRequired,
  onSave: PropTypes.func,
};
