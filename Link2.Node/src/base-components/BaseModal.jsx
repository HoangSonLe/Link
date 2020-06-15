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
            // <PatientDetail
            //     closeModal={this.closeThisModal}
            //     data={data}
            //     {...others}
            // />
            
            <h1>Nody</h1>
        )
    }
    leftFooter(){
        return this.props.leftFooter;
    }
    rightFooter(){
        return this.props.rightFooter;
    }
}