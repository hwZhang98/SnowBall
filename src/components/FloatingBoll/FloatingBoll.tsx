import * as React from "react";
import "./style/index.css";
// * The basic ball component of the floating ball
import { FunctionBoll } from "./FunctionBoll";

// * Define the class name prefix
const prefix = 'SnowBoll';
export const componentsPrefix = prefix + '-' + 'floating-boll';

// * Interface to the base ball component
export interface FunctionBollProps {
    // * Background image of the component
    mainImg?: string;
    // * A custom style for the component
    customStyle?: React.CSSProperties;
    // * Whether the current ball is the parent container
    parent?: boolean;
    order?: number;
    // * The method hosted by the component
    method?: string | object;
    // * Whether the floating ball expands the ball list
    open?: boolean;
    handleClick?: React.MouseEventHandler<HTMLElement>;
}

// * Interface to the floating ball component
export interface FloatingBollProps extends FunctionBollProps{
    size?: 'small' | 'middle' | 'large';
    // * The child list of ball
    child?: Array<FloatingBollProps>;
    // * Direction of parent expansion
    direction?: 'left'|'right'|'up'|'down';
    // * The distance between the balls
    distance?: number;
};

// * Context carries some common attributes of the father
export const Context = React.createContext(null);

interface FloatingBollState {
    open: boolean;
};

export class FloatingBoll extends React.Component<FloatingBollProps, FloatingBollState> {
    constructor(props: FloatingBollProps){
        super(props);
        this.state = {
            open: props.open || false,
        }
    }

    // * Control whether to expand
    openChild = () => {
        this.setState((state) => ({
            open: !state.open
        }));
    };

    render(): JSX.Element {
        return (
            <>
            <Context.Provider value={this.props}>
                <div className={componentsPrefix+'-container'}>
                    <FunctionBoll parent={true} handleClick={this.openChild}></FunctionBoll>
                    { this.props.child?.length && this.props.child.map((props, i) => <FunctionBoll {...props} key={i} order={i+1} open={this.state.open}></FunctionBoll>)}
                </div>
            </Context.Provider>
            </>
        )
    }
}