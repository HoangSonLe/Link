import React from 'react'
import BaseConsumer from 'BaseComponent/BaseConsumer';
import { withStyles } from "@material-ui/core";
import { I3Div, GridItem, GridContainer } from '../importer';
import HeaderListComponent from './HeaderListComponent';

class ListComponent extends BaseConsumer {
    consumerContent() {
        const { components, title, renderAddItem, renderItem, dataList, margin } = this.props;
        return (
            <I3Div
                backgroundColor="lighterGray"
                padding={["xs", "xs", "xs", "xs"]}
                margin={margin}
            >
                {title ? <HeaderListComponent title={title} /> : null}
                <GridContainer>
                    {
                        dataList ?
                            dataList.map((e, index) => {
                                return (
                                    <GridItem xs={12} sm={6} md={4} lg={3} key={index}>
                                        {this.props.renderItem(e)}
                                    </GridItem>
                                )
                            })
                            : null
                    }
                    <GridItem xs={12} sm={6} md={4} lg={3}>
                        {renderAddItem}
                    </GridItem>
                </GridContainer>
            </I3Div>
        )
    }
}
const Styles = {
}
export default withStyles(Styles)(ListComponent);
