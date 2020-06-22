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
  _openModal = (title, type) => {
    let { lab, onDelete } = this.props;
    let body = "";
    switch (type) {
      case LabTypeModal.AddInstrument:
        body = (
          <AddItemLabModal
            onSave={(newItems) => this._onAddInstrumentsInLab(newItems)}
            lab={lab}
            typeAdd={LabTypeModal.AddInstrument}
          />
        );
        break;
      case LabTypeModal.AddLis:
        body = (
          <AddItemLabModal
            onSave={(newItems) => this._onAddLisSystemsInLab(newItems)}
            lab={lab}
            typeAdd={LabTypeModal.AddLis}
          />
        );
        break;
      default:
        body = (
          <CloneLabDetailModal
            onDelete={onDelete}
            data={this.props.lab}
            onSave={(newItem) => this._onUpdateLab(newItem)}
          />
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
  _onUpdateLab = (newItem) => {
    let { lab } = this.props;
    console.log(newItem);
    this.ajaxPost({
      url: "/api/link/AddOrUpdateLab",
      data: newItem,
      success: (ack) => {
        this.updateObject(lab, newItem, () => this.success("Updated Item"));
      },
    });
  };
  _onAddInstrumentsInLab = (newItems) => {
    let { lab } = this.props;
    this.ajaxPost({
      url: "/api/link/AddInstrumentToLab?id=" + lab.id,
      data: newItems,
      success: (ack) => {
        this.clearListAndPushNewItems(lab.lisInstruments, ack.data, () => {
          console.log("ack", lab);
        });
      },
    });

    // this.updateObject(oldItem, newItem, () => this.success("Updated Item"));
  };
  _onDeleteInstrument = (i) => {
    let { lab } = this.props;
    this.ajaxPost({
      url:
        "/api/link/DeleteInstrumentInLab?idLab=" +
        lab.id +
        "&idInstrument=" +
        i.id,
      success: (ack) => {
        this.removeElement(lab.lisInstruments, i, this.success("Removed Item"));
      },
      error: (ack) => {
        this.error(ack.ErrorMessage);
      },
    });
  };
  _renderInstrument = (i) => {
    return (
      <InstrumentItem
        header={i.name}
        isActive={i.isActive}
        isInLab={true}
        instrument={i}
        canDelete={true}
        onDelete={this._onDeleteInstrument}
      />
    );
  };
  _onAddLisSystemsInLab = (newItems) => {
    let { lab } = this.props;
    this.ajaxPost({
      url: "/api/link/AddLisSystemToLab?id=" + lab.id,
      data: newItems,
      success: (ack) => {
        this.clearListAndPushNewItems(lab.lisInRouters, ack.data, () => {
          console.log("ack", lab);
        });
      },
    });
  };
  _onDeleteLis = (i) => {
    let { lab } = this.props;
    this.ajaxPost({
      url: "/api/link/DeleteLisInLab?idLab=" + lab.id + "&idLis=" + i.lisId,
      success: (ack) => {
        this.removeElement(lab.lisInRouters, i, this.success("Removed Item"));
      },
      error: (ack) => {
        this.error(ack.ErrorMessage);
      },
    });
  };
  _renderLis = (i) => {
    return (
      <LisItem
        key={i.id}
        header={i.lisSystem.name}
        isActive={i.lisSystem.isActive}
        onDelete={this._onDeleteLis}
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
          <ListComponent
            title="Intruments"
            dataList={lab.lisInstruments}
            renderItem={(item) => this._renderInstrument(item)}
            renderAddItem={
              <LastDivItem
                title="Add Instrument"
                onClick={() =>
                  this._openModal("Add Instrument", LabTypeModal.AddInstrument)
                }
              />
            }
          />
          <ListComponent
            title="LIS"
            dataList={lab.lisInRouters}
            renderItem={(item) => this._renderLis(item)}
            renderAddItem={
              <LastDivItem
                title="Add Lis"
                onClick={() => this._openModal("Add Lis", LabTypeModal.AddLis)}
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
  onUpdateLab: PropTypes.func,
  lab: PropTypes.object.isRequired,
};

export default withStyles(Styles)(LabItem);
