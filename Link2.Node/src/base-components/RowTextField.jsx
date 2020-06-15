import React from 'react'
import _ from "lodash";
import BaseConsumer from 'BaseComponent/BaseConsumer';
import { withStyles } from "@material-ui/core";
import { I3Div, I3TextField } from '../importer';

class RowTextField extends BaseConsumer {
    _onChangeInput = (e) => {
        this._debounceChange(e.target.value);
    };
    _debounceChange = _.debounce((text) => {
        this.props.onChange()
    }, 400);
    consumerContent() {
        const { classes, title, value, onChange } = this.props;
        return (
            <I3Div
                margin={"md"}
            >
                <I3Div
                    variant="h6"
                    fontWeight="bold"
                >
                    {title}
                </I3Div>
                <I3TextField
                    variant="outlined"
                    value={value}
                    onChange={this._onChangeInput}

                />
            </I3Div>
        )
    }
}
const Styles = {
}
export default withStyles(Styles)(RowTextField);
