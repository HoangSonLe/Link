import React, { Fragment } from 'react'
import BaseConsumer from 'BaseComponent/BaseConsumer';
import { withStyles } from "@material-ui/core";
import { GridContainer, GridItem, BaseCheckboxItem, I3Icon, I3Div, I3Component } from '../importer';
import { getColorFromName } from 'general/CleanNodeHelper';
import PropTypes from 'prop-types';

class Item extends BaseConsumer {

    // _renderImage = () => {
    //     return (
    //         <img src="http://link2.i3solution.net.au/dist/Contents/img/lis/lan-icon.png" />
    //     );
    // }
    // _renderLeftHeader = () => {
    //     return (
    //         <h4>ncjdsjkjjk</h4>
    //     )
    // }
    // _renderRightHeader = () => {
    //     return <BaseCheckboxItem className={classes.CheckBox} label={"dcjds"} checked={true} isMulti={true} />
    // }
    // _renderLeftFooter = () => {
    //     return (
    //         <I3Div className={classes.HeadStart + " " + classes.DetroyPaddingRight + " " + classes.DetroyPaddingLeft} >
    //             <I3Icon className="far fa-circle" fontSize="h1" color="lightGreen" />
    //             <span>Active</span>
    //         </I3Div>
    //     )
    // }
    // _renderRightFooter = () => {
    //     return (
    //         <Fragment>
    //             <I3Icon className="fas fa-cogs" fontSize="h1" color="blue" margin={["xs", "xs", "xs", "xs"]} />
    //             <I3Icon className="fas fa-pen" fontSize="h1" color="blue" margin={["xs", "xs", "xs", "xs"]} />
    //             <I3Icon className="far fa-trash-alt" fontSize="h1" color="blue" margin={["xs", "xs", "xs", "xs"]} />
    //         </Fragment>
    //     )
    // }
    consumerContent() {
        // debugger
        // let { classes, rightFooter, rightHeader, leftHeader, leftFooter, image } = this.props;
        let { classes, header, rightFooter, isActive, image } = this.props;
        let leftFooter = () => ({

        })
        return (
            <GridContainer className={classes.DivContainer}>
                <GridItem xs={4} sm={4} xs={4} className={classes.DivImg + " " + classes.DetroyPadding}>
                    {image}
                </GridItem>
                <GridItem xs={8} sm={8} xs={8} className={classes.DetroyPadding}>
                    <GridContainer className={classes.RightTopDiv}>
                        <GridItem xs={8} sm={8} xs={8} className={classes.HeadStart + " " + classes.DetroyPaddingRight}>
                            <I3Component variant="caption" margin={"xs"}>{header}</I3Component>
                        </GridItem>
                        <GridItem xs={4} sm={4} xs={4} className={classes.HeadEnd + " " + classes.DetroyPadding}>
                            <BaseCheckboxItem className={classes.CheckBox} label="Mirror" checked={true} />
                        </GridItem>
                    </GridContainer>
                    <GridContainer className={classes.RightBottomDiv}>
                        <GridItem xs={4} sm={4} xs={4}>
                            <I3Div className={classes.HeadStart + " " + classes.DetroyPadding} >
                                <I3Icon
                                    className={isActive ? "far fa-circle" : "fas fa-circle"}
                                    fontSize="caption" color={isActive ? "lightGreen" : "danger"}
                                    margin={["no", "xs", "no", "no"]} />
                                <I3Component variant="caption" component="span">{isActive ? "Active" : "Inactive"}</I3Component>
                            </I3Div>
                        </GridItem>
                        <GridItem xs={8} sm={8} xs={8}>
                            <I3Div className={classes.HeadEnd + " " + classes.DetroyPadding} >
                                {rightFooter}
                            </I3Div>
                        </GridItem>
                    </GridContainer>
                </GridItem>
            </GridContainer>
        )
    }
}
let color = getColorFromName("white");

const Styles = {
    CheckBox: {
        "& .MuiSvgIcon-root": {
            fontSize: "25px"
        }
    },
    DetroyPadding: {
        padding: "0 !important"
    },
    DetroyPaddingRight: {
        paddingRight: "0 !important"
    },
    RightTopDiv: {
        height: "50%",
        borderBottom: "1px solid grey",
        margin: "0 !important",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    RightBottomDiv: {
        height: "50%",
        margin: "0 !important",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    HeadStart: {
        display: "flex",
        fontSize: "14px",
        alignItems: "center",
        justifyContent: "flex-start",
        fontWeight: 600
    },
    HeadEnd: {
        display: "flex",
        fontSize: "14px",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingRight: "10px"
    },

    DivContainer: {
        width: "300px",
        border: "solid 1px #bfcad3",
        height: "82px",
        boxShadow: " 0 2px 5px 0 rgba(0, 0, 0, 0.3)",
        backgroundColor: "#ffffff"
    },
    DivImg: {
        height: "82px",
        display: "flex",
        alignItems: "center",
        borderRight: "solid 1px #bfcad3",
        justifyContent: "center"
    },

}
Item.protoTypes = {
    rightFooter: PropTypes.func,

}
export default withStyles(Styles)(Item);
