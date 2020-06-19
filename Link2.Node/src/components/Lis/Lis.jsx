import React from "react";
import BaseConsumer from "BaseComponent/BaseConsumer";
import { withStyles } from "@material-ui/core";
import { LastDivItem, ListComponent } from "../../importer";
import { EModalType } from "../../general/enum";
import LisSystemItem from "./LisSystemItem";
import CloneLisDetailModal from "./CloneLisDetailModal";

class Lis extends BaseConsumer {
  componentDidMount() {
    this.ajaxGet({
      url: "/api/link/GetLisSystems",
      success: (ack) => {
        this.updateObject(this.props.lis, { lisList: ack.data });
      },
    });
  }
  _openModal = (title, item) => {
    this.openModal(
      () => ({
        title: title,
        body:
          <CloneLisDetailModal
            onSave={newItem => isAdd ? this._onAddItem(newItem) : this._onUpdateItem(item, newItem)}
            data={this.props.lis.newLis}
          />
        ,
      }),
      EModalType.Right,
      true
    )
  }
  _onDeleteItem = (i) => {
    this.removeElement(this.props.lis.lisList, i, this.success("Removed Item"))

  }
  _onUpdateItem = (oldItem, newItem) => {
    this.updateObject(oldItem, newItem, () => this.success("Updated Item"))

  }
  _renderItem = (i) => {
    return (
      <LisSystemItem
        key={i.id}
        header={i.name}
        isActive={i.isActive}
        lisSystem={i}
        onDelete={this._onDeleteItem}
        onUpdate={this._onUpdateItem}
      />
    );
  }
  _renderAddItem = () => {
    return <LastDivItem title="Add new Lis" onClick={() => this._openModal("New Lis", this.props.lis.newLis)} />
  }
  _
  consumerContent() {
    let { lis } = this.props;

    if (!lis.lisList || lis.lisList.length <= 0) {
      return null;
    }
    return (
      <ListComponent
        margin={["no", "md", "md", "md"]}
        dataList={lis.lisList}
        renderItem={item => this._renderItem(item)}
        renderAddItem={this._renderAddItem()}
      />
    );
  }
}
const Styles = {};
export default withStyles(Styles)(Lis);
