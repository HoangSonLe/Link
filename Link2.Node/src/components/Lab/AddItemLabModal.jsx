import React from "react";
import ModalLayout from "../../layout/ModalLayout";

import {
  BaseButton,
  I3Div,
  ShouldUpdateWrapper,
  I3TextField,
  I3Icon,
  I3Component,
} from "../../importer";
import { withStyles } from "@material-ui/core";

import PropTypes from "prop-types";

class AddItemLabModal extends ModalLayout {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      selectedItems: [],
    };
  }
  //Thêm sản phẩm vào ds chọn
  _addSelectedItem = (i) => {
    let { selectedItems } = this.state;
    let { keyIndentify } = this.props;
    let item = selectedItems.find((e) => e[keyIndentify] == i[keyIndentify]);

    item == null
      ? this.addLocalElement(this.state.selectedItems, {
          [keyIndentify]: i[keyIndentify],
        })
      : this.removeLocalElement(this.state.selectedItems, item);
  };
  //Thay đổi text Search
  _onChangeSearch = (e) => {
    this.updateLocalObject(this.state.searchText, e.target.value);
  };
  modalBody() {
    let { searchText, selectedItems } = this.state;

    let {
      classes,
      dataList,
      renderItem,
      placeholderSearch,
      onSearch,
      keyIndentify,
    } = this.props;
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

        {dataList.length > 0 ? (
          dataList.map((i) =>
            onSearch(i, searchText) ? (
              <I3Div
                key={i.id + "instrument"}
                cursor="pointer"
                margin="xs"
                className={
                  selectedItems.find(
                    (e) => e[keyIndentify] == i[keyIndentify]
                  ) != null
                    ? classes.ActiveDiv
                    : ""
                }
                onClick={() => this._addSelectedItem(i)}
              >
                {renderItem(i)}
              </I3Div>
            ) : null
          )
        ) : (
          <I3Component variant="h6" color="gray" margin="md">
            No Options
          </I3Component>
        )}
      </I3Div>
    );
  }
  leftFooter() {
    return (
      <BaseButton variant="outlined" onClick={this.closeThisModal}>
        Cancel
      </BaseButton>
    );
  }

  rightFooter() {
    let { onSaveSelectedItem, dataList, keyIndentify } = this.props;
    let { selectedItems } = this.state;

    return (
      <BaseButton
        width="110px"
        onClick={() => {
          let newItems = [];
          dataList.forEach((i) =>
            selectedItems.find((e) =>
              e[keyIndentify] == i[keyIndentify] ? newItems.push(i) : null
            )
          );

          onSaveSelectedItem(newItems);
          this.closeThisModal();
        }}
      >
        Save
      </BaseButton>
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
export default withStyles(Styles)(AddItemLabModal);
AddItemLabModal.propTypes = {
  placeholderSearch: PropTypes.string,
  onAddSelectedItem: PropTypes.func,
  onSearch: PropTypes.func,
  onSaveSelectedItem: PropTypes.func,
  // dataList: PropTypes.arrayOf([PropTypes.object]),
  renderItem: PropTypes.func,
};
