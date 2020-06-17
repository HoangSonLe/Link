import { withStyles } from '@material-ui/core';
import BaseConsumer from 'BaseComponent/BaseConsumer';
import React, { Fragment } from 'react';
import { EModalType } from '../general/enum';
import { I3Div, BaseButton } from '../importer';

class ModalFooter extends BaseConsumer {
    constructor(props) {
        super(props);
    }
    consumerContent() {
        const { classes, rightFooter, leftFooter, type } = this.props;
        let padding;
        if (type == EModalType.Right) {
            padding = ["lg2", "lg2", "lg2", "lg2"];
        } else {
            padding = ["no", "lg4", "no", "lg4"]
        }
        return (
            <Fragment>
                <I3Div borderColor="lighterGray" border={[true, false, false, false]} padding={padding} height="72px" display="flex" alignItems="center">
                    <I3Div
                        flexGrow="1"
                        display="flex"
                        alignItems="center"
                        justifyContent="flex-start"
                    >
                        {leftFooter}
                    </I3Div>
                    <I3Div
                        flexGrow="1"
                        display="flex"
                        alignItems="center"
                        justifyContent="flex-end"
                    >
                        {rightFooter}
                    </I3Div>
                </I3Div>
            </Fragment>
        )
    };
}

export default withStyles({

})(ModalFooter)