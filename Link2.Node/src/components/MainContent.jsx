import React from 'react';
import BaseConsumer from 'BaseComponent/BaseConsumer'
import I3Div from '../../i3Src/components/GeneralComponent/I3Div';
import I3CustomTabs from '../../i3Src/components/CustomTabs/I3CustomTabs';
import Lab from '../components/Lab';
import Instrument from '../components/Instrument';
import Lis from '../components/Lis';
import I3Component from '../../i3Src/components/Typography/I3Component';
import { withStyles } from "@material-ui/core";
class MainContent extends BaseConsumer {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }

    _createTab = () => {
        return [
            {
                tabName:
                    <I3Component
                        color="blue"
                        className="abc"
                        variant={"subtitle1"}
                        fontWeight={"bolder"}
                    >
                        LABS
                    </I3Component>,
                tabContent: <Lab></Lab>
            },
            {
                tabName:
                    <I3Component
                        color={"blue"}
                        variant={"subtitle1"}
                        fontWeight={"bolder"}
                    >
                        INSTRUMENTS
                    </I3Component>,
                tabContent: <Instrument></Instrument>
            },
            {
                tabName:
                    <I3Component
                        color={"blue"}
                        variant={"subtitle1"}
                        fontWeight={"bolder"}
                    >
                        LIS
                    </I3Component>,
                tabContent: <Lis></Lis>
            }
        ]
    }
    _handleChange = (index) => {
        this.updateLocalObject(this.state, { value: index });
    }
    consumerContent() {
        let { classes } = this.props;
        return (
            <I3Div>
                <I3CustomTabs
                    className={classes.Active}
                    indicator={true}
                    onChange={this._handleChange}
                    tabs={this._createTab()}
                >

                </I3CustomTabs>
            </I3Div>
        );
    }
}
const Styles = {
    Active: {
        "& .MuiTab-textColorInherit.Mui-selected": {
            color: "red"
        }
    }
}
export default withStyles(Styles)(MainContent)