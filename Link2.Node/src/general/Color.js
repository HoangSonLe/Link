let color = {
    sgc: {
        pink: "#ed0678",
        red: "#b81220",
        lightRed: '#f4dcde',
        HMBlue: "#008644",
        fontColorCoop: '#464646',
        blueCoop: '#133c8b',
        default:'#999999',
        primary:'#9C27B0',
        info: '#9C27B0',
        success: '#FFFFFF',
        warning:'#FF9800',
        danger:'#F44336',
        rose:'#E91E63',
    },
    twitter:'#55ACEE',
    facebook:'#3B5998',
    google:'#DD4B39',
    likedin:'#0976B4',
    youtube:'#E52D27',
    github:'#333333',
    // 
    link20: '#4a5f68',
};

let getStatusColor = status => {
    let color;
    switch(status){
        case 0:
            color = '#e47955';
            break;
        case 1:
            color = '#bda24e';
            break;
        case 2:
            color = '#1a80a2';
            break;
        case 3:
            color = '#8CBA53';
            break;
        case 4:
            color = '#0a6363';
            break;
        case 5:
            color = '#2d6362';
            break;
    }
    return color;
};
// nếu muốn sử dụng màu có sẵn của theme ("warning", "success", "info", ...) thì dùng prop color bình thường,
//  nếu muốn custom một màu khác cho components/CustomButtons/Button.jsx 
// vào file này (general/Color.js) thêm ở object buttonColor, ví dụ thêm trường sgcRed thì khi render
// một Button thì có thể truyền prop detailColor="sgcRed" để Button ăn màu color.sgc.red , xem bên dưới
// LƯU Ý: PHẢI MÀU HEXA
{/* <Button detailColor="sgcRed"> OK </Button> */}
let buttonColor = {
    sgcRed: color.sgc.red,
    sgcBlue: color.sgc.blueCoop,
    duy: '#333333',
    sgcDefault: color.sgc.default,
    link20Blue: '#4a5f68'
}
export {color, buttonColor, getStatusColor};
