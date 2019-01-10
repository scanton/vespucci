const remote = require('electron').remote;
const {dialog} = require('electron').remote;

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
		upperPathLimit: ''

	},
	mutations: {

	}
});

const app = new Vue({
	el: '#main-app'
});