import React from 'react'
import BaseConsumer from 'BaseComponent/BaseConsumer';
import { withStyles } from "@material-ui/core";
import LabList from './LabList';

class Lab extends BaseConsumer {
    consumerContent() {
        return (
            <LabList></LabList>
        )
    }
}
const Styles = {
}
export default withStyles(Styles)(Lab);
