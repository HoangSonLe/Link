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
  _onSearchLis = (textSearch) => {
    let { data } = this.state;
    if (textSearch != "") {
      data.forEach((i) =>
        i.name.toUpperCase().includes(textSearch.toUpperCase())
          ? (i.isHidden = false)
          : (i.isHidden = true)
      );
    } else {
      data.forEach((i) => (i.isHidden = false));
    }

    this.updateLocalListObject(this.state.data, data);
  };
  //Hàm Add vào lab
  _onSave = () => {
    let { lab, onSave } = this.props;
    let newItems = this.state.data.map((i) => {
      return i.isSelected == true ? i.id : null;
    });
    this.ajaxPost({
      url: "/api/link/AddLisSystemToLab",
      data: {
        LabId: lab.id,
        ListItemsId: newItems,
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
        onAddSelectedItem={this._addSelectedItem}
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
