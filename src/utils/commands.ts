import { FsDir, FsNode } from '~types/fs';
import { Entry } from '~types/terminal';

import { nodeAt, prettyCwd, resolve } from './fs';

const HELP_LINES: [string, string][] = [
    ['ls [path]',       'list directory contents'],
    ['cd <path>',       'change directory (cd, cd .., cd ~ all work)'],
    ['cat <file>',      'print file contents'],
    ['pwd',             'print working directory'],
    ['tree',            'show whole tree'],
    ['whoami',          'short bio'],
    ['open <project>',  'open a project (alias for cd work/<x> && cat readme.md)'],
    ['contact',         'how to reach me'],
    ['clear',           'clear the screen'],
    ['help',            'this list'],
];

function cmdLs(args: string[], cwd: string[], root: FsNode): Entry {
    const target = resolve(cwd, args[0]);
    const n = nodeAt(root, target);
    if (!n) return { kind: 'err', text: `ls: no such file or directory: ${args[0]}` };
    if (n.type === 'file') return { kind: 'ls', items: [n], path: target };
    return { kind: 'ls', items: (n as FsDir).children, path: target };
}

function cmdCd(
    args: string[],
    cwd: string[],
    root: FsNode,
): { kind: 'noop'; newCwd: string[] } | { kind: 'err'; text: string } {
    if (!args[0]) return { kind: 'noop', newCwd: [] };
    const target = resolve(cwd, args[0]);
    const n = nodeAt(root, target);
    if (!n) return { kind: 'err', text: `cd: no such directory: ${args[0]}` };
    if (n.type === 'file') return { kind: 'err', text: `cd: not a directory: ${args[0]}` };
    return { kind: 'noop', newCwd: target };
}

function cmdCat(args: string[], cwd: string[], root: FsNode): Entry {
    if (!args[0]) return { kind: 'err', text: 'cat: missing file operand' };
    const target = resolve(cwd, args[0]);
    const n = nodeAt(root, target);
    if (!n) return { kind: 'err', text: `cat: ${args[0]}: no such file` };
    if (n.type === 'dir') return { kind: 'err', text: `cat: ${args[0]}: is a directory` };
    return { kind: 'cat', text: n.content, name: n.name, path: target };
}

function cmdTree(args: string[], cwd: string[], root: FsNode): Entry {
    const start = nodeAt(root, resolve(cwd, args[0]));
    if (!start) return { kind: 'err', text: 'tree: no such directory' };
    const lines: string[] = [];
    const walk = (node: FsNode, prefix: string, isLast: boolean) => {
        const branch = prefix === '' ? '' : (isLast ? '└── ' : '├── ');
        lines.push(prefix + branch + node.name + (node.type === 'dir' ? '/' : ''));
        if (node.type === 'dir') {
            const next = prefix + (prefix === '' ? '' : (isLast ? '    ' : '│   '));
            node.children.forEach((c, i) => walk(c, next, i === node.children.length - 1));
        }
    };
    walk(start, '', true);
    return { kind: 'tree', text: lines.join('\n') };
}

export function executeCommand(
    line: string,
    cwd: string[],
    root: FsNode,
): { entries: Entry[]; newCwd: string[]; clear?: boolean } {
    const trimmed = line.trim();
    if (!trimmed) return { entries: [], newCwd: cwd };

    const tokens = trimmed.split(/\s+/);
    const cmd = tokens[0];
    const args = tokens.slice(1);
    const entries: Entry[] = [{ kind: 'prompt', cwd, line: trimmed }];
    let newCwd = cwd;

    const push = (e: Entry) => entries.push(e);

    switch (cmd) {
        case 'ls':
            push(cmdLs(args, cwd, root));
            break;
        case 'cd': {
            const r = cmdCd(args, cwd, root);
            if (r.kind === 'err') push(r);
            else newCwd = r.newCwd;
            break;
        }
        case 'cat':
        case 'less':
        case 'more':
            push(cmdCat(args, cwd, root));
            break;
        case 'pwd':
            push({ kind: 'text', text: prettyCwd(cwd) });
            break;
        case 'tree':
            push(cmdTree(args, cwd, root));
            break;
        case 'whoami':
            push({ kind: 'text', text: 'Afiq Akmal (afiqakm) · lead frontend / full-stack engineer · kuala lumpur · afiqakm.dev' });
            break;
        case 'help':
            push({ kind: 'help', items: HELP_LINES });
            break;
        case 'clear':
            return { entries: [], newCwd, clear: true };
        case 'contact':
        case 'hire':
            push(cmdCat(['~/contact.md'], [], root));
            break;
        case 'open': {
            if (!args[0]) {
                push({ kind: 'err', text: 'open: which project? (try: linea, halcyon, field-notes, pacer, saga)' });
                break;
            }
            const target = resolve([], `work/${args[0]}`);
            const n = nodeAt(root, target);
            if (!n) {
                push({ kind: 'err', text: `open: no such project: ${args[0]}` });
                break;
            }
            newCwd = target;
            push(cmdCat(['readme.md'], target, root));
            break;
        }
        case 'echo':
            push({ kind: 'text', text: args.join(' ') });
            break;
        case 'sudo':
            push({ kind: 'err', text: 'afiqakm is not in the sudoers file. this incident will be remembered.' });
            break;
        case 'rm':
            push({ kind: 'err', text: 'rm: nice try.' });
            break;
        case 'vim':
        case 'vi':
        case 'nano':
        case 'emacs':
            push({ kind: 'text', text: `${cmd}: this is a portfolio, not a holy war. type 'help' for what i can actually do.` });
            break;
        case 'exit':
        case 'quit':
            push({ kind: 'text', text: 'you can just close the tab, but i appreciate the formality.' });
            break;
        case 'date':
            push({ kind: 'text', text: new Date().toString() });
            break;
        case 'curl':
        case 'wget':
            push({ kind: 'err', text: `${cmd}: no network in this shell. try 'cat ~/links.txt'.` });
            break;
        default:
            push({ kind: 'err', text: `command not found: ${cmd}. try 'help'.` });
    }

    return { entries, newCwd };
}

const COMPLETABLE_CMDS = ['ls', 'cd', 'cat', 'pwd', 'tree', 'whoami', 'help', 'clear', 'open', 'contact', 'echo', 'date'];

export function complete(line: string, cwd: string[], root: FsNode): string | null {
    const tokens = line.split(/\s+/);
    if (tokens.length <= 1) {
        const m = COMPLETABLE_CMDS.filter((c) => c.startsWith(tokens[0] || ''));
        if (m.length === 1) return m[0] + ' ';
        return null;
    }
    const last = tokens[tokens.length - 1];
    const slash = last.lastIndexOf('/');
    const dirPart = slash >= 0 ? last.slice(0, slash + 1) : '';
    const namePart = slash >= 0 ? last.slice(slash + 1) : last;
    const dirNode = nodeAt(root, resolve(cwd, dirPart || '.'));
    if (!dirNode || dirNode.type !== 'dir') return null;
    const matches = dirNode.children.filter((c) => c.name.startsWith(namePart));
    if (matches.length === 1) {
        const m = matches[0];
        const completed = dirPart + m.name + (m.type === 'dir' ? '/' : ' ');
        tokens[tokens.length - 1] = completed;
        return tokens.join(' ');
    }
    return null;
}
