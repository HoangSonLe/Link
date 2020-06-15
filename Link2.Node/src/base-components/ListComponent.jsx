import React from 'react'
import BaseConsumer from 'BaseComponent/BaseConsumer';
import { withStyles } from "@material-ui/core";
import { I3Div, I3Icon, I3Component } from '../importer';

class ListComponent extends BaseConsumer {
    consumerContent() {
        const { components, title, margin } = this.props;
        return (

            <I3Div
                backgroundColor="lighterGray"
                padding={["no", "md", "md", "md"]}
            >
                <I3Div
                    display={"flex"}
                >
                    <I3Div
                        onClick={this.onClick}
                        borderColor="gray"
                        border={[true, false, true, false]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        cursor="pointer"
                        color="blue"
                        fontWeight="bold"
                        height="0px"
                        width="100%"
                        margin={["md", "no", "md", "no"]}
                    >
                    </I3Div>
                    <I3Div
                        margin={"sm"}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        {title}
                    </I3Div>
                    <I3Div
                        onClick={this.onClick}
                        borderColor="gray"
                        border={[true, false, true, false]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        cursor="pointer"
                        color="blue"
                        fontWeight="bold"
                        height="0px"
                        width="100%"
                        margin={["md", "no", "md", "no"]}
                    >
                    </I3Div>
                </I3Div>
                {components}

            </I3Div>

        )
    }
}
const Styles = {
}
export default withStyles(Styles)(ListComponent);
