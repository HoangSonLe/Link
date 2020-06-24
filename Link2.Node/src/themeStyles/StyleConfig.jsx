import React from "react";
import Colors from "./Color";

function createColor(
  color,
  textColorWithBackground,
  lighterColor,
  textColorWithLighter
) {
  return { color, textColorWithBackground, lighterColor, textColorWithLighter };
}

export const ColorObject = {
  primary: createColor("#0000dd", Colors.white),
  secondary: createColor("#f4f4f4", "#464646"),
  warning: createColor("#ff9800", Colors.white),
  danger: createColor("#f44336", Colors.white),
  success: createColor("#4caf50", Colors.white),
  default: createColor("#DEDEDE", Colors.white),
  info: createColor("#00acc1", Colors.white),
  gray: createColor("#ccc", Colors.white),
  blue: createColor(Colors.blue, Colors.white),
  white: createColor("#ffffff", Colors.black),
  lightGray: createColor(Colors.lightGray, Colors.white),
  lighterGray: createColor(Colors.lighterGray, Colors.black),
  lightGreen: createColor(Colors.lightgreen, Colors.white),
};
const globalStyle = {
  containerPadding: "10pt",
  defaultBoxShadowColor: "grey", //màu mặc định cho boxShadow
  drawerWidth: 260, // width of sidebar (left) when opened
  drawerWidthUser: 260, //width of sidebar user (right) when opened
  drawerMiniWidth: 80, //width of sidebar mini on desktop
  boxShadow: "rgb(0, 0, 0)", //box shadow of sidebar and header
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // FontFamily default
  fontWeight: "300", //Font weight default
  fontWeightValues: {
    normal: 400,
    lighter: 300,
    bold: 500,
    bolder: 600,
  },
  marginAndPaddingSpacing: 0.3, // hệ số mặc định của padding và margin
  marginAndPaddingSpacingUnit: "rem", //đơn vị của hệ số padding và margin

  defaultFontColor: "black", //màu chữ mặc định

  // primaryColor: "#9c27b0", //Màu chính của project
  // textColorWithPrimaryBackground: "#000000", //màu chữ khi nằm trên nền primary

  // secondaryColor: "#70b335",
  // textColorWithSecondaryBackground: "#000000",

  // warningColor: "#ff9800", //Màu cảnh báo
  // textColorWithWarningBackground: "#000000",

  // dangerColor: "#f44336",
  // textColorWithDangerBackground: "#000000",

  // successColor: "#4caf50", //Success Color.
  // textColorWithSuccessBackground: "#000000",

  // defaultColor: "#DEDEDE", //default color
  // textColorWithDefaultBackground: "#000000",

  // infoColor: "#00acc1",
  // textColorWithInfoBackground: "#000000",

  boxTitle: {
    color: "#3C4858", // màu chữ trong title cua Card
    textDecoration: "none", // gach duoi title ?
    fontWeight: "300",
    marginTop: "30px",
    marginBottom: "25px",
    minHeight: "32px",
  },

  style1BoxShadow: "0px 3px 8px 1px {color}",
  style2BoxShadow: "0px 8px 10px 3px {color}",
  style3BoxShadow: "8px 8px 10px 3px {color}",
  style4BoxShadow: "-8px 8px 10px 3px {color}",
  style5BoxShadow: "-8px -8px 10px 3px {color}",

  controlMargin: "10px 10px 10px 10px",
  controlPadding: "5px 5px 5px 10px",
  defaultBorderWidth: "1px",
  thinBorderWidth: "2px",
  lighterBorderWidth: "3px",
  strongBorderWidth: "5px",
  superStrongtBorderWidth: "7px",
  maximumBorderWidth: "10px",
  controlPadding: "5px 5px 5px 5px",
  noMarginAndPadding: "0px",
  xsMarginAndPadding: "5px",
  smMarginAndPadding: "10px",
  mdMarginAndPadding: "20px",
  lgMarginAndPadding: "30px",
  lg1MarginAndPadding: "16px",
  lg2MarginAndPadding: "20px",
  lg3MarginAndPadding: "25px",
  lg4MarginAndPadding: "30px",
  lg5MarginAndPadding: "35px",
  lg6MarginAndPadding: "40px",
};

