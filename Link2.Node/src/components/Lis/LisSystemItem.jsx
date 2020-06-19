import React from "react";
import { withStyles } from "@material-ui/core";
import { IconButtonGroup, I3Component, I3Div } from "../../importer";
import { EModalType } from "../../general/enum";
import PropTypes from 'prop-types';

import { Item, Styles } from '../../base-components/Item'
import CloneLisDetailModal from "./CloneLisDetailModal";

class LisSystemItem extends Item {

    constructor(props) {
        super(props)
    }
    _openModal = (title, isAdd = true, isTest = false) => {
        !isTest ?
            this.openModal(
                () => ({
                    title: title,
                    body:
                        <CloneLisDetailModal
                            onSave={newItem => isAdd ? this._onAddItem(newItem) : this._onUpdateItem(this.props.lisSystem, newItem)}
                            data={this.props.lisSystem}
                        />
                    ,
                }),
                EModalType.Right,
                true
            )
            : null
    }
    _onUpdateItem = (oldItem, newItem) => {
        this.ajaxGet({
            url: "/api/link/getlissystems",
            success: ack => {
                this.props.onUpdate(this.props.lisSystem, newItem)
            },
            error: ack => {
                this.error("Lỗi !!!");
            }

        })
    }
    _onDeleteItem = () => {
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
                        this.ajaxGet({
                            url: "/api/link/getlissystems",
                            success: ack => {
                                this.props.onDelete(this.props.lisSystem)
                            },
                            error: ack => {
                                this.error("Lỗi !!!");
                            }

                        })
                    }
                }

            }
        )
    }

    renderImage() {
        return (
            <img src={"/dist/contents/images/" + this.props.lisSystem.image} />
        );
    }
    renderRightHeader() { }

    renderRightFooter() {
        let { lisSystem } = this.props;
        let component = [];
        typeof (this.props.onUpdate) === 'function' ?
            component.push(
                {
                    className: "fas fa-pen",
                    onClick: () => (this._openModal("Edit Lis", false))
                }
            ) : null;

        !lisSystem.canDelete && typeof (this.props.onDelete) === 'function' ?
            component.push(
                {
                    className: "far fa-trash-alt",
                    onClick: () => (this._onDeleteItem())
                }
            )
            : null;
        return (
            <IconButtonGroup
                components={component}
            />
        )
    }

}
LisSystemItem.protoTypes = {
    onDelete: PropTypes.func,
    onUpdate: PropTypes.func,
    lisSystem: PropTypes.object.isRequired
}
const Style = {
    ...Styles
}
export default withStyles(Style)(LisSystemItem);