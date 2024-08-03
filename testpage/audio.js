import * as THREE from 'three';

const _FREQUENCIES = [32, 64, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];
const _FREQUENCIES_TYPES = ['lowshelf', 'peaking', 'peaking', 'peaking', 'peaking', 'peaking', 'peaking', 'peaking', 'peaking', 'highshelf'];

class World_ {
	constructor() {
		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(
			50,
			1920 / 1080,
			1,
			10000
    	);

		// audio 
		this.listener = new THREE.AudioListener();
		this.context = this.listener.context;

		this.sourceVideo1 = this.context.createMediaElementSource(video1.get(0));
		this.sourceVideo2 = this.context.createMediaElementSource(video2.get(0));
		this.source2 = false;

		this.audioEmitters = [];

		// fix buffering
		setInterval(() => {
			this.context.resume();
		}, 1000);

		// fix livestream audio
		setInterval(() => {
			if(iframe.contents().find('video')[0] !== undefined) {
				if(!this.source2) {
					this.source2 = this.context.createMediaElementSource(iframe.contents().find('video')[0]);
				
					for(const audio of this.audioEmitters) {
						audio.setNodeSource(this.source2);
					}
				}
			}
			else {
				this.source2 = false;

				for(const audio of this.audioEmitters) {
					audio.setNodeSource(activeVideo == 1 ? this.sourceVideo1 : this.sourceVideo2);
				}
			}
		}, 100);

		this.camera.add(this.listener);
		this.camera.position.set(0, 0, 0);
	}

	createAudioEmitter(listener, source, speaker) {
		const audio = new THREE.PositionalAudio(listener);
		audio.setFilters(this.createFilterForAudioEmitter(audio));
		audio.setNodeSource(source);

		//audio.panner.panningModel =

		audio.position.set(speaker.position.x, speaker.position.y, speaker.position.z);
		audio.setDistanceModel("inverse");
		audio.setRefDistance(1 * 20);
		audio.setVolume(1 / 2);
		audio.setRolloffFactor(5);

		this.scene.add(audio);
		this.audioEmitters.push(audio);
	}

	createFilterForAudioEmitter(audio) {
		const filters = [];

        for(const frequency of _FREQUENCIES) {
            const filter = audio.context.createBiquadFilter();
			filter.customType = 'biquad';
			filter.Q.value = 1;
            filter.type = _FREQUENCIES_TYPES[_FREQUENCIES.indexOf(frequency)];
            filter.frequency.value = frequency;
            filter.gain.value = _FILTERS[_FREQUENCIES.indexOf(frequency)];
            filters.push(filter);
        }

		// limiter
		const compressor = audio.context.createDynamicsCompressor();
		compressor.customType = 'compressor';
		compressor.threshold.value = 0;
		compressor.attack.value = 0;
		compressor.release.value = 0.2;
		compressor.ratio.value = 6;
		compressor.knee.value = 1;
		filters.push(compressor);

        return filters;
    }
}

var World = false;
if('alt' in window) {
	World = new World_;
	
	alt.on('audio:initEmitters', (speakers) => {
		for(const speaker of speakers) {
			World.createAudioEmitter(World.listener, activeVideo == 1 ? World.sourceVideo1 : World.sourceVideo2, speaker);	
		}
	});

	alt.on('audio:setCameraFov', (fov) => {
		World.scene.fov = fov;
	});
	
	alt.on('audio:setResolution', (width, height) => {
		World.camera.aspect = width/height;
		World.camera.updateProjectionMatrix();
	});

	var lastPos = { x: 0, y: 0, z: 0};
	var lastLookAt = { x: 0, y: 0, z: 0};
	alt.on('audio:setCameraPosition', (pos, lookAt) => {
		if(pos.x > 10000) return;

		// test
		pos = { x: Math.floor(pos.x), y: Math.floor(pos.y), z: Math.floor(pos.z) };
		lookAt = { x: Math.floor(lookAt.x), y: Math.floor(lookAt.y), z: Math.floor(lookAt.z) };

		var upd = false;
		if(JSON.stringify(lastPos) != JSON.stringify(pos)) {
			World.camera.position.set(pos.x, pos.y, pos.z);
			lastPos = pos;
			upd = true;
		}

		if(JSON.stringify(lastLookAt) != JSON.stringify(lookAt)) {
			World.camera.lookAt(lookAt.x, lookAt.y, lookAt.z);
			lastLookAt = lookAt;
			upd = true;
		}

		if(upd) {
			World.renderer.render(World.scene, World.camera);
		}

		// World.camera.position.set(pos.x, pos.y, pos.z);
		// World.camera.lookAt(lookAt.x, lookAt.y, lookAt.z);
		// World.renderer.render(World.scene, World.camera);
	});

	alt.on('audio:volume', (id, volume) => {
		World.audioEmitters.forEach((value, key) => {
			if(id == key) {
				value.setVolume(volume);
			}
		})
	});
}

window.addEventListener("message", (ev) => {
	const data = ev.data;
	if(data.type === undefined || data.args === undefined) return;

	if(!World) {
		World = new World_;
	}
	
	if(data.type == 'audio:initEmitters') {
		for(const speaker of data.args.speakers) {
			World.createAudioEmitter(World.listener, World.source, speaker);	
		}
	}
	else if(data.type == 'audio:setCameraFov') {
		World.scene.fov = data.args.fov;
	}
	else if(data.type == 'audio:setResolution') {
		World.camera.aspect = data.args.x/data.args.y;
		World.camera.updateProjectionMatrix();
	}
	else if(data.type == 'audio:setCameraPosition') {
		World.camera.position.set(data.args.pos.x, data.args.pos.y, data.args.pos.z);
		World.camera.lookAt(data.args.lookAt.x, data.args.lookAt.y, data.args.lookAt.z);
		World.renderer.render(World.scene, World.camera);
	}
});


/* filters */
ws.on('message', (rawData) => {
	var data = false;
	try { 
		data = JSON.parse(rawData);
	}
	catch(e) {}
	if(!data) return;

	if(data.type == 'updateFilters') {
		if(!World) return;

		World.audioEmitters.forEach((audio) => {
			for(const frequency of _FREQUENCIES) {
				const filter = audio.filters.find(f => f.customType == 'biquad' && f.frequency.value == frequency);
				if(filter) {
					filter.gain.setValueAtTime(parseInt(data.filters[ _FREQUENCIES.indexOf(frequency)]), audio.context.currentTime);
				}
			}
		})
	}
	else if(data.type == 'updateFilter') {
		if(!World) return;

		World.audioEmitters.forEach((audio) => {
			const filter = audio.filters.find(f => f.customType == 'biquad' && f.frequency.value == data.frequency);
			if(filter) {
				filter.gain.setValueAtTime(parseInt(data.value), audio.context.currentTime);
			}
		})
	}
	else if(data.type == 'defaultFilters') {
		if(!World) return;

		World.audioEmitters.forEach((audio) => {
			for(const filter of audio.filters.filter(f => f.customType == 'biquad')) {
				filter.gain.setValueAtTime(0, audio.context.currentTime);
			}
		})
	}
});

ws.on('compressor', (type, value) => {
	if(!World) return;

	World.audioEmitters.forEach((audio) => {
		const filter = audio.filters.find(f => f.customType == 'compressor');
		if(filter){
			filter[type].setValueAtTime(parseFloat(value), audio.context.currentTime);
		}
	})
});