const headdingStyle = {
  headingMargin: "0 0 30px", // Margin của toàn bộ heading
  titleMargin: "10px 0 10px 0", // Margin của phần title phía trên
  categoryMargin: "0 0 10px", // Margin của phần category phía dưới
  titleColor: "red", //màu chữ title
  categoryFontSize: "14px", //size chữ category
  titleFontSize: "1.825em", //sizze chữ title
  categoryColor: "green", // màu chữ category
};

const tooltipStyle = {
  padding: "10px 15px", // top right left down
  minWidth: 130, //min width of tooltip
  maxWidth: 200,
  color: "#FFFFFF", //text color hex or rgb
  background: "rgba(85,85,85,0.9)", //hex or rgb
  textAlign: "center",
  fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
  fontSize: "12px",
};

const cardStyles = {
  divideLineColor: "#FFFFFF", //màu của thanh phân chia header và footer
  cardGroupBtnUnderHeaderClass: {},
  cardStyle: {
    padding: "15px 15px", //padding nội dung bên trong card
    border: "0",
    margin: "30px 10px", //margin trên, phải, dưới, trái của card
    borderRadius: "6px", //Bo tròn border
    textColor: "rgba(0, 0, 0, 0.87)", //màu chữ mặc định bên trong card
    background: "#fff", //màu nền (trong trường hợp không dùng props.color)
    // boxShadowColor: "rgba(0, 0, 0, 0.14)", //bóng quanh card
    minWidth: "0",
    maxWidth: "unset",
    fontSize: ".875rem", //cỡ chữ
    backgroundGradient: false, //có hiển thị linear-gradient (background dải màu) hay không
    boxShadow: `0px 2px 1px -1px rgba(0, 0, 0, 0.14), 
                0px 1px 1px 0px rgba(0, 0, 0, 0.14), 
                0px 1px 3px 0px rgba(0, 0, 0, 0.14)`,
  },
  cardHeaderStyle: {
    borderRadiusForIconAndText: "3px", //dùng cho cardIcon và cardText
    headerLineThickness: "1px", //độ dày của đường kẻ gạch dưới header
    bottomLineWidth: "100%", //độ dài của thanh divide header
    paddingTop: "0px",
    paddingRight: "0px",
    paddingBottom: "15px",
    paddingLeft: "0px",
    floatingHeaderPadding: "15px", //padding khi dùng header nổi.
    defaultMarginTop: 30, //(không phải hover) độ đẩy lên của Header khi dùng Header nổi. Lưu ý chỉ nhập số px muốn đẩy lên không nhập dấu -!
    marginBottom: "0",
    borderRadius: "30px", //borderRadius mặc định khi dùng Header nổi
    bottomLineMargin: "5px 0px 0px 0px", //margin của đường viền so với title
    // content: {
    //     margin: "0 15px",
    //     padding: "0",
    //     textColor: "#FFFFFF"
    // },
    // contentImage: { //khi dùng header là image
    //     padding: "0",
    //     width: '100%',
    //     borderRadius: "30px",
    //     pointerEvents: "none",
    // },
    iconAndTextMarginTop: 30, //độ đẩy lên của Icon và TextCard khi dùng ở Header. Lưu ý chỉ nhập số px muốn đẩy lên không nhập dấu -!
    contentIcon: {
      //ảnh hưởng đến CardIcon có truyền props color.
      padding: "15px",
      iconAndTitleSpacing: "15px", // khoảng cách giữa icon và Title(Nếu có)
    },
    contentText: {
      //ảnh hưởng đến CardText.
      padding: "15px",
      cardTextAndTitleSpacing: "15px", // khoảng cách giữa card và Title(Nếu có)
    },
  },
  cardBodyStyle: {
    padding: "15px 0px 15px 0px", //khoảng cách trên phải dưới trái của body
    textAlign: "unset",
  },
  cardFooterStyle: {
    divideLineWidth: "100%", //độ dài của divide line footer
    divideLineThickness: "1px", // độ dày của divide line footer
    padding: "15px 0px 0px 0px", //khoảng cách trên phải dưới trái của footer
  },
  cardAvatarStyle: {
    xsSize: "40px", //Kích thước size xs của avatar
    smSize: "60px", //Kích thước size sm của avatar
    mdSize: "80px", //Kích thước size md của avatar
    lgSize: "120px", //Kích thước size lg của avatar
    xlSize: "160px", //Kích thước size xl của avatar
    xxlSize: "200px", //Kích thước size xxl của avatar
    squareAvatarBorderRadius: "6px", // borderRadius của avatar không tròn,
    boxShadowColor: "#000000c2", //màu shadow
    //borderColor: "purple" //màu của border
    //borderRadius: "30px"
  },
};

