const video1 = $('#video1');
const video2 = $('#video2');

const videoTitle = $('#videoTitle');
const iframe = $("#web");
const image = $('#image');
const text = $("#text");
const version = $("#version");
var debug = true;

var activeVideo = 1;
// selected for 3D audio

class ContentHandler {
	constructor() {
		this.live = false;
		this.video = false;
		this.image = false;
		this.version = false;
	}

	setVersion(v) {
		this.version = v;
		version.text('PVersion: ' + v);
	}

	showText(status) {
		status ? text.show() : text.hide();
	}

	setText(t, show = false) {
		text.text(t);
		this.showText(show);

		if(debug) console.log('[PDebug] setText: ' + t + ' (show: ' + show + ')');
	}

	setVideoTitle(text) {
		if(!this.video) return videoTitle.hide();
		videoTitle.text(text);

		// test
		videoTitle.show();
		videoTitle.css({'left': '-' + videoTitle.width() + 'px'}).animate({'left': '50%'}, 2000, () => {
			if(!this.video) {
				return videoTitle.css({'left': '-' + videoTitle.width() + 'px'}).hide();
			}

			setTimeout(() => {
				if(!this.video) {
					return videoTitle.css({'left': '-' + videoTitle.width() + 'px'}).hide();
				}

				videoTitle.animate({'left': '-' + videoTitle.width() + 'px'}, 2000, () => {
					videoTitle.hide()
				});
			}, 2500);
		});
	}

	setDefaultBackground(withAuthor) {
		$('body').css('background-image', 'url(\'/player_/background' + (withAuthor ? '' : '-d') + '.png\')');
	}

	start(type, data) {
		switch(type) {
			case 'live':
				this.stop('video');
				this.stop('image');

				this.live = true;

				iframe.attr('src', '');
				setTimeout(() => {
					if(!this.live) return;
					iframe.attr('src', data.url);
					iframe.show();
				}, 500);

				if(debug) console.log('[PDebug] start: live');

				break;

			case 'video':
				this.stop('live');
				this.stop('image');

				if(!this.video) {
					this.video = true;
				}

				const selectedVideo = activeVideo === 1 ? 2 : 1;
				const selectedVideoElement = activeVideo === 1 ? video2 : video1;
				const lastVideoElement = activeVideo === 1 ? video1 : video2;

				selectedVideoElement.get(0).src = data.url;
				selectedVideoElement.get(0).currentTime = data.currentTime;
				selectedVideoElement.get(0).playbackRate = 1;
				selectedVideoElement.get(0).volume = 0;

				var f = false;
				selectedVideoElement.on('canplaythrough', () => {
					if(f) return; f = true;						
					if(!this.video) return;

					activeVideo = selectedVideo;
					selectedVideoElement.get(0).volume = data.volume;
					selectedVideoElement.get(0).play();

					lastVideoElement.fadeOut(500, () => {
						if(!this.video) return;

						lastVideoElement.get(0).src = '';
						lastVideoElement.get(0).volume = 0;

						selectedVideoElement.fadeIn(500, () => {
							if(!this.video) return;
	
							this.setVideoTitle(data.title);
							this.setDefaultBackground(false);
						});
					});
				});
				

				if(debug) console.log('[PDebug] start: video, title: ' + data.title + ', currentTime: ' + data.currentTime + ', volume: ' + data.volume);
				break;

			case 'image':
				this.stop('live');
				this.stop('video');

				if(this.image) {
					image.fadeOut(1000, () => {
						if(!this.image) return;

						image[0].src = data.url;
						image.fadeIn(1000);
					});
				}
				else {
					this.image = true;
					image[0].src = data.url;
					image.fadeIn(1000);
				}

				if(debug) console.log('[PDebug] start: image');
			default:
		}
	}

