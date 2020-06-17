import React from "react"
import { BaseConsumer, I3Div, RowTextField, RowSwitch, I3Select } from "../../importer";
import { LisType } from '../../general/enum'
export default class InstrumentDetail extends BaseConsumer {
    constructor(props) {
        super(props);
    }
    _changeActive = (type) => {
        console.log("type", type);
    }
    _changeText = (type) => {
        console.log("text", type);
    }
    _renderOptions = () => {
        let returnData = []
        this.ajaxGet({
            url: '/api/link/GetOptionsForAnalyser',
            success: ack => {
                debugger
                returnData = ack.data;
            }
        })
        return returnData;
    }
    consumerContent() {
        let { instrument } = this.props;
        return (
            <I3Div margin="xs">
                <RowTextField title="Instrument name" value={instrument.name} onChange={() => this._changeText(1)} />
                <RowSwitch title={"Active"} isActive={instrument.isActive} onChange={() => this._changeActive(LisType.Active)} />
                <RowSwitch title={"Auto Send to instrument"} isActive={instrument.autoSendToHost} onChange={() => this._changeActive(LisType.AutoSendtoLIS)} />
                <RowTextField title="Serial Number" value={instrument.serialNumber} onChange={() => this._changeText(1)} />
                <I3Select
                    onChange={values => {
                        this.overwriteList(this.props.data.testValues, values.map(i => i.value))
                    }}
                    value={opt => options.filter(opt => opt.value == instrument.machineType)}
                    getOptionLabel={opt => { return opt.label }}
                    getOptionValue={opt => { return opt.value }}
                    label="Select Type"
                    placeholder=""
                    options={this._renderOptions()}
                />
                <RowTextField title="TAN folder" value={instrument.tanFolder} onChange={() => this._changeText(1)} />
                <RowTextField title="ASTM folder" value={instrument.astmFolder} onChange={() => this._changeText(1)} />

            </I3Div>
        )
    }
}