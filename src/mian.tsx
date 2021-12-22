import * as React from "react";
import * as ReactDOM from "react-dom";
import {FloatingBoll} from "./components/FloatingBoll";
import Img from 'public/img/文件夹.png';

// * 该页面为测试页面

const customStyle: React.CSSProperties = {
    color: 'red',
};

const child = [
    {
        mainImg: Img,
        customStyle: {
            backgroundColor: 'yellow',
        },
    },
    {
        mainImg: Img,
    },
    {
        mainImg: Img,
        method: 'anchor'
    },
];

const customProps: {[index: string]: any} = {
    size: 'large',
    child: child,
    distance: 10,
    direction: 'left'
};


ReactDOM.render(
    <FloatingBoll customStyle={customStyle} {...customProps}/>,
     document.getElementById("root")
);