const buttonStyles = {
  padding: "12px 30px",
  margin: ".3125rem 1px",
  fontSize: "12px",
  fontWeight: "400",
  textTransform: "uppercase",
  borderRadius: "3px",
  buttonLarge: {
    padding: "1.125rem 2.25rem",
    fontSize: "0.875rem",
    borderRadius: "0.2rem",
  },
  buttonSmall: {
    padding: "0.40625rem 1.25rem",
    fontSize: "0.6875rem",
    borderRadius: "0.2rem",
  },
  buttonWidth: {
    lg: "240pt",
    md: "150pt",
    sm: "100pt",
  },
  buttonRound: {
    borderRadius: "30px",
  },
  justIcon: {
    paddingLeft: "12px",
    paddingRight: "12px",
    fontSize: "20px",
    height: "41px",
    minWidth: "41px",
    width: "41px",
  },
};

//text fields
const textFieldStyle = {
  height: "56px", //cao
  width: "100%", //ngang
  fontSize: "16px", //cỡ chữ
  labelFontSize: "16px", //cỡ chữ của label
  // labelFontSizeWhenFocus: "14px", //khi focus vào text field thì label thu về cỡ bao nhiêu,
  placeholderPaddingLeft: "5px",
  borderRadius: "4px",
  textFieldStyle: globalStyle.defaultFontColor,
};

//table
const tableStyle = {
  cellPadding: "12px 8px", //padding của từng ô
  headFontSize: "1.25em", //cở chữ của header
  cellFontSize: "1em", // cở chữ của các ô
  defaultBorderWidth: "1px", //border mặc định của các ô
};

//select/dropdown
const selectStyle = {
  multiSelectedStyle: {
    height: "30px", //chiều cao của mỗi phần tử sau khi được chọn (trường hợp chọn multiple)
  },
  optionBackground: "#fff",
  //chiều cao, chiều ngang, cỡ chữ apply giống như textFieldStyle
};

//modal
const modalManagerStyle = {
  largeWidth: "90%",
  mediumWidth: "70%",
  smallWidth: "50%",
  extraSmallWidth: "30%",
  header: {
    height: "65px",
    padding: "24px",
    titleFontSize: "1.5rem",
  },
  body: {
    padding: "24px",
  },
  closeIcon: {
    color: "#999999",
    fontSize: "18px",
  },
  footer: {
    padding: "unset",
  },
};

