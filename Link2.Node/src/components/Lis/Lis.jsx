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
        this.updateObject(this.props, { lis: { lisList: ack.data } });
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
            leftFooter={
              <BaseButton variant="outlined" width="110px">
                Cancle
              </BaseButton>
            }
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
            // hành động thực hiện sau khi nhấn nút oke
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
  _renderRightHeader = () => {
    return <I3CheckboxItem label={"dcjds"} checked={true} isMulti={true} />
  }
  _renderLeftFooter = () => {
    return (
      <I3Div className={classes.HeadStart + " " + classes.DetroyPaddingRight + " " + classes.DetroyPaddingLeft} >
        <I3Icon className="far fa-circle" fontSize="h1" color="lightGreen" />
        <span>Active</span>
      </I3Div>
    )
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
  _renderContent = () => {
    let { data } = this.props;
    let res = data.lisList.map((e) => {
      return (
        // <GridItem xs={12} sm={6} md={4} lg={3} key={e.id}>
        <Item
          key={e.id}
          header={e.name}
          isActive={false}
          canDelete={e.canDelete}
          rightFooter={this._renderRightFooter(e)}
          image={this._renderImage(e)}
        ></Item>
        // </GridItem>
      );
    });
    return (
      <GridContainer>
        {res}
        {/* <GridItem xs={12} sm={6} md={4} lg={3}> */}
        <LastDivItem title="Add new Lis" onClick={() => this._openModal("New Lis", data.newLis)} />
        {/* </GridItem> */}
      </GridContainer>
    )
  }
  consumerContent() {
    let { data } = this.props;
    console.log("ca", data);
    if (data === null) {
      return null;
    }
    return (
      <>
        {
          !data.lis ?
            <ListComponent margin={["xs", "no", "xs", "no"]} title={"Instrument"} components={this._renderContent()} />
            : null
        }
      </>
    );
  }
}
const Styles = {};
export default withStyles(Styles)(Lis);
