import React from 'react'
import ModalLayout from '../../layout/ModalLayout'

import { BaseButton } from '../../importer';
import InstrumentDetail from './InstrumentDetail';

export default class InstrumenteDetailModal extends ModalLayout {
    dataToCompare() {
        return this.props.instrument;
    }
    componentDidMount() {
        this.setInitDataToCompare(this.props.instrument);
    }
    modalBody() {
        const { instrument, ...others } = this.props;
        return (
            <InstrumentDetail instrument={instrument} />
        )
    }
    leftFooter() {
        return <BaseButton variant="outlined" onClick={this.closeThisModal}>Cancel</BaseButton>
    }

    rightFooter() {
        const { instrument, onSave, ...others } = this.props;

        return <BaseButton width="110px" onClick={data => { onSave(instrument); this.closeThisModal(); }}>Save</BaseButton>

    }
}