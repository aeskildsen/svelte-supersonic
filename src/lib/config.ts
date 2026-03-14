import type { SuperSonicConfig } from './types.js';
import pkg from '../../package.json' with { type: 'json' };

// Sourced from devDependencies in package.json — kept in sync automatically.
// The caret range (^0.61.0) is stripped to get the pinned minimum version.
export const SUPERSONIC_VERSION = (pkg.devDependencies['supersonic-scsynth'] as string).replace(
	/^\^/,
	''
);

export const defaultConfig: SuperSonicConfig = {
	baseURL: `https://cdn.jsdelivr.net/npm/supersonic-scsynth@${SUPERSONIC_VERSION}/dist/`,
	coreBaseURL: `https://cdn.jsdelivr.net/npm/supersonic-scsynth-core@${SUPERSONIC_VERSION}/`,
	synthdefBaseURL: 'https://cdn.jsdelivr.net/npm/supersonic-scsynth-synthdefs@latest/synthdefs/',
	debug: false
};
