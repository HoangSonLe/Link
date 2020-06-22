import React from "react";
import BaseConsumer from "BaseComponent/BaseConsumer";
import { withStyles } from "@material-ui/core";
import { LastDivItem, ListComponent } from "../../importer";
import { EModalType } from "../../general/enum";
import LisSystemItem from "./LisSystemItem";
import CloneLisDetailModal from "./CloneLisDetailModal";
import PropTypes from "prop-types";

export default class Lis extends BaseConsumer {
  componentDidMount() {
    this.ajaxGet({
      url: "/api/link/GetLisSystems",
      success: (ack) => {
        this.updateObject(this.props.lis, { lisList: ack.data });
      },
    });
  }
  //Mở modal thêm mới
  _openModal = (title, item) => {
    this.openModal(
      () => ({
        title: title,
        body: (
          <CloneLisDetailModal
            onSave={(newItem) => this._onAddItem(newItem)}
            data={this.props.lis.newLis}
          />
        ),
      }),
      EModalType.Right,
      true
    );
  };
  //Xóa LIS, callback của children
  _onDeleteItem = (i) => {
    this.removeElement(this.props.lis.lisList, i, this.success("Removed Item"));
  };
  //Cập nhật LIS, callback của children

  _onUpdateItem = (oldItem, newItem) => {
    this.updateObject(oldItem, newItem, () => {
      this.closeModal(-1);
      this.success("Updated Item");
    });
  };
  //Thêm LisSystem

  _onAddItem = (newItem) => {
    debugger;
    this.ajaxPost({
      url: "/api/link/AddOrUpdateLisSystem",
      data: newItem,
      success: (ack) => {
        this.addElement(this.props.lis.lisList, ack.data, null, () => {
          debugger;
          this.closeModal(-1);
          this.success("Added Item");
        });
      },
      error: (ack) => {
        for (let i of ack.ErrorMessage) {
          this.error(i);
        }
      },
    });
  };
  //Render LisSystem
  _renderItem = (i) => {
    return (
      <LisSystemItem
        key={i.id}
        lisSystem={i}
        onDelete={this._onDeleteItem}
        onUpdate={this._onUpdateItem}
      />
    );
  };
  //Render div cuối cùng để Adđ
  _renderAddItem = () => {
    return (
      <LastDivItem
        title="Add new Lis"
        onClick={() => this._openModal("New Lis", this.props.lis.newLis)}
      />
    );
  };
  consumerContent() {
    let { lis } = this.props;
    return (
      <ListComponent
        margin={["no", "md", "md", "md"]}
        dataList={lis.lisList}
        renderItem={(item) => this._renderItem(item)}
        renderAddItem={this._renderAddItem()}
      />
    );
  }
}
Lis.protoTypes = {
  instrument: PropTypes.object.isRequired,
};
