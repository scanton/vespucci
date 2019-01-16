(function() {
	var componentName = 'crawl-parameters';
	var s = `
		<div class="` + componentName + ` container-fluid">
			<div class="path" style="float: right;">{{host + upperPathLimit}}</div>
			<h2>Crawl Parameters</h2>
			<div class="input-group">
				<div class="input-group-prepend">
					<span class="input-group-text">Host</span>
				</div>
				<input type="text" class="form-control" :value="host" @change-value="handleChangeHost" />
			</div>
			<div class="input-group">
				<div class="input-group-prepend">
					<span class="input-group-text">Substitute Host</span>
				</div>
				<input type="text" class="form-control" v-model="substituteHost" />
			</div>
			<div class="input-group">
				<div class="input-group-prepend">
					<span class="input-group-text">Upper Path Limit</span>
				</div>
				<input type="text" class="form-control" v-model="upperPathLimit" />
			</div>
			<div class="button-container" style="float: right">
				<button @click="handlePause" class="btn btn-warning" :class="{disabled: !isCrawling, enabled: isCrawling}">Pause</button>
				<button @click="handleCrawl" class="btn btn-success" :class="{disabled: isCrawling, enabled: !isCrawling}">Crawl</button>
			</div>
			<div style="clear: both;"></div>
		</div>
	`;

	Vue.component(componentName, {
		created: function() {

		},
		computed: {
			isCrawling: function() {
				return store.state.isCrawling;
			},
			host: {
				get() {
					return store.state.host;
				},
				set(value) {
					store.commit('updateHost', value)
				}
			},
			substituteHost: {
				get() {
					return store.state.substituteHost;
				},
				set(value) {
					store.commit('updateSubstituteHost', value);
				}
			},
			upperPathLimit: {
				get() {
					return store.state.upperPathLimit;
				},
				set(value) {
					store.commit('updateUpperPathLimit', value);
				}

			}
		},
		props: [],
		template: s,
		data: function() {
			return {}
		},
		methods: {
			handleCrawl: function() {
				store.commit("crawl", true);
			},
			handlePause: function() {
				store.commit("crawl", false);
			}
		}
	});
})();
