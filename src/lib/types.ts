export interface SuperSonicInstance {
	init(): Promise<void>;
	nextNodeId(): number;
	loadSynthDef(name: string): Promise<void>;
	loadSample(
		bufnum: number,
		source: string | ArrayBuffer | ArrayBufferView | Blob
	): Promise<unknown>;
	send(...args: (string | number)[]): void;
}

export interface SuperSonicConfig {
	baseURL: string;
	coreBaseURL: string;
	synthdefBaseURL: string;
	debug?: boolean;
}

export type StatusKind = '' | 'ok' | 'error';

export type EngineHealth = {
	status: 'ok' | 'warn' | 'error';
	audioContextState: string; // 'running' | 'suspended' | 'closed' | '' (before first poll)
	messagesDropped: number; // scsynthMessagesDropped cumulative counter
	inBufferPct: number; // inBufferUsed.percentage, rounded
	outBufferPct: number; // outBufferUsed.percentage, rounded
};
