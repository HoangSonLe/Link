import React from "react";
import BaseConsumer from "BaseComponent/BaseConsumer";
import { withStyles } from "@material-ui/core";
import { AddNewItem, ListComponent } from "../../importer";
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

  //Nhấn Create new LIS, call vào hàm của AddNewLis

  _onClickAddNewLisButton = (callbackOpenModal) => {
    let modalFunc = () => ({
      title: "New Lis",
      body: (
        <CloneLisDetailModal
          onSave={this._onAddItem}
          data={this.props.lis.newLis}
        />
      ),
    });
    callbackOpenModal(modalFunc);
  };
  //Xóa LIS, callback của children
  _onDeleteItem = (i) => {
    this.removeElement(this.props.lis.lisList, i, this.success("Removed Item"));
  };
  //Thêm LisSystem

  _onAddItem = (newItem) => {
    this.addElement(this.props.lis.lisList, newItem, null, () => {
      this.success("Added Item");
    });
  };
  //Render LisSystem
  _renderItem = (i) => {
    return (
      <LisSystemItem key={i.id} lisSystem={i} onDelete={this._onDeleteItem} />
    );
  };

  //Render div cuối cùng để Add
  _renderAddItem = () => {
    return (
      <AddNewItem title="Add new Lis" onClick={this._onClickAddNewLisButton} />
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
