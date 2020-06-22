import React from "react";
import {
  BaseConsumer,
  I3Div,
  I3TextField,
  I3Icon,
  I3Component,
} from "../../importer";
import { withStyles } from "@material-ui/core";
import { LabTypeModal } from "../../general/enum";
import InstrumentItem from "../Instrument/InstrumentItem";
import LisSystemItem from "../Lis/LisSystemItem";
class AddItemLab extends BaseConsumer {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      selectedList: [],
      searchList: [],
      searchText: "",
    };
  }
  //Thêm sản phẩm vào ds chọn
  _addSelectedItem = (i) => {
    let { selectedList } = this.state;
    let index = selectedList.findIndex((e) => e == i);
    console.log("i", i);
    index == -1
      ? this.addLocalElement(selectedList, i)
      : this.removeLocalElement(selectedList, i);
  };
  //Thay đổi text Search
  _onChangeSearch = (e) => {
    this._debounceChange(e.target.value);
  };
  // debounce and filter lấy ds khi search
  _debounceChange = _.debounce((text) => {
    let { dataList } = this.state;
    let { typeAdd } = this.props;
    let data =
      typeAdd == LabTypeModal.AddInstrument
        ? dataList.filter(
            (i) =>
              i.name.toUpperCase().match(text.toUpperCase()) ||
              i.serialNumber.toUpperCase().match(text.toUpperCase())
          )
        : dataList.filter((i) =>
            i.name.toUpperCase().match(text.toUpperCase())
          );
    this.updateLocalObject(this.state, {
      searchList: data,
      searchText: text,
    });
  }, 300);
  //Lấy ds lis, instrument
  componentDidMount() {
    let { typeAdd, lab } = this.props;
    let url =
      typeAdd == LabTypeModal.AddInstrument
        ? "/api/link/GetInstrumentsForLab"
        : "/api/link/GetLisSystemForLab?idLab=" + lab.id;
    this.ajaxGet({
      url: url,
      success: (ack) => {
        this.setState({ dataList: ack.data });
      },
    });
  }
  //Render nội dung hiện thị Istrument hay LIS
  _renderContent = (i) => {
    let { selectedList } = this.state;
    let { classes, typeAdd } = this.props;
    return (
      <I3Div
        key={i.id + "instrument"}
        cursor="pointer"
        margin="xs"
        className={
          selectedList.findIndex((e) => e == i) != -1 ? classes.ActiveDiv : ""
        }
        onClick={() => this._addSelectedItem(i)}
      >
        {typeAdd == LabTypeModal.AddInstrument ? (
          <InstrumentItem
            header={i.name}
            isActive={i.isActive}
            instrument={i}
          />
        ) : (
          <LisSystemItem header={i.name} isActive={i.isActive} lisSystem={i} />
        )}
      </I3Div>
    );
  };
  consumerContent() {
    let { dataList, selectedList, searchList, searchText } = this.state;
    let { classes, typeAdd } = this.props;
    this.props.onAddInstrumentToLab(selectedList);

    console.log("search", this.state.searchList);
    return (
      <I3Div margin="md">
        <I3Div margin={["md", "no", "md", "no"]}>
          <I3TextField
            className={classes.InputSearch}
            variant="outlined"
            value={searchText}
            placeholder={
              typeAdd == LabTypeModal.AddInstrument
                ? "Search by name, searial number"
                : "Search by name"
            }
            onChange={(e) => this._onChangeSearch(e)}
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
        </I3Div>
        {/* Nếu có search thi hiện theo ds search , không thì hiện mặc định từ db về */}
        {searchList.length > 0 ? (
          searchList.map((i) => this._renderContent(i))
        ) : dataList.length > 0 && searchText === "" ? (
          dataList.map((i) => this._renderContent(i))
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

export default withStyles(Styles)(AddItemLab);
