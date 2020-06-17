import React from "react"
import helper from '../../general/helper';

import BaseCloneConsumer from "BaseComponent/BaseCloneConsumer";
import InstrumentDetail from "./InstrumentDetail";

export default class CloneInstrumentDetail extends BaseCloneConsumer {
    constructor(props) {
        super(props);
        this._randomId = helper.guid.get();
    }
    getCloneStateName() {
        return this._randomId;
    }
    getCloneStateData() {
        return this.props.instrument;
    }
    childrenCloneContent() {
        let { instrument, ...otherProps } = this.props;
        let data = this.getCloneStateByKey(this._randomId);
        return (
            <InstrumentDetail
                instrument={data}
            />
        )
    }
}
CloneInstrumentDetail.displayName = "CloneInstrumentDetail"