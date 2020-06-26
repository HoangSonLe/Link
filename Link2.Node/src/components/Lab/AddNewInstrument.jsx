import React from "react";
import { BaseConsumer } from "../../importer";
import InstrumentItem from "../Instrument/InstrumentItem";
import AddItemLabModal from "./AddItemLabModal";
import PropTypes from "prop-types";

export default class AddNewInstrument extends BaseConsumer {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    this.ajaxGet({
      url: "/api/link/GetInstrumentsForLab",
      success: (ack) => {
        let data = ack.data.map((i) => ({
          ...i,
          isSelected: false,
          isHidden: false,
        }));
        this.updateLocalObject(this.state, {
          data: data,
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
  //Nếu true thì isHidden=true và ngược lại
  _onSearchInstrument = (textSearch) => {
    let { data } = this.state;
    if (textSearch != "") {
      data.forEach((i) =>
        i.name.toUpperCase().includes(textSearch.toUpperCase()) ||
        i.serialNumber.toUpperCase().includes(textSearch.toUpperCase())
          ? (i.isHidden = false)
          : (i.isHidden = true)
      );
    } else {
      data.forEach((i) => (i.isHidden = false));
    }

    this.updateLocalListObject(this.state.data, data);
  };
  //Hàm add instrument vào lab

  _onSave = () => {
    let { lab, onSave } = this.props;
    let newItems = this.state.data.map((i) => {
      return i.isSelected == true ? i.id : null;
    });
    this.ajaxPost({
      url: "/api/link/AddInstrumentToLab",
      data: {
        LabId: lab.id,
        ListItemsId: newItems,
      },
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
    let { data } = this.state;
    let { ...otherProps } = this.props;
    return (
      <AddItemLabModal
        placeholderSearch="Search by name, searial number"
        onAddSelectedItem={this._addSelectedItem}
        onSearch={this._onSearchInstrument}
        onSaveSelectedItem={this._onSave}
        dataList={data}
        renderItem={(i) => <InstrumentItem instrument={i} isInLab={true} />}
        {...otherProps}
      />
    );
  }
}
AddNewInstrument.propTypes = {
  onSave: PropTypes.func,
  lab: PropTypes.object.isRequired,
};
