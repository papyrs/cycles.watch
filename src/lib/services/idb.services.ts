import {get, update} from 'idb-keyval';
import {DEFAULT_SETTINGS, IDB_KEY_CANISTER_IDS, IDB_KEY_SETTINGS} from '../constants/constants';
import type {Settings} from '../types/settings';

export const listCanisters = async (): Promise<string[]> => (await get(IDB_KEY_CANISTER_IDS)) ?? [];

export const addCanister = async (canisterId: string) =>
  update(IDB_KEY_CANISTER_IDS, (canisters: string[] | undefined) => [
    ...new Set([...(canisters ?? []), canisterId])
  ]);

export const removeCanister = async (canisterId: string) =>
  update(IDB_KEY_CANISTER_IDS, (canisters: string[] | undefined) => [
    ...(canisters ?? []).filter((id: string) => canisterId !== id)
  ]);

export const getSettings = async (): Promise<Settings> =>
  (await get(IDB_KEY_SETTINGS)) ?? DEFAULT_SETTINGS;

export const updateTimerInterval = async (timerInterval: number) =>
  update<Settings>(IDB_KEY_SETTINGS, (settings: Settings | undefined) => ({
    ...(settings ?? DEFAULT_SETTINGS),
    timerInterval
  }));

export const updateWarnTCycles = async (warnTCycles: number) =>
  update<Settings>(IDB_KEY_SETTINGS, (settings: Settings | undefined) => ({
    ...(settings ?? DEFAULT_SETTINGS),
    warnTCycles
  }));
