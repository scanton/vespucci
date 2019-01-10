(function() {
	var componentName = 'modal-dialog';
	var s = `
		<div :class="{'is-visible': isModalVisible}" class="` + componentName + `">
			<div class="dialog">
				<div class="title" v-html="title"></div>
				<div class="message" v-html="message"></div>
				<div class="button-container pull-right">
					<div class="buttons" v-html="buttons"></div>
				</div>
				<div class="clear"></div>
			</div>
		</div>
	`;
	
	Vue.component(componentName, {
		created: function() {
			
		},
		computed: {
			isModalVisible: function() {
				return store.state.isModalVisible;
			},
			message: function() {
				return store.state.modalMessage;
			},
			title: function() {
				return store.state.modalTitle;
			},
			buttons: function() {
				let s = '';
				let a = store.state.modalButtons;
				let l = a.length;
				for(let i = 0; i < l; i++) {
					let b = a[i];
					s += '<button class="btn btn-' + b.type + '" onclick="' + b.action + '"><span class="' + b.icon + '"></span>' + b.label + '</button>';
				}
				return s;
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
