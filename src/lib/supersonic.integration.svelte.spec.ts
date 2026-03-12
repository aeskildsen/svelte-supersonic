import { describe, it, expect, afterEach } from 'vitest';
import { userEvent } from 'vitest/browser';
import { boot, serverState, _stateForTesting } from './supersonic.svelte.js';
import { localConfig } from './test-utils.js';

// Integration tests: boots the real WASM engine in Chromium.
// These are slow (~5s) and require a user-gesture simulation — Vitest browser
// mode runs in a real browser context, so the AudioContext restriction applies.
// userEvent.click() on a DOM element satisfies the user-gesture requirement.

afterEach(() => {
	if (_stateForTesting._pollInterval) {
		clearInterval(_stateForTesting._pollInterval);
		_stateForTesting._pollInterval = null;
	}
	_stateForTesting.booted = false;
	_stateForTesting.booting = false;
	_stateForTesting.status = '';
	_stateForTesting.statusKind = '';
});

describe('boot() with local assets', () => {
	it('sets serverState.booted to true after a successful boot', async () => {
		// boot() must be called from a user-gesture context.
		// Clicking document.body via userEvent satisfies the AudioContext restriction.
		await userEvent.click(document.body);
		await boot(localConfig);

		expect(serverState.booted).toBe(true);
		expect(serverState.statusKind).toBe('ok');
	}, 15_000);
});