const accordionStyle = {
  root: {
    border: "none",
    margin: "0px 0px 20px 0px",
    padding: "none",
  },
  panel: {
    marginExpanded: "0px !important",
    borderExpanded: "none",
    paddingExpanded: "none",
  },
  panelSummary: {
    expansionPanelSummary: {
      minHeight: "auto !important",
      backgroundColor: "transparent", // màu background Title
      border: "none",
      borderBottom: "1px solid #ddd",
      padding: "25px 10px 5px 0px",
      borderTopLeftRadius: "3px",
      borderTopRightRadius: "3px",
      margin: "none",
      // color: "#3C4858",
      // colorHover: globalStyle.primaryColor, //
    },
    expaned: {
      icon: {
        topUp: "auto !important",
        topDown: "10px !important",
        color: "inherit",
      },
    },
    content: {
      margin: "0 !important",
    },
  },
  panelDetails: {
    padding: "15px 0px 5px",
    margin: "none",
  },
  defaultTitle: {
    fontSize: "15px",
    fontWeight: "bolder",
    marginTop: "0",
    marginBottom: "0",
    color: "inherit",
  },
  defaultContent: {
    fontSize: "14px",
  },
};
const badgeStyle = {
  borderRadius: "12px", //bo tron border
  padding: "5px 6px", //padding default(5px 6px)
  fontSize: "0.75rem", //size chữ
  fontWeight: "700",
  height: "20px", // chiểu cao của badge
};
const navPillsStyles = {
  root: {
    padding: "0px",
    margin: "20px 0px 0px 0px",
    border: "none",
  },
  pills: {
    // style button trên thanh header
    borderRadius: "30px",
    minWidth: "100px",
    textAlign: "center",
    padding: "10px 15px",
    color: "#555555", // color default
    margin: "0 5px",
    height: "auto",
    border: "none",
    fontSize: "14px",
  },
  contentWrapper: {
    // style wrapper content , content nên truyền component riêng chỉnh css
    margin: "20px 0px 0px 0px",
    padding: "none",
    border: "none",
    fontSize: "unset",
  },
  color: {
    // shadow từng loại color truyền vào
    boxShadowPrimary:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(156, 39, 176, 0.4)",
    boxShadowInfo:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(76, 175, 80, 0.4)",
    boxShadowSuccess:
      "0 2px 2px 0 rgba(76, 175, 80, 0.14), 0 3px 1px -2px rgba(76, 175, 80, 0.2), 0 1px 5px 0 rgba(76, 175, 80, 0.12)",
    boxShadowWarning:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(255, 152, 0, 0.4)",
    boxShadowRose:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(233, 30, 99, 0.4)",
    boxShadowDanger:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(255, 152, 0, 0.4)",
    boxShadowDefault:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(211, 211, 211, 0.4)",
  },
};
const gridSystemStyles = {
  gridContainer: {
    padding: "unset",
    margin: "0 0 15px 0",
  },
  gridItem: {
    border: "none",
    paddingDefault: "0 15px !important",
  },
};
const snackbarStyles = {
  // arletify
  info: {
    color: globalStyle.textColorWithInfoBackground,
  },
  success: {
    color: globalStyle.textColorWithSuccessBackground,
  },
  warning: {
    color: globalStyle.textColorWithWarningBackground,
  },
  danger: {
    color: globalStyle.textColorWithDangerBackground,
  },
  primary: {
    color: globalStyle.textColorWithPrimaryBackground,
  },
  rose: {
    backgroundColor: "#eb3573",
    color: "#ffffff",
  },
  root: {
    padding: "20px 15px",
    margin: "0px 10px 15px 10px",
    fontSize: "14px",
    maxWidth: "60%",
    maxWidthMobile: "100%",
    fontFamily: globalStyle.fontFamily,
  },
};
const timelineStyles = {
  item: {
    // tổng 1 story
    margin: "0px 0px 20px 0px",
    padding: "none",
    fontFamily: globalStyle.fontFamily,
  },
  panel: {
    // cái tab pannel ( không có icon trên thanh timeline )
    padding: "20px", //20px
    margin: "0px 0px 20px 0px", //
    borderRadius: "6px",
    boxShadow: "-2px 2px 4px 0  rgba(0, 0, 0, 0.14)",
  },

  footerLine: {
    // đường kẻ giữa footerTitle và footer
    margin: "10px 0px 5px 0px",
    borderColor: "unset",
  },
  timeline: {
    background: "#E5E5E5", // màu thanh timeline ở giữa,
    bottom: "20px", // chiều dài của thanh timeline so với bên dưới
  },
  timelineHeading: {
    // header
    margin: "0px 0px 15px 0px",
    padding: "none",
  },
  timelineBody: {
    // body
    margin: "none",
    padding: "none",
    fontSize: "14px",
  },
  footerTitle: {
    // dòng chữ nhỏ phía trên footer và ở dưới body ( nhìn nó hơi giống chú thích )
    // color: "#333333",
    fontWeight: "400",
    margin: "10px 0px 0px",
    padding: "none",
    fontSize: "0.8em",
  },
  timelineFooter: {
    // footer
    margin: "none",
    padding: "none",
  },
  timelineBadge: {
    width: "50px",
    height: "50px",
    widthIcon: "24px",
    heightIcon: "51px",
    marginBetweenBadgeAndPanel: "0px",
  },
};

