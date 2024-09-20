

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.Bh7rBzsB.js","_app/immutable/chunks/scheduler.BZ194UJb.js","_app/immutable/chunks/index.CwL_Cdf_.js","_app/immutable/chunks/entry.DS8TIsSo.js"];
export const stylesheets = [];
export const fonts = [];
