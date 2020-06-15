import React from 'react'
import BaseConsumer from 'BaseComponent/BaseConsumer';
import { withStyles } from "@material-ui/core";
import { I3Component, I3Div } from '../../importer';
import DevidedComponents from '../../base-components/DevidedComponents';

class LabList extends BaseConsumer {
    consumerContent() {
        let { classes } = this.props;
        return (
            <I3Component margin={["md", "md", "md", "md"]}>
                <DevidedComponents
                    components={[
                        <I3Component variant="h5" className={classes.Div}>Lab Vall</I3Component>,
                        <I3Component variant="h6" fontWeight="lighter" className={classes.Div}>Priority: 1</I3Component>,
                        <I3Component variant="subtitle1" className={classes.Div}>6 instruments, 10 LIS, + 1 mirror</I3Component>
                    ]}
                    deviderHeight="h6"
                    deviderWidth="default"
                    deviderColor="lightGray"
                    deviderMargin={["no", "md", "no", "md"]}
                />
                <I3Div margin={["xs", "no", "xs", "no"]}>

                </I3Div>
            </I3Component>
        )
    }
}
const Styles = {
    Div: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}
export default withStyles(Styles)(LabList);
