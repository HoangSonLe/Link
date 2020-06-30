import React from "react";
import { BaseConsumer } from "../../importer";
import AddItemLabModal from "./AddItemLabModal";
import LisSystemItem from "../Lis/LisSystemItem";
import PropTypes from "prop-types";

export default class AddNewLis extends BaseConsumer {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    this.ajaxGet({
      url: `/api/link/GetLisSystemForLab?idLab=${this.props.lab.id}`,
      success: (ack) => {
        this.clearLocalListAndPushNewItems(this.state.data, ack.data);
      },
    });
  }

  //Hàm Search
  _onSearchLis = (i, textSearch) => {
    return i.name.toUpperCase().includes(textSearch.toUpperCase());
  };
  //Hàm Add vào lab
  _onSave = (newItems) => {
    let { lab, onSave } = this.props;
    this.ajaxPost({
      url: "/api/link/AddLisSystemToLab",
      data: {
        LabId: lab.id,
        ListItems: newItems,
      },
      success: (ack) => {
        onSave(lab.lisInRouters, ack.data);
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
        placeholderSearch="Search by name"
        onSearch={this._onSearchLis}
        onSaveSelectedItem={this._onSave}
        dataList={data}
        renderItem={(i) => <LisSystemItem lisSystem={i} isInLab={true} />}
        {...otherProps}
      />
    );
  }
}
AddNewLis.protoTypes = {
  onSave: PropTypes.func,
  lab: PropTypes.object.isRequired,
};
