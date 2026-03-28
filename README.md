# svelte-supersonic

Svelte 5 library that provides bindings for [SuperSonic](https://github.com/samaaron/supersonic).

> **Warning: Alpha software.** *svelte-supersonic* is in active development — the API is unstable and breaking changes should be expected between releases.

## Usage

```ts
import { boot, serverState, getServer, GROUPS } from 'svelte-supersonic';

// Must be called from a user gesture (click/keypress) — browser autoplay policy.
await boot();

// Reactive state
serverState.booted; // boolean
serverState.health; // EngineHealth

// OSC wrappers
const sc = getServer();
sc.synth('my-synth', 'source', { freq: 440, amp: 0.5 });
sc.set(nodeId, { freq: 880 });
sc.free(nodeId);
```

By default, SuperSonic assets are loaded from jsDelivr CDN. To override (e.g. for offline use), pass config to `boot()`:

```ts
// Self-hosted: copy npm package dist files into static/
await boot({
	baseURL: '/supersonic/dist/',
	coreBaseURL: '/supersonic/core/'
});
```

## Testing

Integration tests boot the real WASM engine in Chromium. Import `localConfig` from `test-utils.ts` to load assets from `node_modules` instead of CDN:

```ts
import { boot } from './supersonic.svelte.js';
import { localConfig } from './test-utils.js';

await boot(localConfig);
```

Run tests:

```sh
pnpm test:unit   # unit + integration (Chromium)
pnpm test:e2e    # Playwright e2e
pnpm test        # all
```
