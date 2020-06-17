import React from 'react'
import BaseConsumer from 'BaseComponent/BaseConsumer';
import { withStyles } from "@material-ui/core";
import LabItem from './LabItem';

class Lab extends BaseConsumer {
    componentDidMount() {
        this.ajaxGet({
            url: "/api/link/GetLabs",
            success: (ack) => {
                this.updateObject(this.props.lab, { labList: ack.data });
                this.ajaxGet({
                    url: "/api/link/GetDefaultInstrument",
                    success: (ac) => {
                        this.updateObject(this.props.lab, { newLab: ac.data });
                    },
                });
            },
        });
    }
    consumerContent() {
        let { lab } = this.props;
        if (lab)
            return (
                lab.map(e => {
                    return <LabItem lab={e} />
                })
            )
    }
}
const Styles = {
}
export default withStyles(Styles)(Lab);
