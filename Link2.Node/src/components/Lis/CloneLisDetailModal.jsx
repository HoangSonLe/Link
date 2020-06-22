import React from "react";
import helper from "../../general/helper";

import BaseCloneConsumer from "BaseComponent/BaseCloneConsumer";
import LisDetailModal from "./LisDetailModal";
import PropTypes from "prop-types";

export default class CloneLisDetailModal extends BaseCloneConsumer {
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
    return <LisDetailModal onSave={onSave} lis={cloneData} {...otherProps} />;
  }
}
CloneLisDetailModal.protoTypes = {
  data: PropTypes.object.isRequired,
  onSave: PropTypes.func,
};
CloneLisDetailModal.displayName = "CloneLisDetailModal";
