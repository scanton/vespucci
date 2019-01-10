(function() {
	var componentName = 'vespucci';
	var s = `
		<div
			:class="{'modal-is-visible': isModalVisible, 'show-context-sidebar': isContextSidebarVisible, 'show-settings-sidebar': isSettingsSidebarVisible}" 
			class="` + componentName + ` container-fluid"
		>
			<div class="contents row">
				<div class="col">
					<site-test-mode-options></site-test-mode-options>
					<crawl-parameters></crawl-parameters>
					<results></results>
				</div>
			</div>
			<modal-dialog></modal-dialog>
		</div>
	`;
	
	Vue.component(componentName, {
		created: function() {
			
		},
		computed: {
			isContextSidebarVisible: function() {
				return store.state.isContextSidebarVisible;
			},
			isModalVisible: function() {
				return store.state.isModalVisible;
			},
			isSettingsSidebarVisible: function() {
				return store.state.isSettingsSidebarVisible;
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
