import React from 'react'
import ModalLayout from '../../layout/ModalLayout'

import { BaseButton } from '../../importer';
import LisDetail from './LisDetail';

export default class LisDetailModal extends ModalLayout {
    dataToCompare() {
        return this.props.data;
    }
    componentDidMount() {
        this.setInitDataToCompare(this.props.data);
    }
    modalBody() {
        const { lis, ...others } = this.props;
        return (
            <LisDetail lis={lis} />
        )
    }
    leftFooter() {
        return <BaseButton variant="outlined" onClick={this.closeThisModal}>Cancel</BaseButton>
    }

    rightFooter() {
        const { lis, onSave, ...others } = this.props;

        return <BaseButton width="110px" onClick={data => { onSave(lis); this.closeThisModal(); }}>Save</BaseButton>

    }
}