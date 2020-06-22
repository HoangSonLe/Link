import React from "react";
import BaseConsumer from "BaseComponent/BaseConsumer";
import LabItem from "./LabItem";
import { I3Div, BaseButton } from "../../importer";
import { EModalType } from "../../general/enum";
import CloneLabDetailModal from "./CloneLabDetailModal";

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
  };
  _onAddItem = (newItem) => {
    let { lab } = this.props;

    this.ajaxPost({
      url: "/api/link/AddOrUpdateLab",
      data: newItem,
      success: (ack) => {
        this.addElement(lab.labList, ack.data, null, () => {
          this.closeModal(-1);
          this.success("Added Item");
        });
      },
      error: (ack) => {
        this.error(ack.ErrorMessage);
      },
    });
  };
  _onUpdateItem = (oldItem, newItem) => {
    this.updateObject(oldItem, newItem, () => {
      this.closeModal(-1);
      this.success("Updated Item");
    });
  };
  _onDeleteLab = (i) => {
    let { lab } = this.props;
    this.removeElement(lab.labList, i, this.success("Removed Item"));
  };
  consumerContent() {
    let { lab } = this.props;

    return (
      <>
        <I3Div backgroundColor="lighterGray" margin={["no", "md", "md", "md"]}>
          <BaseButton
            margin="md"
            onClick={() => this._openModal("New Laboratory")}
          >
            Create New Laboratory
          </BaseButton>
        </I3Div>
        {lab.labList.map((i) => {
          return (
            <LabItem
              key={i.id + "lablist"}
              lab={i}
              onDelete={() => this._onDeleteLab(i)}
            />
          );
        })}
      </>
    );
  }
}