	update(type, data) {
		switch(type) {
			case 'live': 
				if(!this.live) return;
				if(debug) console.log('[PDebug] update: live, url: ' + data.url);

				iframe.attr('src', '');
				setTimeout(() => {
					if(!this.live) return;
					iframe.attr('src', data.url);
				}, 500);
				break;

			case 'video':
				// update current time
				if(data.currentTime !== undefined) {
					const videoP = activeVideo == 1 ? video1.get(0) : (activeVideo == 2 ? video2.get(0) : false);
					if(videoP) {
						var pRate = 1;
						const currentTime = videoP.currentTime;
						if(currentTime-data.currentTime > 2 || currentTime-data.currentTime < -2) {
							videoP.currentTime = data.currentTime;
						}
						else {
							// local experimental resyncer,sasa
							// allows perfectly sync video/audio over time to maximum 10ms delay
							pRate = Math.floor((1-((currentTime-data.currentTime)/10))*1000)/1000;
							videoP.playbackRate = pRate > 1.2 ? 1.2 : (pRate < 0.8 ? 0.8 : pRate);
						}

						if(debug) console.log('[PDebug] update: video, currentTime: ' + data.currentTime + ' (' + Math.floor((currentTime-data.currentTime)*100)/100 + ' s., adjust: ' + pRate + ', activeVideo: ' + activeVideo + ')');
					}
				}

				// update volume
				if(data.volume !== undefined) {
					const videoP = activeVideo == 1 ? video1.get(0) : (activeVideo == 2 ? video2.get(0) : false);
					if(videoP) {
						videoP.volume = data.volume;
					}

					if(debug) console.log('[PDebug] update: video, volume: ' + data.volume + ', activeVideo: ' + activeVideo);
				}
				break;
			case 'image': 
				if(debug) console.log('[PDebug] update: image');
				break;

			default:
		}
	}

	stop(type) {
		switch(type) {
			case 'all':
				this.stopAll();
				if(debug) console.log('[PDebug] stop: all');
				break;

			case 'live':
				if(!this.live) return;
				this.live = false;

				iframe.attr('src', '');
				iframe.hide();

				if(debug) console.log('[PDebug] stop: live');
				break;
				
			case 'video':
				if(!this.video) return;
				this.video = false;

				const selectedVideoElement = activeVideo === 1 ? video1 : (activeVideo === 2 ? video2 : false);
				if(selectedVideoElement) {
					selectedVideoElement.get(0).src = '';
					selectedVideoElement.get(0).volume = 0;
				}

				videoTitle.hide();
				this.setDefaultBackground(true);

				if(debug) console.log('[PDebug] stop: video');
				break;

			case 'image':
				if(!this.image) return;
				this.image = false;
				image.src = '';
				image.hide();

				if(debug) console.log('[PDebug] stop: image');
				break;
			default:
		}
	}

	stopAll() {
		this.stop('live');
		this.stop('video');
		this.stop('image');

		if(debug) console.log('[PDebug] stop: all');
	}
}

const Content = new ContentHandler;
Content.setVersion(_VERSION);

ws.on('open', () => {
	if(debug) console.log('[PDebug] Connected to WebSocket.');
});

ws.on(['error', 'close'], () => {
	Content.stopAll();
	if(debug) console.log('[PDebug] Disconnected from WebSocket.');
});

ws.on('message', (rawData) => {
	var data = false;
	try { 
		data = JSON.parse(rawData);
	}
	catch(e) {}

	if(!data) return;
	
	if(data.type == 'start') {
		Content.start(data.which, data);
	}
	else if(data.type == 'update') {
		Content.update(data.which, data);
	}
	else if(data.type == 'stop') {
		Content.stop(data.which);
	}
	else if(data.type == 'reconnect') {
		if(debug) console.log('[PDebug] Reconnect.');
		window.location.href = window.location.href;
	}
});

// pdebug
if('alt' in window) {
	alt.on('pdebug', () => {
		debug = !debug;
		console.log('[PDebug] is ' + (debug ? 'enabled' : 'disabled'));
		
		if(debug) {
			console.log('[PDebug] getVersion: ' + Content.version);
			console.log('[PDebug] getProcessor: ' + (Content.video ? 'video' : (Content.live ? 'live' : (Content.image ? 'image' : 'none'))))
		}
	})
}