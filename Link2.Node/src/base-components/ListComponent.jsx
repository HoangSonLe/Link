import React from "react";
import BaseConsumer from "BaseComponent/BaseConsumer";
import { I3Div, GridItem, GridContainer } from "../importer";
import HeaderListComponent from "./HeaderListComponent";
import PropTypes from "prop-types";

export default class ListComponent extends BaseConsumer {
  consumerContent() {
    let { title, renderAddItem, renderItem, dataList, margin } = this.props;
    return (
      <I3Div
        backgroundColor="lighterGray"
        padding={["md", "xs", "xs", "xs"]}
        margin={margin}
      >
        {title ? <HeaderListComponent title={title} /> : null}
        <GridContainer>
          {dataList
            ? dataList.map((e, index) => {
                return (
                  <GridItem xs={12} sm={6} md={4} lg={3} key={index}>
                    <I3Div margin={"xs"}>{renderItem(e)}</I3Div>
                  </GridItem>
                );
              })
            : null}
          <GridItem xs={12} sm={6} md={4} lg={3}>
            {renderAddItem}
          </GridItem>
        </GridContainer>
      </I3Div>
    );
  }
}
ListComponent.protoTypes = {
  dataList: PropTypes.arrayOf([PropTypes.object]),
  renderItem: PropTypes.node,
  renderAddItem: PropTypes.node,
  title: PropTypes.string,
};
