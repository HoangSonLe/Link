import React from "react"
import helper from '../../general/helper';

import BaseCloneConsumer from "BaseComponent/BaseCloneConsumer";
import InstrumentDetail from "./InstrumentDetail";
import InstrumenteDetailModal from "./InstrumenteDetailModal";

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
        let { data, onSave, ...otherProps } = this.props
        let cloneData = this.getCloneStateByKey(this._randomId);
        console.log("data", data)
        return (
            <InstrumenteDetailModal
                onSave={onSave}
                instrument={cloneData}
                {...otherProps}
            />
        )
    }
}
CloneInstrumentDetailModal.displayName = "CloneInstrumentDetailModal"