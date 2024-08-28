import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Note {
  'id' : bigint,
  'content' : string,
  'category' : [] | [string],
}
export type Result = { 'ok' : null } |
  { 'err' : string };
export type Result_1 = { 'ok' : Note } |
  { 'err' : string };
export interface _SERVICE {
  'addCategory' : ActorMethod<[string], Result>,
  'createNote' : ActorMethod<[[] | [string], string], bigint>,
  'deleteNote' : ActorMethod<[bigint], Result>,
  'getCategories' : ActorMethod<[], Array<string>>,
  'getNotes' : ActorMethod<[], Array<Note>>,
  'readNote' : ActorMethod<[bigint], Result_1>,
  'updateNote' : ActorMethod<[bigint, string], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
