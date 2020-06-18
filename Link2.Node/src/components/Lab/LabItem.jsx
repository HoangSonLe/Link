import React from "react";
import BaseConsumer from "BaseComponent/BaseConsumer";
import { withStyles } from "@material-ui/core";
import { I3Div, I3Icon, IconButtonGroup, Item, LastDivItem, GridContainer, GridItem, ListComponent, BaseModal, BaseButton, I3Component, BaseCheckboxItem } from "../../importer";
import { EModalType } from "../../general/enum";
import DevidedComponents from "../../base-components/DevidedComponents";

class LabItem extends BaseConsumer {
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
                                onClick: () => this.removeElement(this.props.lab.lisInstruments, e, this.success("Removed Item"))
                            }
                        ]}
                    />}
                image={<img src="http://link2.i3solution.net.au/dist/Contents/img/lis/lan-icon.png" />}
            ></Item>
        );
    }
    _renderLis = (e) => {
        return (
            <Item
                key={e.id}
                header={e.lisSystem.name}
                isActive={e.lisSystem.isActive}
                rightHeader={<BaseCheckboxItem label={"Mirror"} checked={e.isMirror} isMulti={true} />}
                rightFooter={
                    <IconButtonGroup
                        components={[
                            {
                                className: "far fa-trash-alt",
                                onClick: () => this.removeElement(this.props.lab.lisInRouters, e, this.success("Removed Item"))
                            }
                        ]}
                    />}
                image={<img src="http://link2.i3solution.net.au/dist/Contents/img/lis/lan-icon.png" />}
            ></Item>
        );
    }
    consumerContent() {
        let { classes, lab } = this.props;
        return (
            <I3Div margin={"md"}>
                <DevidedComponents
                    components={[
                        <I3Component variant="h5" className={classes.Div}>{lab.name}</I3Component>,
                        <I3Component variant="h6" fontWeight="lighter" className={classes.Div}>
                            Priority: {lab.priority}
                        </I3Component>,
                        <I3Component variant="subtitle1" className={classes.Div}>
                            {lab.lisInstruments.length} instruments, {lab.lisInRouters.length} LIS, + {lab.lisInRouters.filter(i => i.isMirror).length} mirror
                        </I3Component>,
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
                        renderAddItem={<LastDivItem title="Add Instrument" onClick={() => alert("hi")} />} />
                    <ListComponent
                        title="LIS"
                        dataList={lab.lisInRouters}
                        renderItem={item => this._renderLis(item)}
                        renderAddItem={<LastDivItem title="Add Lis" onClick={() => alert("hi")} />} />
                </I3Div>
            </I3Div>
        )
    }
}
const Styles = {
    Div: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"

    },
    CheckBox: {
        "& .MuiSvgIcon-root": {
            fontSize: "25px"
        }
    }

};
export default withStyles(Styles)(LabItem);
