import { FsDir, FsNode } from '~types/fs';

export function splitPath(p: string): string[] {
    return p.split('/').filter(Boolean);
}

export function resolve(cwd: string[], raw: string | undefined): string[] {
    if (raw === undefined || raw === '') return cwd.slice();
    if (raw === '~' || raw === '/') return [];

    let parts: string[];

    if (raw.startsWith('~/')) parts = splitPath(raw.slice(2));
    else if (raw.startsWith('/')) parts = splitPath(raw);
    else parts = cwd.concat(splitPath(raw));

    const out: string[] = [];

    for (const p of parts) {
        if (p === '.') continue;
        if (p === '..') { out.pop(); continue; }
        out.push(p);
    }

    return out;
}

export function nodeAt(root: FsNode, path: string[]): FsNode | null {
    let n: FsNode = root;

    for (const seg of path) {
        if (n.type !== 'dir') return null;
        const next = (n as FsDir).children.find((c) => c.name === seg);
        if (!next) return null;
        n = next;
    }

    return n;
}

export function prettyCwd(cwd: string[]): string {
    return '~' + (cwd.length ? '/' + cwd.join('/') : '');
}
