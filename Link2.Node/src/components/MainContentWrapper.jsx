import React from 'react';
import BaseRouteWrapper from 'BaseComponent/BaseRouteWrapper';
export default class MainContentWrapper extends BaseRouteWrapper {
    constructor(props) {
        super(props);
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
