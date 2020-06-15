import React from 'react';
import { typographyStyles } from 'StyleConfig.jsx';
import { I3Div } from '../importer';
import PropTypes from "prop-types";
import { availableVariant, availableBorderWidth, availableColors } from 'general/CleanNodeHelper';

class VerticalDevider extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        let { height, width, color, margin } = this.props;
        let h = typographyStyles[height + "FontSize"];
        return (
            <I3Div
                width="0px"
                height={h}
                border={[false, true, false, true]}
                borderColor={color}
                margin={margin}
                borderWidth={width}>
            </I3Div>
        );
    }
}

VerticalDevider.defaultProps = {
    height: "subtitle2",
    width: "default",
    color: "primary"
}

VerticalDevider.propTypes = {
    height: PropTypes.oneOf(availableVariant),
    width: PropTypes.oneOf(availableBorderWidth),
    color: PropTypes.oneOf(availableColors),
    //margin:  tương tự I3Component
}


export default VerticalDevider;