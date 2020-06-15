import React from "react"
import { BaseConsumer, I3Div, RowTextField, RowSwitch } from "../../importer";
import { LisType } from '../../general/enum'
export default class LisDetail extends BaseConsumer {
    constructor(props) {
        super(props);
    }
    _changeActive = (type) => {
        console.log("type", type);
    }
    _changeText = (type) => {
        console.log("text", type);
    }

    consumerContent() {
        let { lis } = this.props;
        return (
            <I3Div margin="xs">
                <RowTextField title="LIS name" value={lis.name} onChange={() => this._changeText(1)} />
                <RowSwitch title={"Active"} isActive={lis.isActive} onChange={() => this._changeActive(LisType.Active)} />
                <RowSwitch title={"Send QC Result"} isActive={lis.sendQCResult} onChange={() => this._changeActive(LisType.SendQCResult)} />
                <RowSwitch title={"Auto Send to LIS"} isActive={lis.autoExport} onChange={() => this._changeActive(LisType.AutoSendtoLIS)} />
            </I3Div>
        )
    }
}