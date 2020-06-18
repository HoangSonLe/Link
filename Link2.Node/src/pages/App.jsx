import React from "react";
import ReactDOM from "react-dom";
import { EModalType } from "../general/enum";
import ModalWrapper from "../layout/ModalWrapper";
import { withStyles } from "@material-ui/core";
import MainContent from "../components/MainContent";
import { BasePage } from "BaseComponent/BasePage";

class App extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      routeData: {},
    };
    window.app = this;
    this._firstRender = true;
  }
  componentDidMount() {
    this.ajaxGet({
      url: "/api/link/GetLisSystems",
      success: (ack) => {
        this.updateObject(this.state.routeData, { lab: {}, lis: {}, instrument: {} });
        // this.setState({ routeData: { lab: {}, lis: {}, instrument: {} } });
      },
    });
  }

  openModal(
    modalFunction,
    type = EModalType.Full,
    hasDefaultPadding = true,
    closeWhenClickOut = true
  ) {
    let mIndex = -1;
    const len = () => {
      return mIndex;
    };
    let popupTypes = [EModalType.Popup, EModalType.Right];
    let isPopup = popupTypes.includes(type);

    let _newModalFunc = () => {
      let modal = modalFunction();
      let slideDirection = undefined;
      switch (type) {
        case EModalType.Popup:
          slideDirection = undefined;
          break;
        case EModalType.Full:
        case EModalType.Blank:
        case EModalType.Right:
          slideDirection = "left";
      }
      return {
        body: (
          <ModalWrapper
            title={modal.title}
            getModalIndex={len}
            {...modal.body.props}
            type={!(type == null || type == undefined) ? type : EModalType.Full}
            hasDefaultPadding={hasDefaultPadding}
          >
            {modal.body}
          </ModalWrapper>
        ),
        otherProps: {
          noTitle: false,
          disableBack: true || isPopup == false,
          disableOnClose: !closeWhenClickOut,
          slideDirection: slideDirection,
          ...modal.otherProps,
        },
        widthSize: "full",
        fullHeight: true,
      };
    };
    const { classes } = this.props;
    let dialogStyleContainer = "";
    let dialogContentRoot = classes.rootDialogContent;
    let modalPaper = classes.modalPaper;
    switch (type) {
      case EModalType.Right:
        dialogContentRoot = classes.popupRightRootDialogContent;
        dialogStyleContainer = classes.rightPopupDialogContainer;
        modalPaper = classes.rightPopupModalPaper;
        break;
    }

    let dialogStyles = {
      paper: modalPaper,
      container: dialogStyleContainer,
    };

    let dialogContentStyles = {
      root: dialogContentRoot,
    };
    mIndex = super.openModal(_newModalFunc, {
      dialogStyles,
      dialogContentStyles,
    });
    return mIndex;
  }

  childrenRender() {
    let { routeData } = this.state;
    if (this._firstRender) {
      this._firstRender = false;
      return (
        null
      );
    }
    return (
      <MainContent routeData={routeData} />
    );
  }
}

const Styles = {
  popupDialogContainer: {
    height: "auto !important",
    marginTop: "110px",
  },
  rightPopupDialogContainer: {},
  popupRightRootDialogContent: {
    padding: "0px !important",
    height: "100vh !important",
  },

  rightPopupModalPaper: {
    width: "520px",
    right: "0px",
    position: "absolute",

  },

  rootDialogContent: {
    padding: "0 !important",
    height: "100% !important",
  },
  modalPaper: {
    boxShadow: "none !important",
  },
};
const C = withStyles(Styles)(App);

window.renderPage = (dom) => {
  ReactDOM.render(<C />, dom);
};
