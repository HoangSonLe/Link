import React from 'react'
import BaseConsumer from 'BaseComponent/BaseConsumer';
import { withStyles } from "@material-ui/core";
import { I3Component, I3Div, I3Icon } from '../../importer';
import DevidedComponents from '../../base-components/DevidedComponents';

class LabList extends BaseConsumer {
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
                        modalBody={<h1>cdscdscds</h1>
                        }
                        rightFooter={<BaseButton width="110px">Save</BaseButton>}

                    ></BaseModal>
                ),
            }),
            EModalType.Right,
            true
        );
    }
    consumerContent() {
        let { classes } = this.props;
        return (
            <I3Div margin={["md", "md", "md", "md"]}>
                <DevidedComponents
                    components={[
                        <I3Component variant="h5" className={classes.Div}>Lab Vall</I3Component>,
                        <I3Component variant="h6" fontWeight="lighter" className={classes.Div}>Priority: 1</I3Component>,
                        <I3Component variant="subtitle1" className={classes.Div}>6 instruments, 10 LIS, + 1 mirror</I3Component>,
                        <I3Div onClick={this._openModal} variant="h6" cursor="pointer" color="blue" >
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
}
export default withStyles(Styles)(LabList);
