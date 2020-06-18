import React from 'react'
import BaseConsumer from 'BaseComponent/BaseConsumer';
import { withStyles } from "@material-ui/core";
import LabItem from './LabItem';
import { I3Div, BaseButton, BaseModal } from '../../importer';
import LabDetail from './LabDetail';
import { EModalType } from '../../general/enum';
import CloneLabDetailModal from './CloneLabDetailModal';

class Lab extends BaseConsumer {
    componentDidMount() {
        this.ajaxGet({
            url: "/api/link/GetLabs",
            success: (ack) => {

                this.updateObject(this.props.lab, { labList: ack.data },
                    () => this.ajaxGet({
                        url: "/api/link/GetDefaultLab",
                        success: (ac) => {
                            this.updateObject(this.props.lab, { newLab: ac.data });
                        },
                    })
                );
            },
        });
    }
    _openModal = (title, item) => {
        this.openModal(
            () => ({
                title: title,
                body: (
                    <CloneLabDetailModal
                        data={this.props.lab.newLab}
                        onSave={this._onAddItem}
                    ></CloneLabDetailModal>
                ),
            }),
            EModalType.Right,
            true
        );
    }
    _onAddItem = (newItem) => {
        this.addElement(this.props.lab.labList, newItem, null, () => this.success("Added Item"));
    }
    _onUpdateItem = (oldItem, newItem) => {
        this.updateObject(oldItem, newItem, () => this.success("Updated Item"))
    }
    consumerContent() {
        let { lab } = this.props;
        if (!lab.labList || lab.labList.length <= 0) {
            return null;
        }
        return (
            <>
                <I3Div backgroundColor="lighterGray"
                    margin={["no", "md", "md", "md"]}>
                    <BaseButton margin={"md"} onClick={() => this._openModal("New Laboratory", lab.newLab)}>Create New Laboratory</BaseButton>
                </I3Div>
                {lab.labList.map(i => {
                    return <LabItem key={i.id + "lablist"} lab={i} onUpdateLab={() => this._openModal("Edit Lab", i)} />
                })}
            </>

        )
    }
}
const Styles = {
}
export default withStyles(Styles)(Lab);
