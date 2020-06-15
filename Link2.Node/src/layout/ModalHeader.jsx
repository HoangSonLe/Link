import React,{Fragment} from 'react'
import BaseConsumer from 'BaseComponent/BaseConsumer';
import { withStyles } from '@material-ui/core';
import { I3Div, I3Icon, I3Component } from '../importer';
import { FontWeight } from '../themeStyles/Color';
import { EModalType } from '../general/enum';

class ModalHeader extends BaseConsumer{
    
    consumerContent(){
        const { classes, title, onClose, type } = this.props;
        let padding;
        if (type == EModalType.Right) {
            padding = ["no", "lg2", "no", "lg2"];
        } else {
            padding = ["no", "lg4", "no", "lg4"]
        }
        return (
            <Fragment>
                <I3Div
                    height="60px" padding={padding} alignItems="center" display="flex"
                    borderColor="lighterGray" border={[false, false, true, false]}
                >
                    <I3Component variant="h3" fontWeight={FontWeight.bold} fontFamily="font1">
                        {title}
                    </I3Component>
                    <div style={{ flexGrow: 1, textAlign: 'right' }}>
                        <span onClick={onClose}>
                            <I3Icon cursor="pointer" title="Đóng" className="fas fa-times" variant="h3" color="lightGray" />
                        </span>
                    </div>
                </I3Div>
            </Fragment>
        )
    }
}
const Styles={
    HeaderEnd:{
       flexGrow:1,
       textAlign:"right"

    }
}
export default withStyles(Styles)(ModalHeader)