//checkbox/radio
const checkboxStyle = {
  spaceBetweenIconAndLabel: "5px", //khoảng cách giữa icon và text
  iconFontSize: "1.5rem", //font size của icon
  textFontSize: "17px", //font size của label
  labelFontWeight: "400", //fontWeight (độ đậm) của label
};
const sidebarStyle = {
  //sidebar gồm 3 phần header, main, footer
  //-------------------------------------------------
  //background
  blackBackground: {
    color: "#FFF",
    //màu chữ trên nền background
    backgroundAfter: "#000",
    //màu nền background
    opacityAfter: "0.8",
    // opacity background
  },
  //--------------------------------------------------------
  //header gồm ICON và TEXT, icon có thể ở nhiều dạng như icon m-ui, text, img
  header: {
    marginBottom: "15px",
    //margin giữa header và main
    marginTop: "15px",
    //margin giữa header và phía trên
    paddingLeft: "28px",
    // thụt đầu dòng ICON và TEXT
  },
  //ICON
  logoHeader: {
    marginRight: "18px",
    //khoảng cách giữa ICON và TEXT
  },
  imgIconHeader: {
    //trường hợp ICON là img
    width: "30px",
    //width img
    height: "25px",
    //height img
    background: "none",
    //màu nền img trường hợp img thêm vào không có nền
    border: "none",
    borderRadius: "none",
    //border để làm nổi img
  },
  textIconHeader: {
    //trường hợp ICON là text
    fontSize: "18px",
    //chỉnh fontSize text
  },
  //TEXT
  textHeader: {
    fontSize: "18px",
    //fontsize của TEXT
  },
  //------------------------------------------------------------------------------
  //footer gồm ICON và TEXT, icon có thể ở nhiều dạng như icon m-ui, text, img
  footer: {
    marginTop: "0px",
    //khoảng cách giữa footer và phía trên (phần main chừa lại cho footer - xem sidebarWrapper.height)
    paddingLeft: "27px",
    // thụt đầu dòng cho ICON và TEXT
  },
  //ICON
  logoFooter: {
    marginRight: "18px",
    //khoảng cách giữa ICON và TEXT
  },
  imgIconFooter: {
    //trường hợp ICON là img
    width: "30px",
    //width img
    height: "25px",
    //height img
    background: "none",
    //màu nền img tr[ờng hợp img kh4ng có nền
    border: "none",
    borderRadius: "none",
    //border để làm nổi img
  },
  textIconFooter: {
    //trường hợp ICON là text
    fontSize: "18px",
    //chỉnh fontSize text
  },
  //TEXT
  textFooter: {
    fontSize: "18px",
    //chỉnh fontSize text
  },
  //----------------------------------------------------------------
  //main bao gồm các thẻ, mỗi thẻ có 2 phần gôm ICON và TEXT
  sidebarWrapper: {
    //phần bao main
    height: "calc(100vh - 100px)",
    // giúp cho main scroll được và phần bị trừ ra dùng để cho footer
  },
  list: {
    //tất cả các thẻ main
    padding: "0px 15px",
    //padding top,bot nên bằng 0, nếu muốn chỉnh khoảng cách của list so với trên dùng list.marginTOp, khoảng cách list so với dưới dùng sidebarWrapper.height,
    //padding left,right dùng để thụ đầu dòng các thẻ main
    //padding left right nên bằng nhau để khi mini sidebar, background của icon thẻ được active sẽ đều
    marginTop: "15px",
    //dùng để chỉnh khoảng cách của list so với phần header,
    //sẽ có thắc mắc tại sao không marginTop trên sidebarWrapper lun, nhưng nếu dùng như vậy sẽ ảnh hưởng đến footer
  },
  item: {
    //từng thẻ của main
    marginTop: "10px",
    //marginTop các thẻ với nhau
    marginBottom: "0px",
    //marginBot các thẻ với nhau
  },
  itemLink: {
    //1 thẻ main
    padding: "10px 10px 10px 10px",
    //padding dùng để làm đẹp khi 1 thẻ dược hover hoặc active
  },
  //ICON
  itemIcon: {
    marginRight: "15px",
    //khoảng cách của TEXT so với ICON trong  1 thẻ
    minWidth: "30px",
    //minWidth giúp các ICON cách đều với TEXT (do Icon có thể dài ngắn khác nhau(imgIcon, muiIcon, textIcon))
    marginLeft: "3px",
    //marginLeft để ICON vào giữa khi miniSidebar và thẻ được active
    //Trường hợp ICON là m-ui thì chỉ cần dùng marginLeft trên để căn giữa
    //Trường hợp ICON là img thì phải dùng thêm imgIcon.marginLeft để hỗ trợ căn cho img riêng
    //Trường hợp ICON là text thì phải dùng thêm textIcon.marginLeft để hỗ trợ căn cho img riêng
  },
  textIcon: {
    //trường hợp ICON là text
    fontSize: "14px",
    //chỉnh fontSize text
    marginLeft: "2px",
    //marginLeft text để img vào giữa khi mini sidebar và thẻ được active
  },
  imgIcon: {
    //trường hợp ICON là img
    width: "30px",
    //width img
    height: "30px",
    //height img
    marginLeft: "-2px",
    //marginLeft img để img vào giữa khi mini sidebar và thẻ được active
    background: "white",
    //màu nên khi img không có nền
    border: "1px solid red",
    borderRadius: "none",
    //border làm nổi img
  },
  //TEXT
  itemText: {
    fontSize: "14px", //fontSize TEXT
  },
};
// tabs
const customTabsStyles = {
  //Title cua tab
  cardTitle: {
    padding: "10px 10px 10px 0px", // padding cua title Tab
    fontSize: "0.875rem !important", // size chữ
    alignText: "center", // căn giữa (giữa/ trái/ phải) title khi title ở trên so với tab
    fontFamily: globalStyle.fontFamily, //font chữ mặc định của title tab
    fontWeight: "bold", //độ đậm nhạt
  },
  tabsRoot: {
    fontSize: "16px", //size của tên tab
  },
  tabRootButton: {
    padding: "10px 15px", //padding cua từng tab
    borderRadius: "3px", // bo tròn border
    marginLeft: "4px", //margin giữa các tab
    marginLeftLastChild: "0px", //margin của tab cuối cùng
    border: "0 !important", //boder cua tab
    fontFamily: globalStyle.fontFamily, //font chữ mặc định của tên tab
  },
  // css của tab khi được chọn
  tabSelected: {
    backgroundColor: "rgba(255, 255, 255, 0.2)", //màu nền
    transition: "0.2s background-color 0.1s",
    color: Colors.blue,
  },
  tabWrapper: {
    marginIcon: "-1px 5px 0 0", // margin của tabicon
    fontWeight: "bold", //độ đậm nhạt
  },
  cardStyle: {
    padding: "0px 15px 0px 15px", //padding của tab so với header và nội dung
    border: "0", //border toàn bộ tab
    borderRadius: "6px", //Bo tròn border
    boxShadowColor: "rgba(0, 0, 0, 0.14)", //bóng quanh tab
    minWidth: "0", //Chiều rộng tối thiểu
    maxWidth: "unset", //Chiều rộng tối đa
    fontSize: ".875rem", //cỡ chữ
    backgroundGradient: true, //có hiển thị linear-gradient (background dải màu) hay không
  },
  cardHeaderStyle: {
    floatingHeaderPadding: "15px", //padding của header.
    defaultMarginTop: 5, //(không phải hover) độ đẩy lên của Header. Lưu ý chỉ nhập số px muốn đẩy lên không nhập dấu -!
    marginBottom: "0",
    borderRadius: "10px", //borderRadius mặc định của Header.
  },
  cardBodyStyle: {
    padding: "5px 0px 15px 0px", //khoảng cách trên phải dưới trái của body
    textAlign: "unset",
  },
  indicator: {
    color: ColorObject.primary.color, //Màu viền default bên dưới tab khi được chọn
  },
};

