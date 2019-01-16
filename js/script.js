const remote = require('electron').remote;
const {dialog} = require('electron').remote;
const request = require('request');
const cheerio = require('cheerio');

const fs = require('fs-extra');
const tunnel = require('tunnel-ssh');

require('./custom_modules/utils/enableContextMenu.js')();

const stripObservers = function(obj) {
	return JSON.parse(JSON.stringify(obj, null, 4));
}
const hasLink = function(arr, url) {
	var l = arr.length;
	while(l--) {
		if(arr[l] && arr[l].link == url) {
			return true;
		}
	}
	return false;
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
		upperPathLimit: '',
		discoveredUrls: [],
		visitedUrls: [],
		badUrls: [],
		currentUrl: ''

	},
	actions: {
		getNextUrl: function({ commit, state }) {
			if(state.isCrawling) {
				let url;
				if(state.discoveredUrls.length) {
					url = state.host + state.discoveredUrls[0];
					state.visitedUrls.push(state.discoveredUrls.shift());
				} else if(!state.visitedUrls.length) {
					url = store.state.host + state.upperPathLimit;
					state.visitedUrls.push(url);
				} else {
					commit("crawl", false);
					return;
				}
				commit("setCurrentUrl", url);
				console.log("current url", url);
				request(url, function (error, response, body) {
					if(error) {
						console.error(error);
					} else {
						let $ = cheerio.load(body);
						let a = [];
						$("a").each(function(i, el) {
							a.push($(el).attr("href"));
						});
						commit('addLinks', {links: a, page: url});
						store.dispatch("getNextUrl");
					}
				});
			}
		},
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
		addLink: function(state, args) {
			let link = args.link;
			if(link && !state.discoveredUrls.includes(link) && !state.visitedUrls.includes(link)) {
				if(link.indexOf('http') == 0) {
					state.badUrls.push({link: link, reason: "external link", page: args.page});
				} else if(link.indexOf("#") == 0) {
					state.badUrls.push({link: link, reason: "fragment", page: args.page});
				} else if(link.indexOf(state.upperPathLimit) !== 0) {
					state.badUrls.push({link: link, reason: "outside scope", page: args.page});
				} else {
					state.discoveredUrls.push(link);
				}
			}
		},
		addLinks: function(state, args) {
			if(args && args.links && args.links.length) {
				let l = args.links.length;
				while(l--) {
					store.commit("addLink", {link: args.links[l], page: args.page});
				}
			}
		},
		crawl: function(state, isCrawl) {
			state.isCrawling = isCrawl;
			if(isCrawl) {
				if(state.host.length) {
					store.dispatch("getNextUrl");
				} else {
					console.log("enter valid host to begin crawl");
					return;
				}
			}
		},
		setApplicationSettings: function(state, settings) {
		  for(let s in settings) {
		    Vue.set(state, s, settings[s]);
		  }
		},
		setCurrentUrl: function(state, url) {
			state.currentUrl = url;
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

store.dispatch("readSettings").then((settings) => {
	store.commit("setApplicationSettings", settings);
})

const app = new Vue({
	el: '#main-app'
});
