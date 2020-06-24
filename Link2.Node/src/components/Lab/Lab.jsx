import React from "react";
import BaseConsumer from "BaseComponent/BaseConsumer";
import LabItem from "./LabItem";
import { I3Div, BaseButton } from "../../importer";
import { EModalType } from "../../general/enum";
import CloneLabDetailModal from "./CloneLabDetailModal";
import PropTypes from "prop-types";

export default class Lab extends BaseConsumer {
  componentDidMount() {
    this.ajaxGet({
      url: "/api/link/GetLabs",
      success: (ack) => {
        this.updateObject(this.props.lab, { labList: ack.data });
      },
    });
  }
  //Mở modal chi tiết Lab
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
  //Thêm lab mới callback của clonelabdetail
  _onAddItem = (newItem) => {
    let { lab } = this.props;
    this.addElement(lab.labList, newItem, null, () => {
      this.success("Added Item");
    });
  };

  //Xóa Lab callback của labitem->...->labdetail
  _onDeleteLab = (i) => {
    let { lab } = this.props;
    this.removeElement(lab.labList, i, () => {
      this.success("Removed Item");
    });
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
        {lab.labList
          .sort((a, b) => a.priority - b.priority)
          .map((i) => {
            console.log(1);
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
Lab.propTypes = {
  lab: PropTypes.object,
};
