import React from 'react'
import ModalLayout from '../../layout/ModalLayout'

import { BaseButton } from '../../importer';
import LabDetail from './LabDetail';

export default class LabDetailModal extends ModalLayout {
    dataToCompare() {
        return this.props.data;
    }
    componentDidMount() {
        this.setInitDataToCompare(this.props.data);
    }
    modalBody() {
        const { lab, ...others } = this.props;
        return (
            <LabDetail lab={lab} />
        )
    }
    leftFooter() {
        return <BaseButton variant="outlined" onClick={this.closeThisModal}>Cancel</BaseButton>
    }

    rightFooter() {
        const { lab, onSave, ...others } = this.props;

        return <BaseButton width="110px" onClick={data => { onSave(lab); this.closeThisModal(); }}>Save</BaseButton>

    }
}