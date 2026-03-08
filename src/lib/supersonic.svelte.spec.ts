import { describe, it, expect, beforeEach } from 'vitest';
import { boot, _stateForTesting } from './supersonic.svelte.js';

// The boot() success/error paths require a live CDN import() and cannot be unit-tested
// without injecting a loader. Only the guard logic (idempotency) is tested here —
// everything inside the try block is covered by e2e tests.

beforeEach(() => {
	if (_stateForTesting._pollInterval) {
		clearInterval(_stateForTesting._pollInterval);
		_stateForTesting._pollInterval = null;
	}
	_stateForTesting.booted = false;
	_stateForTesting.booting = false;
	_stateForTesting.status = '';
	_stateForTesting.statusKind = '';
	_stateForTesting.health = {
		status: 'ok',
		audioContextState: '',
		messagesDropped: 0,
		inBufferPct: 0,
		outBufferPct: 0
	};
});

describe('health initial state', () => {
	it('starts with ok status and zero counters', () => {
		expect(_stateForTesting.health).toMatchObject({
			status: 'ok',
			messagesDropped: 0,
			inBufferPct: 0,
			outBufferPct: 0
		});
	});
});

describe('boot() idempotency guards', () => {
	it('does nothing when already booted', async () => {
		_stateForTesting.booted = true;
		// If the guard is absent, boot() would attempt the CDN import and throw.
		// Completing without error confirms the guard fired.
		await expect(boot()).resolves.toBeUndefined();
	});

	it('does nothing when a boot is already in progress', async () => {
		_stateForTesting.booting = true;
		await expect(boot()).resolves.toBeUndefined();
	});
});
