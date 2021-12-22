import * as React from "react";
import classNames from "classnames";
import Img from "public/img/抽屉.png";
import { Context } from "./FloatingBoll";
import { FunctionBollProps, componentsPrefix } from "./FloatingBoll";
import { AnchorCore } from "./AnchorCore";
import { size_map } from "../../config";

// * The basic ball component of the floating ball
export const FunctionBoll : React.FunctionComponent<FunctionBollProps> = (props: FunctionBollProps) => {
    const context = React.useContext(Context);
    const [focus, setFocus] = React.useState(false);
    let {
        size = 'middle',
        mainImg = Img,
        customStyle = {},
        direction = 'up',
        distance = 10
    } = context;
    
    const className = classNames([
        `${componentsPrefix}-${size}`,
        componentsPrefix,
        {[`${componentsPrefix}-parent`]: props.parent},
    ]);

    const handleFocus = () => {

        
        if(!focus){
            setFocus(true);
        }
    };

    const handleBlur = () => {    
        if(focus){
            setFocus(false);
        }
    };

    // * Custom style of subball
    const childStyle = props.customStyle || {};
    // * Background image of the subball
    const img = props.mainImg || mainImg;
    // * The subball is hidden by default before expanding
    const visible = props.parent ? 'visible' : 'hidden';

    // * Expansion rate
    const speed = props.order * 0.5 * 0.9**props.order;
    
    // * To calculate the displacement
    const [way, dis] =  translateWay(direction, props.order, size, distance);

    customStyle = {
        backgroundImage: `url(${mainImg})`,
        ...customStyle,
        ...childStyle,
        visibility: `${visible}`,
        transition: `all ${speed}s, transform 0.5s`,
    }
    customStyle[way] = 0;
    
    if(!props.parent && props.open){
        customStyle = {
            ...customStyle,
            visibility: 'visible',
        }
        customStyle[way] = dis;
    }
    
    return (
        <div className={className} style={customStyle} onClick={props.handleClick} onMouseEnter={handleFocus} onMouseLeave={handleBlur}>
            {props.method === 'anchor' ? <AnchorCore focus={focus}></AnchorCore> : null}
        </div>
    )

};

// * Control the displacement of the subball
function translateWay(direction: string, order: number, size: string, distance: number) : Array<string> {
    const base_dis:number = distance + size_map[size];
    const way_map : {[index: string]: Array<string>} = {
        'up': ['top', `-${base_dis*order}px`],
        'down':['top', `${base_dis*order}px`],
        'left': ['left', `-${base_dis*order}px`],
        'right': ['left', `${base_dis*order}px`],
    };
    return way_map[direction];
}
