import { globalStyle, ColorObject } from "StyleConfig.jsx";
let guid = {
  get: function () {
    return guid._get8() + guid._get8(true) + guid._get8(true) + guid._get8();
  },
  _get8: function (s) {
    let p = (Math.random().toString(16) + "000000000").substr(2, 8);
    return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
  },
};
export const getAvailableFontWeight = () => {
  return Object.keys(globalStyle.fontWeightValues);
}
let getColorFromName = (name) => {
  let c = "#ffffff";
  if (!name) {
    c = globalStyle.defaultColor;
    return c;
  }
  if (!ColorObject[name]) {
    throw `"${name}" is not in ColorObject`;
  }
  return ColorObject[name].color;
};

let getBorderWidthFromName = (name) => {
  let c = "0px";
  if (!name) {
    c = globalStyle.defaultBorderWidth;
    return c;
  }
  switch (name) {
    case "default":
      c = globalStyle.defaultBorderWidth;
      break;
    case "thin":
      c = globalStyle.thinBorderWidth;
      break;
    case "lighter":
      c = globalStyle.lighterBorderWidth;
      break;
    case "strong":
      c = globalStyle.strongBorderWidth;
      break;
    case "superStrong":
      c = globalStyle.superStrongtBorderWidth;
      break;
    case "maximum":
      c = globalStyle.maximumBorderWidth;
      break;
  }
  return c;
};

let getTextColorWithBackground = (name) => {
  let c = "#000000";
  if (!name) {
    c = globalStyle.textColorWithDefaultBackground;
    return c;
  }
  return ColorObject[name].textColorWithBackground;
};

let hexColorWithOpacity = function (hex, opacity) {
  return `${hex}${Math.round((opacity * 255) / 100).toString(16)}`;
};

let hexToRgb = function (hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

let rgbToHex = function (color) {
  if (color.includes("#")) {
    return color;
  } else {
    return "#00ff00";
  }
};
let getBoxShadowStyle = (style, color) => {
  let mainColor = globalStyle.defaultBoxShadowColor;

  if (color) mainColor = getColorFromName(color);
  if (style) {
    console.log("syle in if", style);
    // return globalStyle[`${style}BoxShadow`].replace("{color}", mainColor);
  }
  // console.log("color", mainColor)
};

let getDepedencyWithStyleString = (obj, hasSpace) => {
  let x = Object.keys(obj)
    .map((key) => {
      return `&${hasSpace == true ? " " : ""}$${key}`;
    })
    .join(",");
  return x;
};

let tryParseInt = (str) => {
  let retValue = str;
  if (str !== null) {
    if (!isNaN(str)) {
      retValue = parseInt(str) + "px";
    }
  }
  return retValue;
};

let getDarkerColor = (color, percent) => {
  if (!percent) {
    percent = 25;
  }
  if (color.indexOf("rgb") == 0) {
    color = rgbToHex(color);
  }
  var num = parseInt(color.slice(1), 16),
    amt = Math.round(2.55 * -percent),
    R = (num >> 16) + amt,
    G = ((num >> 8) & 0x00ff) + amt,
    B = (num & 0x0000ff) + amt;
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
};

let availableColors = Object.keys(ColorObject);
let availableBoderRadius = [
  "no",
  "lighter",
  "strong",
  "stronger",
  "heavy",
  "superStrong",
  "maximum",
];
let availableBorderWidth = [
  "default",
  "thin",
  "lighter",
  "strong",
  "superStrong",
  "maximum",
];
let availableVariant = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "subtitle1",
  "subtitle2",
  "body1",
  "body2",
  "caption",
  "button",
  "overline",
  "srOnly",
  "inherit",
];
let availableMarginAndPadding = [
  "no",
  "sm",
  "xs",
  "md",
  "lg",
  "lg1",
  "lg2",
  "lg3",
  "lg4",
  "lg5",
  "lg6",
];
let getValueFromPaddingOrMargin = (str) => {
  return globalStyle[`${str}MarginAndPadding`];
};

export {
  guid,
  getBoxShadowStyle,
  getValueFromPaddingOrMargin,
  getColorFromName,
  hexColorWithOpacity,
  hexToRgb,
  rgbToHex,
  getTextColorWithBackground,
  availableColors,
  getDarkerColor,
  getBorderWidthFromName,
  getDepedencyWithStyleString,
  availableBoderRadius,
  availableVariant,
  availableMarginAndPadding,
  availableBorderWidth,
  tryParseInt,
};
