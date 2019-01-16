(function() {
	var componentName = 'site-test-mode-options';
	var s = `
		<div class="` + componentName + ` container-fluid">
			<h2>Test Mode Options</h2>

			<div class="input-group">
				<div class="input-group-prepend">
					<span class="input-group-text">Test URL</span>
				</div>
				<input type="text" class="form-control" placeholder="" />
			</div>
			
		</div>
	`;
	
	Vue.component(componentName, {
		created: function() {
			
		},
		computed: {
			
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
