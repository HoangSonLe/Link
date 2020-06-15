import React from 'react'
import BaseConsumer from 'BaseComponent/BaseConsumer';
import { withStyles } from "@material-ui/core";
import { I3Div } from '../importer';
import Switch from '@material-ui/core/Switch'

class RowSwitch extends BaseConsumer {
    consumerContent() {
        const { classes, title, isActive, onChange } = this.props;
        return (
            <I3Div
                display="flex"
                alignItems="center"
                justifyContent="center"
                margin={"md"}
            >
                <I3Div
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                    variant="h6"
                    fontWeight="bold"
                >
                    {title}
                </I3Div>
                <I3Div
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-end"
                    flexGrow={"1"}
                >
                    <Switch
                        checked={isActive}
                        onChange={onChange}
                        color="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </I3Div>
            </I3Div>
        )
    }
}
const Styles = {
}
export default withStyles(Styles)(RowSwitch);
