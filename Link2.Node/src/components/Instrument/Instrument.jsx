import React from "react";
import BaseConsumer from "BaseComponent/BaseConsumer";
import { withStyles } from "@material-ui/core";
import { I3Div, I3Icon, IconButtonGroup, Item, LastDivItem, GridContainer, GridItem, ListComponent, BaseModal, BaseButton, I3Component } from "../../importer";
import { EModalType } from "../../general/enum";
import CloneInstrumentDetailModal from "./CloneInstrumentDetailModal";

class Instrument extends BaseConsumer {
    componentDidMount() {
        this.ajaxGet({
            url: "/api/link/GetInstruments",
            success: (ack) => {
                this.updateObject(this.props.instrument, { instrumentList: ack.data });
                this.ajaxGet({
                    url: "/api/link/GetDefaultInstrument",
                    success: (ac) => {
                        this.updateObject(this.props.instrument, { newInstrument: ac.data });
                    },
                });
            },
        });
    }
    _openModal = (title, item, isAdd = true, isTest = false) => {
        !isTest ?
            this.openModal(
                () => ({
                    title: title,
                    body: <CloneInstrumentDetailModal onSave={newItem => isAdd ? this._onAddItem(newItem) : this._onUpdateItem(item, newItem)} data={item} />
                    ,
                }),
                EModalType.Right,
                true
            )
            :
            null

    }
    _onAddItem = (newItem) => {
        this.addElement(this.props.instrument.instrumentList, newItem, null, () => this.success("Added Item"));
    }
    _onUpdateItem = (oldItem, newItem) => {
        this.updateObject(oldItem, newItem, () => this.success("Updated Item"))
    }
    _deleteItem = (e) => {
        this.confirm(
            "Delete this LIS system?",
            {
                cancel: {
                    title: "Cancle", // text hiển thị trên nút cancel 
                    handle: () => {
                        // hành động thực hiện sau khi nhấn nút cancel
                    }
                },
                okay: {
                    title: "Delete", // text hiển thị trên nút oke 
                    handle: () => {
                        this.removeElement(this.props.instrument.instrumentList, e, this.success("Removed Item"))
                    }
                }

            }
        )
    }
    _renderImage = (e) => {
        return (
            <img src="http://link2.i3solution.net.au/dist/Contents/img/lis/lan-icon.png" />
        );
    }
    _renderRightHeader = (title) => {
        return <I3Component variant="caption" margin={"xs"}>{title}</I3Component>
    }

    _renderRightFooter = (e) => {
        return (
            <IconButtonGroup
                components={[
                    {
                        className: "fas fa-cogs",
                        onClick: () => (this._openModal("Communication test results", e, false, true))
                    },
                    {
                        className: "fas fa-pen",
                        onClick: () => (this._openModal("Edit Instrument", e, false))
                    },
                    {
                        className: "far fa-trash-alt",
                        onClick: () => (this._deleteItem(e))
                    }
                ]}
            />
        )
    }
    _renderItem = (e) => {
        return (
            <Item
                key={e.id}
                header={e.name}
                isActive={e.isActive}
                rightHeader={this._renderRightHeader(e.serialNumber)}
                rightFooter={this._renderRightFooter(e)}
                image={this._renderImage(e)}
            ></Item>
        );
    }
    _renderAddItem = () => {
        return <LastDivItem title="Add new Instrument" onClick={() => this._openModal("New Instrument", this.props.instrument.newInstrument)} />
    }
    _renderGroupInstrument = (condition) => {
        let arr = this.props.instrument.instrumentList.filter(e => e.isAssigned === condition);
        return <ListComponent dataList={arr} renderItem={item => this._renderItem(item)} renderAddItem={this._renderAddItem()} />
    }
    consumerContent() {
        let { instrument } = this.props;
        if (!instrument.instrumentList || instrument.instrumentList.length <= 0) {
            return null;
        }
        return (
            <>
                <I3Div margin="md">
                    <I3Component variant="h5">
                        Assigned
                    </I3Component>
                    {this._renderGroupInstrument(true)}
                </I3Div>
                <I3Div margin="md">
                    <I3Component variant="h5">
                        Not Assigned
                    </I3Component>
                    {this._renderGroupInstrument(false)}
                </I3Div>
            </>
        )
    }
}
const Styles = {

};
export default withStyles(Styles)(Instrument);
