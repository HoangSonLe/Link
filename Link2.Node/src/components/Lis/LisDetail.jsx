import React from "react"
import { BaseConsumer, I3Div, RowTextField, RowSwitch, I3Select } from "../../importer";
import { LisType } from '../../general/enum'
export default class LisDetail extends BaseConsumer {
    constructor(props) {
        super(props);
        this.state = {
            optionsForLisEdit: {},
            selectedOption: {}
        }
    }
    componentDidMount() {
        let { optionsForLisEdit, selectedOption } = this.state;
        this.ajaxGet({
            url: '/api/link/GetOptionsForLisEdit',
            success: ack => {
                this.updateLocalObject(optionsForLisEdit, ack.data, () => {
                    optionsForLisEdit.lisCommunationMode ?
                        this.updateLocalObject(selectedOption, optionsForLisEdit.lisCommunationMode[1])
                        : null;
                });
            }
        })
    }
    _changeActive = (type) => {
        console.log("type", type);
    }
    _changeText = (type) => {
        console.log("text", type);
    }

    consumerContent() {
        let { lis } = this.props;
        let { optionsForLisEdit, selectedOption } = this.state;
        return (
            <I3Div margin="xs">
                <RowTextField title="LIS name" value={lis.name} onChange={() => this._changeText(1)} />
                <RowSwitch title={"Active"} isActive={lis.isActive} onChange={() => this._changeActive(LisType.Active)} />
                <RowSwitch title={"Send QC Result"} isActive={lis.sendQCResult} onChange={() => this._changeActive(LisType.SendQCResult)} />
                <RowSwitch title={"Auto Send to LIS"} isActive={lis.autoExport} onChange={() => this._changeActive(LisType.AutoSendtoLIS)} />
                {
                    optionsForLisEdit.timeZones ?
                        <>
                            <I3Div margin={"md"} >
                                <I3Div variant="h6" fontWeight="bold" margin="xs">Timezone</I3Div>
                                <I3Select
                                    onChange={item => {
                                        this.updateObject(this.props.lis, { timeZoneId: item.value })
                                    }}
                                    value={optionsForLisEdit.timeZones.find(opt => opt.value == lis.timeZoneId)}
                                    getOptionLabel={opt => { return opt.label }}
                                    getOptionValue={opt => { return opt.value }}
                                    placeholder="Select Timezone"
                                    options={optionsForLisEdit.timeZones}
                                    color="lighterGray"
                                />
                            </I3Div>
                        </>
                        : null
                }
                {
                    optionsForLisEdit.lisCommunationMode ?
                        <>
                            <I3Div margin={"md"} >
                                <I3Div variant="h6" fontWeight="bold" margin="xs">Type</I3Div>
                                <I3Select
                                    onChange={item => {
                                        this.updateObject(this.props.lab, { timeZoneId: item.value })
                                    }}
                                    value={selectedOption}
                                    getOptionLabel={opt => { return opt.label }}
                                    getOptionValue={opt => { return opt.value }}
                                    placeholder="Select Timezone"
                                    options={optionsForLisEdit.lisCommunationMode}
                                    color="lighterGray"
                                />
                            </I3Div>
                        </>
                        : null
                }

            </I3Div>
        )
    }
}