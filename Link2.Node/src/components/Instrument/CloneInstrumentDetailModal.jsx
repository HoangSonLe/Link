import React from "react";
import helper from "../../general/helper";
import BaseCloneConsumer from "BaseComponent/BaseCloneConsumer";
import InstrumenteDetailModal from "./InstrumenteDetailModal";
import PropTypes from "prop-types";

export default class CloneInstrumentDetailModal extends BaseCloneConsumer {
  constructor(props) {
    super(props);
    this._randomId = helper.guid.get();
  }
  getCloneStateName() {
    return this._randomId;
  }
  getCloneStateData() {
    return this.props.data;
  }
  childrenCloneContent() {
    let { data, onSave, ...otherProps } = this.props;
    let cloneData = this.getCloneStateByKey(this._randomId);
    return (
      <InstrumenteDetailModal
        onSave={onSave}
        instrument={cloneData}
        {...otherProps}
      />
    );
  }
}
CloneInstrumentDetailModal.protoTypes = {
  data: PropTypes.object.isRequired,
  onSave: PropTypes.func,
};
CloneInstrumentDetailModal.displayName = "CloneInstrumentDetailModal";
