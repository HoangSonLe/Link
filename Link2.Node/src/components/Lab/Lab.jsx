import React from 'react'
import BaseConsumer from 'BaseComponent/BaseConsumer';
import { withStyles } from "@material-ui/core";
import LabItem from './LabItem';
import { I3Div, BaseButton } from '../../importer';

class Lab extends BaseConsumer {
    componentDidMount() {
        this.ajaxGet({
            url: "/api/link/GetLabs",
            success: (ack) => {

                this.updateObject(this.props.lab, { labList: ack.data },
                    () => this.ajaxGet({
                        url: "/api/link/GetDefaultLab",
                        success: (ac) => {
                            this.updateObject(this.props.lab, { newLab: ac.data });
                        },
                    })
                );
            },
        });
    }
    consumerContent() {
        let { lab } = this.props;
        if (!lab.labList || lab.labList.length <= 0) {
            return null;
        }
        console.log("lab", lab)
        return (
            <>
                <I3Div backgroundColor="lighterGray"
                    margin={"md"}>
                    <BaseButton margin={"md"}>Create New Laboratory</BaseButton>
                </I3Div>
                {lab.labList.map(e => {
                    return <LabItem lab={e} key={e.Id} />
                })}
            </>

        )
    }
}
const Styles = {
}
export default withStyles(Styles)(Lab);
