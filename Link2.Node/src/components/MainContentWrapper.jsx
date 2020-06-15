import React from 'react';
import BaseRouteWrapper from 'BaseComponent/BaseRouteWrapper';
import MainContent from './MainContent';
export default class MainContentWrapper extends BaseRouteWrapper {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.ajaxGet({
            url:'/api/link/GetLisSystems',
            success:ack =>{
                this.setData(ack.Data);
            }
        })
    }

    wrapperContent() {
        const data = this.getData();
        return (
            <MainContent
                data={data}
            />
        )
    }
}
MainContentWrapper.displayName = 'MainContentWrapper';
