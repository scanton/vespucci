const remote = require('electron').remote;
const {dialog} = require('electron').remote;

const fs = require('fs-extra');
const tunnel = require('tunnel-ssh');

require('./custom_modules/utils/enableContextMenu.js')();

const stripObservers = function(obj) {
	return JSON.parse(JSON.stringify(obj, null, 4));
}

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		isCrawling: false,
		isContextSidebarVisible: false,
		isModalVisible: false,
		isSettingsSidebarVisible: false,
		isModalVisible: false,
		modalButtons: [],
		modalMessage: '',
		modalTitle: '',
		knownPaths: [],
		host: '',
		substituteHost: '',
		upperPathLimit: ''

	},
	actions: {
		readSettings: function({commit, state}) {
			return new Promise((resolve, reject) => {
				var path = __dirname + '/working_files/settings.json';
				fs.pathExists(path, (err, exists) => {
					if(exists) {
						fs.readJson(path, (err, data) => {
							if(err) {
								reject(err);
							} else {
								resolve(data);
							}
						});
					} else {
						resolve({});
					}
				});
			});
		}
	},
	mutations: {
		setApplicationSettings: function(state, settings) {
			for(let s in settings) {
				Vue.set(state, s, settings[s]);
			}
		}
	}
});

store.dispatch("readSettings").then((settings) => {
	store.commit("setApplicationSettings", settings);
})

const app = new Vue({
	el: '#main-app'
});