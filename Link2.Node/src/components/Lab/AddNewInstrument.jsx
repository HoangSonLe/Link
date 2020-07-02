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
        this.clearLocalListAndPushNewItems(this.state.data, ack.data);
      },
    });
  }

  //Hàm Search
  _onSearchInstrument = (i, textSearch) => {
    return (
      i.name.toUpperCase().includes(textSearch.toUpperCase()) ||
      i.serialNumber.toUpperCase().includes(textSearch.toUpperCase())
    );
  };

  _onSave = (newItems) => {
    let { lab, onSave } = this.props;
    // let {data} = this.state;
    // let postData = [];
    debugger;
    this.ajaxPost({
      url: "/api/link/AddInstrumentToLab",
      data: {
        LabId: lab.id,
        ListItems: newItems,
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
        onSearch={this._onSearchInstrument}
        onSaveSelectedItem={this._onSave}
        keyIndentify="id"
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