//pagination
const paginationStyle = {
  pagination: {
    padding: 0,
    margin: "20px 0px",
    borderRadius: "4px", // bo tron pagination
  },

  //css của các nút trong pagination
  paginationLink: {
    border: "0", //border các nút
    color: "#999999", //màu chữ
    borderRadius: "30px !important", //bo tròn các nút
    padding: "0px 11px",
    margin: "0 3px",
    minWidth: "30px", // chiều rộng tối thiểu
    height: "30px", // chiều cao
    minHeight: "auto", // chiều cao tối thiểu
    fontWeight: "400", //độ đậm chữ
    fontSize: "12px", // cỡ chữ
    background: "transparent", //background của các nút
  },
};
const typographyStyles = {
  borderThickness: 2, // độ dày của border typography nếu có
  h1FontSize: "60px", // fontSize cho variant h1
  h2FontSize: "48px",
  h3FontSize: "34px",
  h4FontSize: "28px",
  h5FontSize: "22px",
  h6FontSize: "18px",
  subtitle1FontSize: "12px",
  subtitle2FontSize: "11px",
  body1FontSize: "16px",
  body2FontSize: "14px",
  h1LineHeight: 1.5, // LineHeight cho variant h1
  h2LineHeight: 1.5,
  h3LineHeight: 1.5,
  h4LineHeight: 1.5,
  h5LineHeight: 1.5,
  h6LineHeight: 1.5,
  font1: "Muli",
  font2: "Saira",
  font3: "",
  font4: "",
  font5: "",

  // h1FontFamily: globalStyle.fontFamily, //fontFamily cho variant h1
  // h2FontFamily: globalStyle.fontFamily,
  // h3FontFamily: globalStyle.fontFamily,
  // h4FontFamily: globalStyle.fontFamily,
  // h5FontFamily: globalStyle.fontFamily,
  // h6FontFamily: globalStyle.fontFamily,
  noneRadius: "0px", //ko Radius
  lighterRadius: "8px", //radius nhẹ nhẹ
  strongRadius: "10px", //radius mạnh
  strongerRadius: "12px", //radius mạnh hơn nữa
  heavyRadius: "20px", //radius đậm
  superStrongRadius: "30px", // siêu mạnh
  XXLRadius: "38px", // siêu mạnh
  maximumRadius: "50%", // hết cở 50%
  thinWidth: "1px", // 1px width
  lighterWidth: "2px", //width nhẹ nhẹ
  strongWidth: "5px", //width mạnh
  superStrongWidth: "10px", // siêu mạnh
  maximumWidth: "15px", // hết cở
};
//infoArea
const infoAreaStyle = {
  infoArea: {
    maxWidth: "360px", //chiều rộng tối đa
    margin: "0 auto", //margin của infoArea
    padding: "0px", //padding của infoArea
  },
  // icon
  iconWrapper: {
    marginRight: "10px", //Khoảng cách phía bên phải giữa icon với phần tử khác
  },
  //title
  title: {
    color: "#3C4858", //màu chữ mặc định của title
    fontSize: "18px", //cỡ chữ của title
    margin: "0px",
  },
  //description
  description: {
    marginTop: "15px", //Khoảng cách phía trên giữa description với phần tử khác
    fontSize: "14px", //cỡ chữ của description
    color: "#000000", //Màu chữ mặc định của description
  },
  icon: {
    width: "36px", //độ rộng icon
    height: "36px", //độ cao icon
  },
};

//Các nút đặc biệt của pagination (first, prev, next, last)
const paginationSpecialButton = {
  first: <i className="fas fa-fast-backward"></i>,
  previous: <i className="fas fa-chevron-left"></i>,
  next: <i className="fas fa-chevron-right"></i>,
  last: <i className="fas fa-fast-forward"></i>,
};

export {
  sidebarStyle,
  globalStyle,
  tooltipStyle,
  cardStyles,
  buttonStyles,
  textFieldStyle,
  selectStyle,
  badgeStyle,
  modalManagerStyle,
  headdingStyle,
  customTabsStyles,
  checkboxStyle,
  tableStyle,
  paginationStyle,
  infoAreaStyle,
  paginationSpecialButton,
  accordionStyle,
  timelineStyles,
  snackbarStyles,
  gridSystemStyles,
  navPillsStyles,
  typographyStyles,
};
