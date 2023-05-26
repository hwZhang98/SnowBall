import React, { useLayoutEffect, useState } from "react";
import './css/style.css';
import LotteryTiger from './tiger.js';

function App (){
    const [lottery, setlottery] = useState(null);
    // 结束时间
    const endTime = 3000;
    const menu = [
        '鱼香肉丝',
        '肉末茄子',
    ];

    useLayoutEffect(() => {
        const lottery = new LotteryTiger(document.getElementById('js_toggle'), document.querySelectorAll('.roller'), menu) // eslint-disable-line
        lottery.on('start',  () =>  {
            setTimeout(() => {
                var ret = [Math.round(Math.random() * 2)]
                lottery.setResult(ret)
        //            lottery.reset();
            }, endTime)
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