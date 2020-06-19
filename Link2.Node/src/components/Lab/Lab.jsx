import React from 'react'
import BaseConsumer from 'BaseComponent/BaseConsumer';
import LabItem from './LabItem';
import { I3Div, BaseButton } from '../../importer';
import { EModalType } from '../../general/enum';
import CloneLabDetailModal from './CloneLabDetailModal';

export default class Lab extends BaseConsumer {
    componentDidMount() {
        this.ajaxGet({
            url: "/api/link/GetLabs",
            success: (ack) => {
                this.updateObject(this.props.lab, { labList: ack.data });
            },
        });
    }
    _openModal = (title) => {
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
    // _onDeleteItem = (oldList, i) => {
    //     this.removeElement(oldList, i, this.success("Removed Item"))
    // }
    consumerContent() {
        let { lab } = this.props;
        if (!lab.labList || lab.labList.length <= 0) {
            return null;
        }
        return (
            <>
                <I3Div backgroundColor="lighterGray"
                    margin={["no", "md", "md", "md"]}>
                    <BaseButton margin={"md"} onClick={() => this._openModal("New Laboratory")}>Create New Laboratory</BaseButton>
                </I3Div>
                {lab.labList.map(i => {
                    return (
                        <LabItem
                            key={i.id + "lablist"}
                            lab={i}
                            onUpdateLab={(newLab) => this._onUpdateItem(i, newLab)}
                        />
                    )
                })}
            </>

        )
    }
}
