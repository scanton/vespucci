(function() {
	var componentName = 'crawl-parameters';
	var s = `
		<div class="` + componentName + ` container-fluid">
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
				<input type="text" class="form-control" :value="substituteHost" />
			</div>
			<div class="input-group">
				<div class="input-group-prepend">
					<span class="input-group-text">Upper Path Limit</span>
				</div>
				<input type="text" class="form-control" :value="upperPathLimit" />
			</div>
			<button class="btn btn-success" :class="{enabled: !isCrawling}">Crawl</button>
			<button class="btn btn-warning" :class="{enabled: isCrawling}">Pause</button>
		</div>
	`;
	
	Vue.component(componentName, {
		created: function() {
			
		},
		computed: {
			isCrawling: function() {
				return store.state.isCrawling;
			},
			host: function() {
				return store.state.host;
			},
			substituteHost: function() {
				return store.state.substituteHost;
			},
			upperPathLimit: function() {
				return store.state.upperPathLimit;
			}
		},
		props: [],
		template: s,
		data: function() {
			return {}
		},
		methods: {
			
		}
	});
})();
