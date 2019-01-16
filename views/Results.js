(function() {
	var componentName = 'results';
	var s = `
		<div class="` + componentName + ` container-fluid">
			<div class="row">
				<div class="col-sm-6 col-xs-12">
					<h2>Pages Found</h2>
					<ol class="pages-found-list">
						<li class="url" v-for="url in discoveredUrls">
							{{ url }}
						</li>
					</ol>
				</div>
				<div class="col-sm-6 col-xs-12">
					<h2>Pages Visited</h2>
					<ol class="pages-visited-list">
						<li class="url" v-for="url in visitedUrls">
							{{ url }}
						</li>
					</ol>
				</div>
			</div>
		</div>
	`;
	
	Vue.component(componentName, {
		created: function() {
			
		},
		computed: {
			discoveredUrls: function() {
				return store.state.discoveredUrls;
			},
			visitedUrls: function() {
				return store.state.visitedUrls;
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
