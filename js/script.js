const remote = require('electron').remote;
const {dialog} = require('electron').remote;
const request = require('request');
const cheerio = require('cheerio');

require('./custom_modules/utils/enableContextMenu.js')();

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
		upperPathLimit: '',
		discoveredUrls: [],
		visitedUrls: []

	},
	actions: {
		getNextUrl: function({ commit, state }, {host, path}) {
			if(host && path) {
				let url = host + path;
				request(url, function (error, response, body) {
					if(error) {
						console.error(error);
					} else {
						let $ = cheerio.load(body);
						let a = [];
						$("a").each(function(i, el) {
							a.push($(el).attr("href"));
						});
						commit('addLinks', a);
					}
				});
			}
		}
	},
	mutations: {
		addLink: function(state, link) {
			if(link && !state.discoveredUrls.includes(link) && !state.visitedUrls.includes(link)) {
				state.discoveredUrls.push(link);
			}
		},
		addLinks: function(state, links) {
			if(links && links.length) {
				let l = links.length;
				while(l--) {
					store.commit("addLink", links[l]);
				}
			}
		},
		crawl: function(state, isCrawl) {
			if(isCrawl) {
				if(state.host.length) {
					store.dispatch("getNextUrl", {host: state.host, path: state.upperPathLimit});
				} else {
					console.log("enter valid host to begin crawl");
					return;
				}
			}
			state.isCrawling = isCrawl;
		},
		updateHost: function(state, host) {
			state.host = host;
		},
		updateSubstituteHost: function(state, subHost) {
			state.substituteHost = subHost;
		},
		updateUpperPathLimit: function(state, path) {
			state.upperPathLimit = path;
		}
	}
});

const app = new Vue({
	el: '#main-app'
});