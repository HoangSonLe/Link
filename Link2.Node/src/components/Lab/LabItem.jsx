import React from "react";
import BaseConsumer from "BaseComponent/BaseConsumer";
import { withStyles } from "@material-ui/core";
import {
  I3Div,
  I3Icon,
  LastDivItem,
  ListComponent,
  I3Component,
} from "../../importer";
import { EModalType, LabTypeModal } from "../../general/enum";
import DevidedComponents from "../../base-components/DevidedComponents";
import LisItem from "./LisItem";
import InstrumentItem from "../Instrument/InstrumentItem";
import PropTypes from "prop-types";
import CloneLabDetailModal from "./CloneLabDetailModal";
import AddItemLabModal from "./AddItemLabModal";
import LisSystemItem from "../Lis/LisSystemItem";
import AddNewInstrument from "./AddNewInstrument";
import AddNewLis from "./AddNewLis";

class LabItem extends BaseConsumer {
  //Mở modal theo type thêm Instrument,LIS hoặc sửa Lab Detail
  //Có 2 dạng mở modal: Mở để thêm item và mở để sửa item
  _openModal = (title) => {
    let { lab, onDelete } = this.props;
    this.openModal(
      () => ({
        title: title,
        body: <CloneLabDetailModal onDelete={onDelete} data={this.props.lab} />,
      }),
      EModalType.Right,
      true
    );
  };
  //Nhấn Create new Instrument, call vào hàm của AddNewInstrument
  _onClickAddInstrumentButton = (onDataLoaded) => {
    let modalFunc = () => ({
      title: "Add Instrument",
      body: (
        <AddNewInstrument lab={this.props.lab} onSave={this._onAddItemInLab} />
      ),
    });
    onDataLoaded(modalFunc);
  };
  //Nhấn Create new LIS, call vào hàm của AddNewLis

  _onClickAddLisButton = (onDataLoaded) => {
    let modalFunc = () => ({
      title: "Add Lis",
      body: <AddNewLis lab={this.props.lab} onSave={this._onAddItemInLab} />,
    });
    onDataLoaded(modalFunc);
  };

  //Add Item to Lab
  //Có 2 trường hợp thêm Lis và thêm Instrument vào Lab
  _onAddItemInLab = (oldItem, newItems) => {
    this.clearListAndPushNewItems(oldItem, newItems, () => {
      this.success("Added new items");
    });
  };

  //Removed Item in Lab
  //Có 2 trường hợp xóa Lis và xóa Instrument vào Lab
  _onDeleteLisInLab = (i) => {
    let { lab } = this.props;

    this.ajaxPost({
      url: `/api/link/DeleteLisInLab?idLab=+${lab.id}&idLis=${i.lisId}`,
      success: (ack) => {
        this.removeElement(lab.lisInRouters, i, this.success("Removed Item"));
      },
      error: (ack) => {
        for (let i of ack.ErrorMessage) {
          this.error(i);
        }
      },
    });
  };
  _onDeleteInstrumentInLab = (i) => {
    let { lab } = this.props;

    this.ajaxPost({
      url: `/api/link/DeleteLisInLab?idLab=+${lab.id}&idInstrument=${i.lisId}`,
      success: (ack) => {
        this.removeElement(lab.lisInstruments, i, this.success("Removed Item"));
      },
      error: (ack) => {
        for (let i of ack.ErrorMessage) {
          this.error(i);
        }
      },
    });
  };
  //Render Lis or Instrument
  _renderContent = (type, i) => {
    return type == LabTypeModal.Instrument ? (
      <InstrumentItem
        isInLab={true}
        instrument={i}
        onDelete={() => this._onDeleteInstrumentInLab(i)}
      />
    ) : (
      <LisItem
        key={i.id}
        lab={this.props.lab}
        onDelete={() => this._onDeleteLisInLab(i)}
        lis={i}
      />
    );
  };

  consumerContent() {
    let { classes, lab } = this.props;
    return (
      <I3Div margin={"md"}>
        <DevidedComponents
          components={[
            <I3Component variant="h5" className={classes.Div}>
              {lab.name}
            </I3Component>,
            <I3Component
              variant="h6"
              fontWeight="lighter"
              className={classes.Div}
            >
              Priority: {lab.priority}
            </I3Component>,
            <I3Component variant="subtitle1" className={classes.Div}>
              {lab.lisInstruments ? lab.lisInstruments.length : 0} instruments,
              {lab.lisInRouters ? lab.lisInRouters.length : 0} LIS, +
              {lab.lisInRouters
                ? lab.lisInRouters.filter((i) => i.isMirror).length
                : 0}{" "}
              mirror
            </I3Component>,
            <I3Div
              onClick={() => this._openModal("Edit Lab")}
              variant="h6"
              cursor="pointer"
              color="blue"
            >
              <I3Icon
                className="fas fa-pen"
                fontSize="subtitle1"
                margin="xs"
                color="blue"
              />
              <span>Edit Lab</span>
            </I3Div>,
          ]}
          deviderHeight="h6"
          deviderWidth="default"
          deviderColor="lightGray"
          deviderMargin={["no", "md", "no", "md"]}
        />
        <I3Div margin={["xs", "no", "xs", "no"]}>
          {/* Render Instrument */}
          <ListComponent
            title="Intruments"
            dataList={lab.lisInstruments}
            renderItem={(item) =>
              this._renderContent(LabTypeModal.Instrument, item)
            }
            renderAddItem={
              <LastDivItem
                title="Add Instrument"
                onClick={this._onClickAddInstrumentButton}
              />
            }
          />
          {/* Render LIS */}
          <ListComponent
            title="LIS"
            dataList={lab.lisInRouters}
            renderItem={(item) => this._renderContent(LabTypeModal.Lis, item)}
            renderAddItem={
              <LastDivItem
                title="Add Lis"
                onClick={this._onClickAddLisButton}
              />
            }
          />
        </I3Div>
      </I3Div>
    );
  }
}
const Styles = {
  Div: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  CheckBox: {
    "& .MuiSvgIcon-root": {
      fontSize: "25px",
    },
  },
};
LabItem.protoTypes = {
  onDelete: PropTypes.func,
  lab: PropTypes.object.isRequired,
};

export default withStyles(Styles)(LabItem);
