import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core';
import { I3Div, I3Icon } from '../importer';

class IconButtonGroup extends React.Component {
    constructor(props) {
        super(props);
    }
    // _onClick = (e) => {
    //     typeof this.props.onClick === 'function' && this.props.onClick(e);
    // }
    render() {
        let { components, float } = this.props;
        if (!components || components.length == 0) return null;
        return (
            <I3Div display="flex" float={float}>
                {components.map((i, index) => {
                    return typeof i.onClick === 'function' ?
                        <I3Icon
                            key={index}
                            className={i.className}
                            onClick={i.onClick}
                            fontSize="h1"
                            color="blue"
                            margin={"xs"}
                            cursor="pointer"
                        />
                        : null

                })}
            </I3Div>
        );
    }
}


IconButtonGroup.propTypes = {
    components: PropTypes.arrayOf(PropTypes.object)
}

export default withStyles({

})(IconButtonGroup);