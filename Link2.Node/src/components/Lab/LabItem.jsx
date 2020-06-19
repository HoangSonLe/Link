import React from "react";
import BaseConsumer from "BaseComponent/BaseConsumer";
import { withStyles } from "@material-ui/core";
import { I3Div, I3Icon, LastDivItem, ListComponent, I3Component } from "../../importer";
import { EModalType } from "../../general/enum";
import DevidedComponents from "../../base-components/DevidedComponents";
import LisItem from "./LisItem";
import InstrumentItem from "../Instrument/InstrumentItem";
import PropTypes from 'prop-types';
import CloneLabDetailModal from "./CloneLabDetailModal";

class LabItem extends BaseConsumer {
    _openModal = (title) => {
        this.openModal(
            () => ({
                title: title,
                body: (
                    <CloneLabDetailModal
                        data={this.props.lab}
                        onSave={() => this._onUpdateLab}
                    ></CloneLabDetailModal>
                ),
            }),
            EModalType.Right,
            true
        );
    }
    _onUpdateLab = () => {
        this.ajaxPost({
            url: '/api/link/AddOrUpdateInstrument',
            data: newItem,
            success: ack => {
                this.props.onUpdateLab(this.props.lab, ack.data);
            },
            error: ack => {
                this.error("Lỗi !!!");
            }
        })
    }
    _onUpdateInstrument = (oldItem, newItem) => {
        this.updateObject(oldItem, newItem, () => this.success("Updated Item"))
    }
    _onDeleteInstrument = (i) => {
        this.removeElement(this.props.lab.lisInstruments, i, this.success("Removed Item"))
    }
    _renderInstrument = (i) => {
        return (
            <InstrumentItem
                header={i.name}
                isActive={i.isActive}
                instrument={i}
                onDelete={this._onDeleteInstrument}
                onUpdate={this._onUpdateInstrument}
            />
        );
    }

    _onDeleteLis = (i) => {
        this.removeElement(this.props.lab.lisInRouters, i, this.success("Removed Item"))
    }
    _renderLis = (i) => {
        return (
            <LisItem
                key={i.id}
                header={i.lisSystem.name}
                isActive={i.lisSystem.isActive}
                onDelete={this._onDeleteLis}
                lis={i}
            />
        );
    }

    consumerContent() {
        let { classes, lab } = this.props;
        return (
            <I3Div margin={"md"}>
                <DevidedComponents
                    components={[
                        <I3Component variant="h5" className={classes.Div}>{lab.name}</I3Component>,
                        <I3Component variant="h6" fontWeight="lighter" className={classes.Div}>
                            Priority: {lab.priority}
                        </I3Component>,
                        <I3Component variant="subtitle1" className={classes.Div}>
                            {lab.lisInstruments ? lab.lisInstruments.length : 0} instruments,
                            {lab.lisInRouters ? lab.lisInRouters.length : 0} LIS, +
                            {lab.lisInRouters ? lab.lisInRouters.filter(i => i.isMirror).length : 0} mirror
                        </I3Component>,
                        <I3Div onClick={() => this._openModal("Edit Lab")} variant="h6" cursor="pointer" color="blue" >
                            <I3Icon className="fas fa-pen" fontSize="subtitle1" margin="xs" color="blue" />
                            <span>Edit Lab</span>
                        </I3Div>
                    ]}
                    deviderHeight="h6"
                    deviderWidth="default"
                    deviderColor="lightGray"
                    deviderMargin={["no", "md", "no", "md"]}
                />
                <I3Div margin={["xs", "no", "xs", "no"]}>
                    <ListComponent
                        title="Intruments"
                        dataList={lab.lisInstruments}
                        renderItem={item => this._renderInstrument(item)}
                        renderAddItem={<LastDivItem title="Add Instrument" onClick={() => alert("hi")} />} />
                    <ListComponent
                        title="LIS"
                        dataList={lab.lisInRouters}
                        renderItem={item => this._renderLis(item)}
                        renderAddItem={<LastDivItem title="Add Lis" onClick={() => alert("hi")} />} />

                </I3Div>
            </I3Div>
        )
    }
}
const Styles = {
    Div: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"

    },
    CheckBox: {
        "& .MuiSvgIcon-root": {
            fontSize: "25px"
        }
    }

};
LabItem.protoTypes = {
    onUpdateLab: PropTypes.func,
    lab: PropTypes.object.isRequired
}
export default withStyles(Styles)(LabItem);
