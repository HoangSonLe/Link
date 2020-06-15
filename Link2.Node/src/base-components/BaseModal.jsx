import ModalLayout from '../layout/ModalLayout'
import React from 'react'

export default class BaseModal extends ModalLayout {
    dataToCompare() {
        return this.props.data;
    }
    componentDidMount() {
        this.setInitDataToCompare(this.props.data);
    }
    modalBody() {
        const { data, ...others } = this.props;
        return (
            this.props.modalBody
        )
    }
    leftFooter() {
        return this.props.leftFooter;
    }
    rightFooter() {
        return this.props.rightFooter;
    }
}