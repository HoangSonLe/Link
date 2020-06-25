import React from "react";
import {
  BaseConsumer,
  I3Div,
  I3TextField,
  I3Icon,
  I3Component,
  ShouldUpdateWrapper,
} from "../../importer";
import { withStyles } from "@material-ui/core";
import { LabTypeModal } from "../../general/enum";
import PropTypes from "prop-types";

class AddItemLab extends BaseConsumer {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
    };
  }

  //Thêm sản phẩm vào ds chọn
  _addSelectedItem = (i) => {
    let { data } = this.props.state;
    let indexItem = data.findIndex((e) => e == i);
    this.updateLocalObject(data[indexItem], {
      isSelected: !data[indexItem].isSelected,
    });
  };
  //Thay đổi text Search
  _onChangeSearch = (e) => {
    let { onSearch, dataList } = this.props;
    let data = onSearch(dataList, e.target.value);
    this.updateLocalObject(this.state, {
      data: data,
      searchText: e.target.value,
    });
  };

  //Render nội dung hiện thị Istrument hay LIS
  // _renderContent = (i) => {
  //   let { selectedList } = this.state;
  //   let { classes, typeAdd } = this.props;
  //   return (
  //     <I3Div
  //       key={i.id + "instrument"}
  //       cursor="pointer"
  //       margin="xs"
  //       className={
  //         selectedList.findIndex((e) => e == i) != -1 ? classes.ActiveDiv : ""
  //       }
  //       onClick={() => this._addSelectedItem(i)}
  //     >
  //       {typeAdd == LabTypeModal.Instrument ? (
  //         <InstrumentItem instrument={i} isInLab={true} />
  //       ) : (
  //         <LisSystemItem lisSystem={i} isInLab={true} />
  //       )}
  //     </I3Div>
  //   );
  // };
  consumerContent() {
    let { data, searchText } = this.state;
    let { classes, renderItem, placeholderSearch } = this.props;
    return (
      <I3Div margin="md">
        <I3Div margin={["md", "no", "md", "no"]}>
          <ShouldUpdateWrapper
            value={searchText}
            onChange={(e) => this._onChangeSearch(e)}
          >
            <I3TextField
              className={classes.InputSearch}
              variant="outlined"
              placeholder={placeholderSearch}
              InputProps={{
                endAdornment: (
                  <I3Icon
                    lineHeight="20px"
                    className="fas fa-search"
                    color="blue"
                    margin={["no", "sm", "no", "no"]}
                  />
                ),
              }}
            />
          </ShouldUpdateWrapper>
        </I3Div>
        {/* Nếu có search thi hiện theo ds search , không thì hiện mặc định từ db về */}
        {data.length > 0 ? (
          data.map((i) => (
            <I3Div
              key={i.id + "instrument"}
              cursor="pointer"
              margin="xs"
              className={i.isSelected ? classes.ActiveDiv : null}
              onClick={() => this._addSelectedItem(i)}
            >
              {renderItem(i)}
            </I3Div>
          ))
        ) : (
          <I3Component variant="h6" color="gray" margin="md">
            No Options
          </I3Component>
        )}
      </I3Div>
    );
  }
}

const Styles = {
  ActiveDiv: {
    border: "2px solid #004e87",
  },
  InputSearch: {
    "& .I3TextField-input": {
      height: "45px",
    },
    "& .MuiOutlinedInput-root": {
      paddingLeft: "15px !important",
      "& fieldset": {
        borderRadius: "30px",
      },
    },
  },
};
AddItemLab.propTypes = {
  onAddItemToLab: PropTypes.func,
  lab: PropTypes.object,
  placeholderSearch: PropTypes.string,
};

export default withStyles(Styles)(AddItemLab);
