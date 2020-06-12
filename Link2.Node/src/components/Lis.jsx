import React from 'react'
import BaseConsumer from 'BaseComponent/BaseConsumer';
import { withStyles } from "@material-ui/core";

class Lis extends BaseConsumer {
    consumerContent() {
        return (
            <h1>
                Lis
            </h1>
        )
    }
}
const Styles = {
}
export default withStyles(Styles)(Lis);
