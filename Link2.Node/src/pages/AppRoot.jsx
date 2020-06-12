import React from 'react';
import ReactDOM from 'react-dom';
import { BasePage } from 'BaseComponent/BasePage';
import MainContent from '../components/MainContent';
export default class AppRoot extends BasePage {

    childrenRender() {
        return (
            <MainContent></MainContent>
        );
    }
}

window.renderPage = (dom) => {
    ReactDOM.render(React.createElement(AppRoot), dom);
}