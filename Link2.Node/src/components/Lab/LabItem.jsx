import React from "react";
import BaseConsumer from "BaseComponent/BaseConsumer";
import { withStyles } from "@material-ui/core";
import { I3Div, I3Icon, IconButtonGroup, Item, LastDivItem, GridContainer, GridItem, ListComponent, BaseModal, BaseButton, I3Component } from "../../importer";
import { EModalType } from "../../general/enum";

class LabItem extends BaseConsumer {
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
                        this.removeElement(this.props.instrument.instrumentList, e, this.success("Removed Item"))
                    }
                }

            }
        )
    }
    _renderInstrument = (e) => {
        return (
            <Item
                key={e.id}
                header={e.name}
                isActive={e.isActive}
                rightHeader={<I3Component variant="caption" margin={"xs"}>{e.serialNumber}</I3Component>}
                rightFooter={
                    <IconButtonGroup
                        components={[
                            {
                                className: "far fa-trash-alt",
                                onClick: () => (this._deleteItem(e))
                            }
                        ]}
                    />}
                image={<img src="http://link2.i3solution.net.au/dist/Contents/img/lis/lan-icon.png" />}
            ></Item>
        );
    }
    consumerContent() {
        let { lab } = this.props;
        if (lab) {
            return null;
        }
        return (
            <I3Div margin={["md", "md", "md", "md"]}>
                <DevidedComponents
                    components={[
                        <I3Component variant="h5" className={classes.Div}>Lab Vall</I3Component>,
                        <I3Component variant="h6" fontWeight="lighter" className={classes.Div}>Priority: 1</I3Component>,
                        <I3Component variant="subtitle1" className={classes.Div}>6 instruments, 10 LIS, + 1 mirror</I3Component>,
                        <I3Div onClick={() => { }} variant="h6" cursor="pointer" color="blue" >
                            <I3Icon className="fas fa-pen" fontSize="subtitle1" margin="xs" color="blue" />
                            <span>Edit Lab</span>
                        </I3Div>
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
                        renderItem={item => this._renderInstrument(item)}
                        renderAddItem={<LastDivItem title="Add Instrument" onClick={alert("hi")} />} />
                </I3Div>
            </I3Div>
        )
    }
}
const Styles = {

};
export default withStyles(Styles)(LabItem);
