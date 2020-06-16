import React from 'react'
import BaseConsumer from 'BaseComponent/BaseConsumer';
import { withStyles } from "@material-ui/core";
import { I3Div, I3Icon } from '../importer';

class LastDivItem extends BaseConsumer {
    consumerContent() {
        const { classes, title, margin, iconClassName, onClick } = this.props;
        return (
            <I3Div
                onClick={onClick}
                variant="h5"
                borderColor="gray"
                border={true}
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                margin={"no"}
                color="blue"
                fontWeight="bold"
                height="82px"
            >
                <I3Icon
                    lineHeight="20px"
                    color="blue"
                    className={iconClassName ? iconClassName : "fas fa-plus-circle"}
                    margin={["no", "sm", "no", "no"]}
                />
                {title}
            </I3Div>
        )
    }
}
const Styles = {
}
export default withStyles(Styles)(LastDivItem);
