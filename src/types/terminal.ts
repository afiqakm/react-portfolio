import { FsNode } from './fs';

export type Entry =
    | { kind: 'prompt'; cwd: string[]; line: string }
    | { kind: 'err';    text: string }
    | { kind: 'text';   text: string }
    | { kind: 'tree';   text: string }
    | { kind: 'help';   items: [string, string][] }
    | { kind: 'cat';    text: string; name: string; path: string[] }
    | { kind: 'ls';     items: FsNode[]; path: string[] };
