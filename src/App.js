import React, { useLayoutEffect, useState } from "react";
import './css/style.css';
import LotteryTiger from './tiger.js';

function App (){
    const [lottery, setlottery] = useState(null);
    const menu = [
        '鱼香肉丝',
        '肉末茄子',
    ];

    useLayoutEffect(() => {
        const lottery = new LotteryTiger(document.getElementById('js_toggle'), document.querySelectorAll('.roller')) // eslint-disable-line
        lottery.on('start',  () =>  {
            setTimeout( () => {
            var ret = [Math.round(Math.random() * 2)]
            lottery.setResult(ret)
        //            lottery.reset();
            }, 1000)
        })
        setlottery(lottery);
    }, [])

    return(
        <div class="m-ui-tiger">
            <div class="item">
            <ul class="roller">
                {
                    menu.map((item) => {
                        return (
                            <li key={item}>
                                {item}
                            </li>
                        )
                    })
                }
            </ul>
            </div>
            <a id="js_toggle" className="toggle" href="javascript:;" onClick={() => lottery?.draw()}></a>
        </div>
    );
  
}
export default App;