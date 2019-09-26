import React from 'react';
import AgoraRtcEngine from 'agora-electron-sdk';
import {APP_ID} from '../js/seting'

class App extends React.Component {
    constructor(props) {
        super(props)
        if (APP_ID === '') {
            alert('应用程序APP_ID不能为空!');
        } else {
            let rtcEngine = this.getRtcEngine();
            this.state = {}
            console.log(rtcEngine);
        }
    }

    // 初始化一个 AgoraRtcEngine 实例
    getRtcEngine() {
        console.log(APP_ID);
        let rtcEngine = new AgoraRtcEngine();
        rtcEngine.initialize(APP_ID);
        return rtcEngine;
        // this.subscribeEvents(this.rtcEngine)
        window.rtcEngine = rtcEngine;
    }

    onShareBtn = () => {
        // this.getRtcEngine()
        let rtcEngine = this.getRtcEngine();
        console.log(rtcEngine);
    }


    componentDidMount() {

    }

    render() {
        return (
            <div className="containers_box">
                <h2 className="live_title">基于声网electron sdk的直播间客户端</h2>
                <button type="primary" className="share_btn" onClick={this.onShareBtn}>开始共享屏幕</button>
            </div>
        )
    }
}

export default App;
