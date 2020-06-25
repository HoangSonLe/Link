import React from "react";
import { BaseConsumer } from "../../importer";
import InstrumentItem from "../Instrument/InstrumentItem";
import AddItemLabModal from "./AddItemLabModal";
export default class AddNewInstrument extends BaseConsumer {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataFilter: [],
    };
  }
  componentDidMount() {
    this.ajaxGet({
      url: "/api/link/GetInstrumentsForLab",
      success: (ack) => {
        let data = ack.data.map((i) => ({ ...i, isSelected: false }));
        this.updateLocalObject(this.state, {
          data: data,
          dataFilter: data,
        });
      },
    });
  }
  //Thêm sản phẩm vào ds chọn
  _addSelectedItem = (i) => {
    let { data } = this.state;
    let indexItem = data.findIndex((e) => e.id == i.id);
    this.updateLocalObject(data[indexItem], {
      isSelected: !data[indexItem].isSelected,
    });
  };
  //Hàm Search
  _onSearchInstrument = (textSearch) => {
    debugger;
    let { data } = this.state;
    let dataFilter =
      textSearch == ""
        ? data
        : data.filter(
            (i) =>
              i.name.toUpperCase().match(textSearch.toUpperCase()) ||
              i.serialNumber.toUpperCase().match(textSearch.toUpperCase())
          );
    this.updateLocalObject(this.state.dataFilter, dataFilter);
  };
  _onSave = () => {
    let { lab, onSave } = this.props;
    let newItems = this.state.data.map((i) => {
      return i.isSelected == true ? i.id : null;
    });
    this.ajaxPost({
      url: "/api/link/AddInstrumentToLab?id=" + lab.id,
      data: newItems,
      success: (ack) => {
        onSave(lab.lisInstruments, ack.data);
      },
      error: (ack) => {
        for (let i of ack.ErrorMessage) {
          this.error(i);
        }
      },
    });
  };
  consumerContent() {
    let { data, dataFilter } = this.state;
    let { ...otherProps } = this.props;
    return (
      <AddItemLabModal
        placeholderSearch="Search by name, searial number"
        onAddSelectedItem={this._addSelectedItem}
        onSearch={this._onSearchInstrument}
        onSave={this._onSave}
        dataList={data}
        renderItem={(i) => <InstrumentItem instrument={i} isInLab={true} />}
        {...otherProps}
      />
    );
  }
}
