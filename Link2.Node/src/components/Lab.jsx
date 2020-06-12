import React from 'react'
import BaseConsumer from 'BaseComponent/BaseConsumer';
import { withStyles } from "@material-ui/core";

class Lab extends BaseConsumer {
    consumerContent() {
        return (
            <h1>
                Lab
            </h1>
        )
    }
}
const Styles = {
}
export default withStyles(Styles)(Lab);
