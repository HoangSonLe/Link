import React from 'react'
import BaseConsumer from 'BaseComponent/BaseConsumer';
import { withStyles } from "@material-ui/core";
import LabList from './LabList';
import { I3Select } from '../../importer';

class Lab extends BaseConsumer {
    consumerContent() {
        return (
            <I3Select
            // async={true}
            // loadOptions={this.}

            >

            </I3Select>
        )
    }
}
const Styles = {
}
export default withStyles(Styles)(Lab);
