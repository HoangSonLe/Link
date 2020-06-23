import React from "react";
import helper from "../../general/helper";

import BaseCloneConsumer from "BaseComponent/BaseCloneConsumer";
import LabDetailModal from "./LabDetailModal";
import PropTypes from "prop-types";

export default class CloneLabDetailModal extends BaseCloneConsumer {
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
    let { data, onSave, onDelete, ...otherProps } = this.props;
    let cloneData = this.getCloneStateByKey(this._randomId);
    return (
      <LabDetailModal
        onDelete={onDelete}
        onSave={onSave}
        lab={cloneData}
        {...otherProps}
      />
    );
  }
}
CloneLabDetailModal.propTypes = {
  data: PropTypes.object,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
};
CloneLabDetailModal.displayName = "CloneLabDetailModal";
