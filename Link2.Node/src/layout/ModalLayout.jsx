import React from 'react';
import BaseConsumer from 'BaseComponent/BaseConsumer';
import { EModalType } from '../general/enum';
import RightModal from'./RightModal';
import $ from 'jquery';

export default class ModalLayout extends BaseConsumer {
    constructor(props) {
        super(props);
        this._defaultPadding = {
            [EModalType.Full]: ["lg", "lg", "lg", "lg"],
            [EModalType.Blank]: ["lg", "lg", "lg", "lg"],
        };
        this.closeThisModal = this.closeThisModal.bind(this);
        this._firstRender = true;
        this._consumerContentOverride = false;
    }
    shouldComponentUpdate() {
        return true;
    }
    modalBody() {
        console
        throw  "Not implemented `modalBody` method in ModalLayout";
    }
    dataToCompare() {
        return null;
    }
    setInitDataToCompare(data) {
        this._initData = $.extend(true, {}, data);
    }
    _getExcludeKey = obj => {
        let { key, ...take } = obj;
        return take;
    }
    closeThisModal() {
        const { modalIndex } = this.props;
        this.closeModal(modalIndex);
    }
    _close = () => {
        const { modalIndex } = this.props;
        let currentData = this.dataToCompare();
        if (currentData == null) {
            this.closeModal(modalIndex);
        } else {
            currentData = this._getExcludeKey(currentData);
            if (JSON.stringify(currentData) != JSON.stringify(this._initData)) {
                this.confirm("Thay đổi của bạn sẽ bị mất, bạn có chắc chắn thoát?", {
                    okay: {
                        title: "Thoát",
                        handle: () => {
                            this.closeModal(modalIndex);
                        },
                    },
                    cancel: {
                        title: "Hủy",
                    }
                })
            } else {
                this.closeModal(modalIndex);
            }
        }
    }
    leftFooter() {
    }
    rightFooter() {
    }
    componentDidMount(){
        if (this._consumerContentOverride == false){
            throw 'How dare you override my consumerContent?';
        }
    }
    consumerContent() {
        const { type, hasDefaultPadding, title } = this.props;
        this._consumerContentOverride = true;
        let bodyProps = {};
        if (hasDefaultPadding) bodyProps.padding = this._defaultPadding[type];
        switch (type) {
            case EModalType.Right:
                return (
                    <RightModal
                        modalBody={this.modalBody()}
                        leftFooter={this.leftFooter()}
                        rightFooter={this.rightFooter()}
                        title={title}
                        bodyProps={bodyProps}
                        onClose={this._close}
                    />
                );
            default:
                throw "Unsupported modal type " + type;
        }
    }
}