import { withStyles } from '@material-ui/core';
import BaseConsumer from 'BaseComponent/BaseConsumer';
import React from 'react';
import { EModalType } from '../general/enum';

class ModalWrapper extends BaseConsumer {
    constructor(props) {
        super(props);
        this._defaultPadding = {
            [EModalType.Full]: ["lg", "lg", "lg", "lg"],
            [EModalType.Blank]: ["lg", "lg", "lg", "lg"],
        };
    }
    consumerContent() {
        const { classes, children, title, type, hasDefaultPadding, ...childrenProps } = this.props;
        const _childrenRender = React.Children.map(children, child => {
            return React.cloneElement(child, {
                ...childrenProps,
                modalIndex: this.props.getModalIndex(),
                type: type,
                title: title,
                hasDefaultPadding: hasDefaultPadding,
            });
        });

        let bodyProps = {};
        if (hasDefaultPadding) bodyProps.padding = this._defaultPadding[type];
        return _childrenRender;
    }

    shouldComponentUpdate() {
        return true;
    }
}
export default withStyles({
})(ModalWrapper);














// let path = [];
// path.push(currentItem);

// findParent = (currentItem, list) => {
//     let theRest = list.filter(i => i.id != currentItem.id);

//     for (let i = 0; i < theRest.length - 1; i++){
//         if (theRest[i].id == currentItem.parentId){
//             path.push(theRest[i])
//             getPathFromCurrent(theRest[i], list);
//             break;
//         }
//     }
// }



// list = [
//     {
//         id: 1,
//         name: "name1",
//     },
//     {
//         id: 2,
//         name: "name2",
//     },
//     {
//         id: 3,
//         name: "name3",
//     },
//     {
//         id: 4,
//         name: "name4",
//     }
// ]

// item = {
//     id: 3,
//     name: "name3",
// }

// find, findIndex, includes, some

// let conditionFunction = (value) => item.id == value.id;

// let found = list.some(conditionFunction)
// let found2 = !list.some(value => value.id == item.id);
// if (found == undefined) {

// }

// [1,2,3,4].includes(1);


ModalWrapper.displayName = 'ModalWrapper';
