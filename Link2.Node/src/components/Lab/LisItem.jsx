import React from "react";
import { withStyles } from "@material-ui/core";
import { IconButtonGroup, BaseCheckboxItem } from "../../importer";
import PropTypes from 'prop-types';

import { Item, Styles } from '../../base-components/Item'

class LisItem extends Item {

    constructor(props) {
        super(props)
    }
    _onUpdateItem = (oldItem, newItem) => {
        this.updateObject(oldItem, newItem, () => this.success("Updated Item"), this.props.onUpdate)
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
                            url: '/api/link/getlabs',
                            success: ack => {
                                this.props.onDelete(this.props.lis);
                            }
                        })

                    }
                }

            }
        )
    }
    _onClickLisCheck = (e, item) => {
        this.updateObject(item, { isMirror: e.target.checked }, () => {
            //callback hàm ngoài
        })
    }
    renderImage() {
        return (
            <img src={"/dist/contents/images/" + this.props.lis.lisSystem.image} />
        );
    }
    renderRightHeader() {
        return (
            <BaseCheckboxItem
                label={"Mirror"}
                onChange={e => this._onClickLisCheck(e, this.props.lis)}
                checked={this.props.lis.isMirror}
                isMulti={true}
            />
        )
    }

    renderRightFooter() {
        let { lis } = this.props;
        let component = [];
        typeof (this.props.onDelete) === 'function' ?
            component.push(
                {
                    className: "far fa-trash-alt",
                    onClick: this._onDeleteItem
                }
            ) : null;

        return (
            <IconButtonGroup
                components={component}
            />
        )
    }

}
LisItem.protoTypes = {
    onDelete: PropTypes.func,
    onUpdate: PropTypes.func,
    lis: PropTypes.object.isRequired
}
const Style = {
    ...Styles
}
export default withStyles(Style)(LisItem);