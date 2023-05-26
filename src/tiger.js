import './modules/assign'
import Events from './modules/events'
import animationEnd from './modules/animationEnd'

class LotteryTigerRoller {
  constructor (elem, menu) {
    this.elem = elem
    this.items = elem.children
    this.menu = menu;

    // 克隆第一个节点 用于制作无限滚动效果
    this.elem.appendChild(this.items[0].cloneNode(true))
  }

  resize () {
    this.height = this.items[0].clientHeight
    if (!this.elem.classList.contains('fx-roll') && this.index > 0) this.elem.style.marginTop = -this.index * this.height + 'px'
  }

  reset () {
    this.elem.classList.remove('fx-roll')
    this.elem.classList.remove('fx-bounce')
    this.elem.style.marginTop = 0
    this.state = 0
  }

  start (timeout = 0) {
    if (this.state === 1) return
    this.state = 1
    setTimeout(() => {
      if (this.state !== 1) return
      this.elem.classList.add('fx-roll')
      this.elem.style.marginTop = 0
    }, timeout)
  }

  stop (index, callback, timeout = 0) {
    if (!this.height) this.height = this.items[0].clientHeight
    setTimeout(() => {
      if (this.state !== 1) return
      if(typeof index ===  'string'){
        const curIndex = this.menu.indexOf(index);
      }
        this.elem.classList.remove('fx-roll')
        this.elem.classList.add('fx-bounce')
        this.elem.style.marginTop = -index * this.height + 'px'
        animationEnd(this.elem, () => {
            this.state = 0
            this.elem.classList.remove('fx-bounce')
            if (callback) callback.call(this, index)
        })
    }, timeout)
  }
}

class LotteryTiger extends Events {
  constructor (toggle, rollers, menu, options) {
    super()
    this.menu = menu;
    this.options = Object.assign({
      interval: 100, // 每个roller间动画间隔
      aniMinTime: 3000, // 动画执行最少时间
      resize: true // roller大小是否是可变的
    }, options)
    this.toggle = toggle

    // 初始化滚轴
    this.rollerQueue = [new LotteryTigerRoller(rollers[0], this.menu)]    

    // 如果大小是可变的就绑定resize事件
    if (this.options.resize) {
      window.addEventListener('onorientationchange' in document ? 'orientationchange' : 'resize', () => {
        this.rollerQueue.forEach((roller) => roller.resize())
      })
    }
  }

  reset () {
    this.toggle.classList.remove('z-active')
    for (let i = 0, l = this.rollerQueue.length; i < l; i++) {
      this.rollerQueue[i].reset()
    }
    this.trigger('reset')
  }

  setResult (ret) {
    // 保证动画执行时间
    this.rollerQueue[0].stop(ret[0],  
        () => {
            this.toggle.classList.remove('z-active')
            this.trigger('end')
        }, 0);
  }

  draw () {
    if (this.toggle.classList.contains('z-active')){
        return
    } 
    if (this.has('start')) {
        this.trigger('start')
    }
    this._startTime = (new Date()).getTime();

    this.toggle.classList.add('z-active')
    this.rollerQueue[0].start(0 * this.options.interval)
  }
}


export default LotteryTiger
