import React from "react"
import helper from '../../general/helper';

import BaseCloneConsumer from "BaseComponent/BaseCloneConsumer";
import LisDetail from "./LisDetail";

export default class CloneLisDetail extends BaseCloneConsumer {
    constructor(props) {
        super(props);
        this._randomId = helper.guid.get();
    }
    getCloneStateName() {
        return this._randomId;
    }
    getCloneStateData() {
        return this.props.lis;
    }
    childrenCloneContent() {
        let { lis, ...otherProps } = this.props;
        let data = this.getCloneStateByKey(this._randomId);
        return (
            <LisDetail
                lis={data}
            />
        )
    }
}
CloneLisDetail.displayName = "CloneLisDetail"