import type { SuperSonicConfig } from './types.js';

/** Local asset config for integration tests — see README for offline deployment usage. */
export const localConfig: Partial<SuperSonicConfig> = {
	baseURL: '/node_modules/supersonic-scsynth/dist/',
	coreBaseURL: '/node_modules/supersonic-scsynth-core/'
};
