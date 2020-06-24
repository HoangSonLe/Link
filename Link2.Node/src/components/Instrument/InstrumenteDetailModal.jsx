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
      <BaseButton variant="outlined" onClick={this._close}>
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
          typeof onSave === "function"
            ? this._onAddItem(instrument)
            : this._onUpdateItem(instrument);
        }}
      >
        Save
      </BaseButton>
    );
  }
  _onUpdateItem = (newItem) => {
    this.ajaxPost({
      url: "/api/link/AddOrUpdateInstrument",
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

  _onAddItem = (newItem) => {
    this.ajaxPost({
      url: "/api/link/AddOrUpdateInstrument",
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

InstrumenteDetailModal.protoTypes = {
  instrument: PropTypes.object.isRequired,
  onSave: PropTypes.func,
  commitData: PropTypes.func,
};
