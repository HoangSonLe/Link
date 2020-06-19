import React from "react";
import BaseConsumer from "BaseComponent/BaseConsumer";
import { withStyles } from "@material-ui/core";
import { I3Div, LastDivItem, ListComponent, I3Component } from "../../importer";
import { EModalType } from "../../general/enum";
import CloneInstrumentDetailModal from "./CloneInstrumentDetailModal";
import InstrumentItem from "./InstrumentItem";

class Instrument extends BaseConsumer {
    componentDidMount() {
        this.ajaxGet({
            url: "/api/link/GetInstruments",
            success: (ack) => {
                this.updateObject(this.props.instrument, { instrumentList: ack.data });
            },
            error: ack => {
                this.error("Lỗi")
            }
        });
    }
    _openModal = (title) => {
        this.openModal(
            () => ({
                title: title,
                body: (
                    <CloneInstrumentDetailModal
                        onSave={this._onAddItem} data={this.props.instrument.newInstrument}
                    />
                )
                ,
            }),
            EModalType.Right,
            true
        )

    }
    _onAddItem = (newItem) => {
        this.ajaxPost({
            url: '/api/link/AddOrUpdateInstrument',
            data: newItem,
            success: ack => {
                this.addElement(this.props.instrument.instrumentList, ack.data, null, () => this.success("Added Item"));
            },
            error: ack => {
                this.error("Lỗi !!!");
            }
        })
    }
    _onUpdateItem = (oldItem, newItem) => {
        this.updateObject(oldItem, newItem, () => this.success("Updated Item"))
    }
    _onDeleteItem = (i) => {
        this.removeElement(this.props.instrument.instrumentList, i, this.success("Removed Item"))
    }
    _renderItem = (i) => {
        return (
            <InstrumentItem
                header={i.name}
                isActive={i.isActive}
                instrument={i}
                onDelete={this._onDeleteItem}
                onUpdate={this._onUpdateItem}
            />
        );
    }
    _renderAddItem = () => {
        return <LastDivItem title="Add new Instrument" onClick={() => this._openModal("New Instrument")} />
    }
    _renderGroupInstrument = (condition) => {
        let arr = this.props.instrument.instrumentList.filter(i => i.isAssigned === condition);
        return (
            <ListComponent
                dataList={arr}
                renderItem={item => this._renderItem(item)}
                renderAddItem={!condition ? this._renderAddItem() : null}
            />
        )
    }
    consumerContent() {
        let { instrument } = this.props;
        if (!instrument.instrumentList || instrument.instrumentList.length <= 0) {
            return null;
        }
        return (
            <>
                <I3Div margin={["no", "md", "md", "md"]}>
                    <I3Component variant="h5">
                        Not Assigned
                    </I3Component>
                    {this._renderGroupInstrument(false)}
                </I3Div>
                <I3Div margin="md">
                    <I3Component variant="h5">
                        Assigned
                    </I3Component>
                    {this._renderGroupInstrument(true)}
                </I3Div>

            </>
        )
    }
}
const Styles = {

};
export default withStyles(Styles)(Instrument);
