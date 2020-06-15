import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core';
import VerticalDevider from './VerticalDevider';
import { I3Div, I3DivCenter } from '../importer';
import { availableBorderWidth, availableVariant, availableColors } from 'general/CleanNodeHelper';

class DevidedComponents extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { components, deviderColor, deviderWidth, deviderHeight, deviderMargin } = this.props;
        if (!components || components.length == 0) return null;
        return (
            <I3Div display="flex" height="100%" width="100%">
                {components.map((c, index) => {
                    return (
                        <React.Fragment key={index}>
                            {c}
                            {index != (components.length - 1)
                                ? <I3DivCenter>
                                    <VerticalDevider
                                        width={deviderWidth}
                                        height={deviderHeight}
                                        margin={deviderMargin}
                                        color={deviderColor} />
                                </I3DivCenter>
                                : null}
                        </React.Fragment>
                    );
                })}
            </I3Div>
        );
    }
}


DevidedComponents.propTypes = {
    components: PropTypes.arrayOf(PropTypes.object),
    deviderWidth: PropTypes.oneOf(availableBorderWidth),
    deviderHeight: PropTypes.oneOf(availableVariant),
    deviderColor: PropTypes.oneOf(availableColors),
    //deviderMargin tương tự I3Component
}

export default withStyles({

})(DevidedComponents);