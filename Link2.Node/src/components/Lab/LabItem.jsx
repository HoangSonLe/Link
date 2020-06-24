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

class LabItem extends BaseConsumer {
  //Mở modal theo type thêm Instrument,LIS hoặc sửa Lab Detail
  //Có 2 dạng mở modal: Mở để thêm item và mở để sửa item
  _openModal = (title, type) => {
    let { lab, onDelete } = this.props;
    let body = "";
    switch (type) {
      case LabTypeModal.Instrument:
        body = (
          <AddItemLabModal
            onSave={(newItems) =>
              this._onAddItemInLab(LabTypeModal.Instrument, newItems)
            }
            lab={lab}
            typeAdd={LabTypeModal.Instrument}
          />
        );
        break;
      case LabTypeModal.Lis:
        body = (
          <AddItemLabModal
            onSave={(newItems) =>
              this._onAddItemInLab(LabTypeModal.Lis, newItems)
            }
            lab={lab}
            typeAdd={LabTypeModal.Lis}
          />
        );
        break;
      default:
        body = (
          <CloneLabDetailModal onDelete={onDelete} data={this.props.lab} />
        );
    }
    this.openModal(
      () => ({
        title: title,
        body: body,
      }),
      EModalType.Right,
      true
    );
  };
  //Add Item to Lab
  //Có 2 trường hợp thêm Lis và thêm Instrument vào Lab
  _onAddItemInLab = (type, newItems) => {
    let { lab } = this.props;
    let url = "";
    let oldItem = null;
    type == LabTypeModal.Lis
      ? ((url = "/api/link/AddLisSystemToLab?id=" + lab.id),
        (oldItem = lab.lisInRouters))
      : ((url = "/api/link/AddInstrumentToLab?id=" + lab.id),
        (oldItem = lab.lisInstruments));
    oldItem == null
      ? null
      : this.ajaxPost({
          url: url,
          data: newItems,
          success: (ack) => {
            this.clearListAndPushNewItems(oldItem, ack.data, () => {
              this.success("Added new items");
            });
          },
          error: (ack) => {
            for (let i of ack.ErrorMessage) {
              this.error(i);
            }
          },
        });
  };
  //Removed Item in Lab
  //Có 2 trường hợp xóa Lis và xóa Instrument vào Lab

  _onDeleteItemInLab = (type, i) => {
    let { lab } = this.props;
    let url = "";
    let oldItem = null;
    type == LabTypeModal.Lis
      ? ((url =
          "/api/link/DeleteLisInLab?idLab=" + lab.id + "&idLis=" + i.lisId),
        (oldItem = lab.lisInRouters))
      : ((url =
          "/api/link/DeleteInstrumentInLab?idLab=" +
          lab.id +
          "&idInstrument=" +
          i.id),
        (oldItem = lab.lisInstruments));
    //check oldItem
    oldItem == null
      ? null
      : this.ajaxPost({
          url: url,
          success: (ack) => {
            this.removeElement(oldItem, i, this.success("Removed Item"));
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
        onDelete={() => this._onDeleteItemInLab(LabTypeModal.Instrument, i)}
      />
    ) : (
      <LisItem
        key={i.id}
        lab={this.props.lab}
        onDelete={() => this._onDeleteItemInLab(LabTypeModal.Lis, i)}
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
                onClick={() =>
                  this._openModal("Add Instrument", LabTypeModal.Instrument)
                }
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
                onClick={() => this._openModal("Add Lis", LabTypeModal.Lis)}
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
