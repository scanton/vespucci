(function() {
	var componentName = 'results';
	var s = `
		<div class="` + componentName + ` container-fluid">
			<div class="row">
				<div class="col-sm-12">
					<h2>Unfollowed</h2>
					<div class="row unfollowed">
						<div class="col-sm-4">
							<h3>
								Bad Scope 
								<sup><span class="badge badge-primary">{{ badScopeCount }}</span></sup>
							</h3>
							<ul>
								<li class="url" :class="url.reason" v-for="url in badScopeUrls">
									<span :title="url.page">{{ url.link }}</span>
								</li>
							</ul>
						</div>
						<div class="col-sm-4">
							<h3>
								External
								<sup><span class="badge badge-primary">{{ externalCount }}</span></sup>
							</h3>
							<ul>
								<li class="url" :class="url.reason" v-for="url in externalLinks">
									<span :title="url.page">{{ url.link }}</span>
								</li>
							</ul>
						</div>
						<div class="col-sm-4">
							<h3>
								Fragment
								<sup><span class="badge badge-primary">{{ fragmentCount }}</span></sup>
							</h3>
							<ul>
								<li class="url" :class="url.reason" v-for="url in fragments">
									<span :title="url.page">{{ url.link }}</span>
								</li>
							</ul>
						</div>
					</div>

					<!--
					<ul class="pages-visited-list">
						<li class="url" :class="url.reason" v-for="url in badUrls">
							{{ url.link }} 
							<span v-if="url.page">
								<strong>on: {{ url.page }}</strong>
							</span>
							<sup>({{ url.reason }})</sup>
						</li>
					</ul>
					-->
				</div>
				<div class="col-sm-6 col-xs-12">
					<h2>
						Pages Found
						<sup><span class="badge badge-primary">{{ foundCount }}</span></sup>
					</h2>
					<ol class="pages-found-list">
						<li class="url" v-for="url in discoveredUrls">
							{{ url }}
						</li>
					</ol>
				</div>
				<div class="col-sm-6 col-xs-12">
					<h2>
						Pages Visited
						<sup><span class="badge badge-primary">{{ visitedCount }}</span></sup>
					</h2>
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
			badScopeCount: function() {
				let u = store.state.badUrls;
				let l = u.length;
				let count = 0;
				while(l--) {
					let val = u[l];
					if(val.reason == "outside scope") {
						++count;
					}
				}
				return count;
			},
			badScopeUrls: function() {
				let u = store.state.badUrls;
				let l = u.length;
				let a = [];
				while(l--) {
					let val = u[l];
					if(val.reason == "outside scope") {
						a.unshift(val);
					}
				}
				return a;
			},
			badUrls: function() {
				return store.state.badUrls;
			},
			discoveredUrls: function() {
				return store.state.discoveredUrls;
			},
			foundCount: function() {
				return store.state.discoveredUrls.length;
			},
			externalCount: function() {
				let u = store.state.badUrls;
				let l = u.length;
				let count = 0;
				while(l--) {
					let val = u[l];
					if(val.reason == "external link") {
						++count;
					}
				}
				return count;
			},
			externalLinks: function() {
				let u = store.state.badUrls;
				let l = u.length;
				let a = [];
				while(l--) {
					let val = u[l];
					if(val.reason == "external link") {
						a.unshift(val);
					}
				}
				return a;
			},
			fragmentCount: function() {
				let u = store.state.badUrls;
				let l = u.length;
				let count = 0;
				while(l--) {
					let val = u[l];
					if(val.reason == "fragment") {
						++count;
					}
				}
				return count;
			},
			fragments: function() {
				let u = store.state.badUrls;
				let l = u.length;
				let a = [];
				while(l--) {
					let val = u[l];
					if(val.reason == "fragment") {
						a.unshift(val);
					}
				}
				return a;
			},
			upperPathLimit: function() {
				return store.state.upperPathLimit;
			},
			visitedCount: function() {
				return store.state.visitedUrls.length;
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
