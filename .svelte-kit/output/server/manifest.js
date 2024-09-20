export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.CuDgjuWV.js","app":"_app/immutable/entry/app.C2vwXoNB.js","imports":["_app/immutable/entry/start.CuDgjuWV.js","_app/immutable/chunks/entry.DS8TIsSo.js","_app/immutable/chunks/scheduler.BZ194UJb.js","_app/immutable/entry/app.C2vwXoNB.js","_app/immutable/chunks/scheduler.BZ194UJb.js","_app/immutable/chunks/index.CwL_Cdf_.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
