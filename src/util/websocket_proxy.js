import {Log} from 'bp_logger';

export class WebSocketProxy {
    constructor(wsurl, data) {
        this.url = wsurl;
        this.data = data;
        this.message_handler = ()=>{};
        this.disconnect_handler = ()=>{};
    }

    set_message_handler(handler) {
        this.message_handler = handler;
    }

    set_disconnect_handler(handler) {
        this.disconnect_handler = handler;
    }

    close() {
        return new Promise((resolve)=>{
            this.sock.onclose = ()=>{
                resolve();
            };
            this.sock.close();
        });
    }

    connect(protocol) {
        return new Promise((resolve, reject)=>{
            console.log("create new ws:\t"+this.url+"\t"+protocol);
            this.sock = new WebSocket(this.url, protocol);
            this.protocol = protocol;
            this.sock.binaryType = 'arraybuffer';
            this.connected = false;
            this.sock.onopen = ()=>{
                if (protocol=="rtsp") {
                    this._send(`WSP 1.0 INIT\r\nhost ${this.data.host}\r\nport ${this.data.port}\r\n\r\n`);
                    console.log("555555\t"+this.url);
                } else if (protocol == "rtp") {
                    this._send(`WSP 1.0 INIT\r\nRTSP ${this.data.sock_id}`);
                    console.log("666666\t"+this.url);
                }
            };
            this.sock.onmessage = (ev)=>{
                //console.log("message:"+ev.data);
                if (ev.data.startsWith('INIT')) {
                    this.sock.onmessage = (e)=> {
                        this.message_handler(e);
                    };
                    console.log('inited');
                    resolve(ev.data.substr(4).trim());
                } else {
                    console.log('reject');
                    reject();
                }
            };
            this.sock.onerror = (e)=>{
                Log.error(`[${this.protocol}] ${e.type}`);
                this.sock.close();
            };
            this.sock.onclose = (e)=>{
                Log.error(`[${this.protocol}] ${e.type}. code: ${e.code}`);
                this.disconnect_handler();
            };
        });
    }

    _send(data) {
        //console.log("websocket data:"+data);
        this.sock.send(data);
    }

    _sendCmd(cmd, is_string, data) {
        return new Promise((resolve, reject)=> {
            //this.requests.set(/*this.seq*/0, {resolve, reject});
            this._send(data/*Object.assign({
                type: "cmd",
                cmd: cmd,
                seq: this.seq,
                string: is_string
            }, data)*/);
        });
    }

    write(data, is_string) {
        return this._sendCmd("write", false, /*{data:btoa(*/data/*)}*/)
    }

    /*abort() {
        return Promise.resolve()//return this._sendCmd("abort", false, {data:''})
    }

    read_bytes(bytes, is_string) {
        //return this._sendCmd("read_bytes", is_string, {bytes:bytes})
        return Promise.resolve()
    }

    read_until(substring, is_string) {
        //return this._sendCmd("read_until", is_string, {sub:substring})
        return Promise.resolve()
    }

    drop_until(substring) {
        //return this._sendCmd("drop_until", false, {sub:substring})
        return Promise.resolve()
    }*/
}
