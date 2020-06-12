import React from 'react'
import BaseConsumer from 'BaseComponent/BaseConsumer';
import { withStyles } from "@material-ui/core";

class Instrument extends BaseConsumer {
    consumerContent() {
        return (
            <h1>
                Instruments
            </h1>
        )
    }
}
const Styles = {
}
export default withStyles(Styles)(Instrument);
