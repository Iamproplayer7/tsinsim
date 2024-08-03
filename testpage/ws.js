class WSClient {
	constructor(url) {
		this.url = url;
		this.ws = false;

        this.events = [];
	}

    on(name, callback) {
        if(Array.isArray(name)) {
            for(const n_ of name) {
                this.events.push({ name: n_, callback });
            }
            return;
        }
        
        this.events.push({ name, callback });
    }

    fire(name, ...args) {
        this.events.forEach(event => {
            if(event.name == name) {
                event.callback(...args);
            }
        });
    }

	connect() {
		try {
			this.ws = new WebSocket(this.url);
			this.ws.binaryType = "blob";

			this.ws.onopen = (e) => { this.fire('open'); };
			this.ws.onerror = () => { this.fire('error'); };
            this.ws.onclose = (e) => { 
                this.fire('close');
                this.reconnect(1000); 
            };
            this.ws.onmessage = (e) => { this.fire('message', e.data); };
		} 
		catch (e) {
			setTimeout(() => {
				this.connect();
			}, 3000);
		}
	}

    reconnect(ms) {
        setTimeout(() => {
            this.connect();
        }, ms);
    }
}

const ws = new WSClient(_WS_CONNECT);
ws.connect();

ws.on('open', () => {
    ws.ws.send(JSON.stringify({ type: 'initiliazion', mType: _TYPE, publicToken: _PUBLIC_TOKEN }));
});

ws.on('message', (message) => {
    if(message == 'ping') {
        ws.ws.send('pong');
    }
});