import React, { Fragment } from 'react';
import BaseConsumer from 'BaseComponent/BaseConsumer';
import { withStyles } from '@material-ui/core';

import ModalHeader from './ModalHeader';
import ModalFooter from './ModalFooter';
import { EModalType } from '../general/enum';

class RightModal extends BaseConsumer {
    constructor(props) {
        super(props);
    }
    consumerContent() {
        const {
            title, classes, modalBody, bodyProps, onClose,
            rightFooter, leftFooter, hasFooter
        } = this.props;
        console.log("hasFooter", hasFooter)
        return (
            <Fragment>
                <div className={classes.container}>
                    <ModalHeader
                        type={EModalType.Right}
                        title={title}
                        onClose={onClose}
                    />
                    <div className={classes.body}>
                        {modalBody}
                    </div>
                    {
                        hasFooter ?
                            <ModalFooter
                                type={EModalType.Right}
                                onClose={onClose}
                                rightFooter={rightFooter}
                                leftFooter={leftFooter}
                            />
                            : null
                    }
                </div>
            </Fragment>
        )
    }
}

export default withStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
    },
    body: {
        borderRadius: '0 !important',
        flexGrow: 1,
    },
})(RightModal)