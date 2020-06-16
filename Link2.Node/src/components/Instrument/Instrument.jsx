import React from "react";
import BaseConsumer from "BaseComponent/BaseConsumer";
import { withStyles } from "@material-ui/core";
import { I3Div, I3Icon, IconButtonGroup, Item, LastDivItem, GridContainer, GridItem, ListComponent, BaseModal, BaseButton, I3Component } from "../../importer";
import { EModalType } from "../../general/enum";
import HeaderListComponent from "../../base-components/HeaderListComponent";

class Instrument extends BaseConsumer {
    componentDidMount() {
        this.ajaxGet({
            url: "/api/link/GetInstruments",
            success: (ack) => {
                console.log(ack.data);
                this.updateObject(this.props.instrument, { instrumentList: ack.data, newInstrument: {} });
                // this.ajaxGet({
                //   url: "/api/link/GetDefaultLis",
                //   success: (ack) => {
                //     this.updateObject(this.props.lis, { newLis: ack.data });
                //   },
                // });
            },
        });
    }
    _openModal = (title, item, hasFooter = true) => {
        this.openModal(
            () => ({
                title: title,
                body: (
                    <BaseModal
                        hasFooter={hasFooter}
                        modalBody={
                            <h1>Intrument</h1>
                        }
                        rightFooter={<BaseButton width="110px">Save</BaseButton>}

                    ></BaseModal>
                ),
            }),
            EModalType.Right,
            true
        );
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
                        // hành động thực hiện sau khi nhấn nút oke
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
                        onClick: () => (this._openModal("Communication test results", e, false))
                    },
                    {
                        className: "fas fa-pen",
                        onClick: () => (this._openModal("Edit Lis", e))
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
        console.log("instrument", instrument);
        if (!instrument.instrumentList || instrument.instrumentList.length <= 0) {
            return null;
        }
        return (
            <>
                <I3Div>
                    <I3Component variant="h5">
                        Assigned
                    </I3Component>
                    {this._renderGroupInstrument(true)}
                </I3Div>
                <I3Div>
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
