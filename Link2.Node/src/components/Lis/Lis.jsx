import React from "react";
import BaseConsumer from "BaseComponent/BaseConsumer";
import { withStyles } from "@material-ui/core";
import { I3Div, I3Icon, IconButtonGroup, Item, LastDivItem, GridContainer, GridItem, ListComponent, BaseModal, BaseButton, I3CheckboxItem } from "../../importer";
import CloneLisDetail from "./CloneLisDetail";
import { EModalType } from "../../general/enum";

class Lis extends BaseConsumer {
  componentDidMount() {
    this.ajaxGet({
      url: "/api/link/getlissystems",
      success: (ack) => {
        console.log(ack.data);
        this.updateObject(this.props.lis, { lisList: ack.data });
        // this.ajaxGet({
        //   url: "/api/link/GetDefaultLis",
        //   success: (ack) => {
        //     this.updateObject(this.props.lis, { newLis: ack.data });
        //   },
        // });
      },
    });
  }
  _openModal = (title, item) => {
    this.openModal(
      () => ({
        title: title,
        body: (
          <BaseModal
            hasFooter={true}
            modalBody={
              <CloneLisDetail
                lis={item}
              />
            }
            rightFooter={<BaseButton width="110px">Save</BaseButton>}

          ></BaseModal>
        ),
      }),
      EModalType.Right,
      true
    );
  }
  _deleteItem = (e) => {
    this.confirm(
      "Delete this LIS system?",
      {
        cancel: {
          title: "Cancle", // text hiển thị trên nút cancel 
          handle: () => {
            // hành động thực hiện sau khi nhấn nút cancel
          }
        },
        okay: {
          title: "Delete", // text hiển thị trên nút oke 
          handle: () => {
            this.ajaxGet({
              url: "/api/link/getlissystems",
              success: ack => {
                this.removeElement(this.props.lis.lisList, e,
                  this.success("Removed Item !")
                )
              }

            })
          }
        }

      }
    )
  }
  _renderImage = (e) => {
    return (
      <img src="http://link2.i3solution.net.au/dist/Contents/img/lis/lan-icon.png" />
    );
  }

  _renderRightFooter = (e) => {
    return (
      <IconButtonGroup
        components={[
          {
            className: "fas fa-cogs",
            onClick: ""
          },
          {
            className: "fas fa-pen",
            onClick: () => (this._openModal("Edit Lis", e))
          },
          {
            className: "far fa-trash-alt",
            onClick: () => (this._deleteItem(e))
          }
        ]}
      />
    )
  }
  _renderItem = (e) => {
    return (
      <Item
        key={e.id}
        header={e.name}
        isActive={e.isActive}
        rightFooter={this._renderRightFooter(e)}
        image={this._renderImage(e)}
      ></Item>
    );
  }
  _renderAddItem = () => {
    return <LastDivItem title="Add new Lis" onClick={() => this._openModal("New Lis", this.props.lis.newLis)} />
  }
  _
  consumerContent() {
    let { lis } = this.props;
    console.log("lis", lis);
    if (!lis.lisList || lis.lisList.length <= 0) {
      return null;
    }
    return (
      <>
        <ListComponent dataList={lis.lisList} renderItem={item => this._renderItem(item)} renderAddItem={this._renderAddItem()} />
      </>
    );
  }
}
const Styles = {};
export default withStyles(Styles)(Lis);
