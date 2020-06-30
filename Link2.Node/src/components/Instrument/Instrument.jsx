import React from "react";
import BaseConsumer from "BaseComponent/BaseConsumer";
import { I3Div, AddNewItem, ListComponent, I3Component } from "../../importer";
import { EModalType } from "../../general/enum";
import CloneInstrumentDetailModal from "./CloneInstrumentDetailModal";
import InstrumentItem from "./InstrumentItem";
import PropTypes from "prop-types";

export default class Instrument extends BaseConsumer {
  //Lấy ds Instrument
  componentDidMount() {
    this.ajaxGet({
      url: "/api/link/GetInstruments",
      success: (ack) => {
        this.updateObject(this.props.instrument, { instrumentList: ack.data });
      },
      error: (ack) => {
        for (let i of ack.ErrorMessage) {
          this.error(i);
        }
      },
    });
  }
  //Mở modal thêm mới Instrument
  //Nhấn Create new LIS, call vào hàm của AddNewLis

  _onClickAddNewInstrumentButton = (callbackOpenModal) => {
    let modalFunc = () => ({
      title: "New Instrument",
      body: (
        <CloneInstrumentDetailModal
          onSave={this._onAddItem}
          data={this.props.instrument.newInstrument}
        />
      ),
    });
    callbackOpenModal(modalFunc);
  };
  //Thêm mới Instrument
  _onAddItem = (newItem) => {
    this.addElement(this.props.instrument.instrumentList, newItem, null, () => {
      this.success("Added Item");
    });
  };
  //Xóa Instrument Callback của Detail
  _onDeleteItem = (i) => {
    this.removeElement(
      this.props.instrument.instrumentList,
      i,
      this.success("Removed Item")
    );
  };
  //Hàm render từng Instrument Item
  _renderItem = (i) => {
    return <InstrumentItem instrument={i} onDelete={this._onDeleteItem} />;
  };
  //Render Div cuối để add
  _renderAddItem = () => {
    return (
      <AddNewItem
        title="Add new Instrument"
        onClick={this._onClickAddNewInstrumentButton}
      />
    );
  };
  //Group Instrument theo Assigned
  _renderGroupInstrument = (condition) => {
    let arr = this.props.instrument.instrumentList.filter(
      (i) => i.isAssigned === condition
    );
    return (
      <ListComponent
        dataList={arr}
        renderItem={(item) => this._renderItem(item)}
        renderAddItem={!condition ? this._renderAddItem() : null}
      />
    );
  };
  consumerContent() {
    return (
      <>
        <I3Div margin={["no", "md", "md", "md"]}>
          <I3Component variant="h5">Not Assigned</I3Component>
          {this._renderGroupInstrument(false)}
        </I3Div>
        <I3Div margin="md">
          <I3Component variant="h5">Assigned</I3Component>
          {this._renderGroupInstrument(true)}
        </I3Div>
      </>
    );
  }
}
Instrument.protoTypes = {
  instrument: PropTypes.object.isRequired,
};
