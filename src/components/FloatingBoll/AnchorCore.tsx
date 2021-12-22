import * as React from "react";
import { Context } from "./FloatingBoll";
import { componentsPrefix } from "./FloatingBoll";
import anime from 'animejs';

interface AnchorProps {
    anchorList?: Array<string>;
    size?: 'small' | 'middle' | 'large';
    focus?: boolean;
}

export const AnchorCore : React.FunctionComponent<AnchorProps> = (props: AnchorProps) => {
    // const anchorList = [];
    // props.anchorList.forEach(anchor => {
    //     anchorList.push(document.querySelector(`#${anchor}`));
    // });
    // const [anchorIndex, setIndex] = React.useState(0);
    
    const context = React.useContext(Context);
    let {
        size = 'middle',
        direction = 'up',
        distance = 10
    } = context;

    const arrowUpStyle = {

    }

    const arrowDownStyle = {

    }

    React.useEffect(() => { 
        anime.remove([`.${componentsPrefix}-anchor #ToTop`, `.${componentsPrefix}-anchor #ToBottom`]);
        anime({
            targets: `.${componentsPrefix}-anchor #ToTop`,
            translateY: props.focus ? '-50%' : 0,
            easing: 'easeOutCirc',
            duration: 1000,
        })
        anime({
            targets: `.${componentsPrefix}-anchor #ToBottom`,
            translateY: props.focus ? '50%' : 0,
            easing: 'easeOutCirc',
            duration: 1000,
        })
        
    }, [props.focus]);

    return ( 
        <>
            <svg className={componentsPrefix+'-anchor'} style={arrowUpStyle} viewBox="0 0 35 17.5">
                <polyline points="10 15, 25 15, 17.5 8" ></polyline>
                <g id="ToTop">
                    <polyline points="10 15, 25 15, 17.5 8" ></polyline>
                    <line x1="10" y1="7" x2="25" y2="7" stroke="red"></line>
                </g>
            </svg>
            <svg className={componentsPrefix+'-anchor'} style={arrowDownStyle} viewBox="0 0 35 17.5">
                <polyline points="10 2.5, 25 2.5, 17.5 9.5" ></polyline>
                <g id="ToBottom">
                    <polyline points="10 2.5, 25 2.5, 17.5 9.5" ></polyline>
                    <line x1="10" y1="10.5" x2="25" y2="10.5" stroke="red"></line>
                </g>
            </svg>
        </>
    );
}