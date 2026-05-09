import { Fragment } from 'react';

import { FsNode } from '~types/fs';
import { Entry } from '~types/terminal';

import PromptLine from './PromptLine';

interface Props {
    entry: Entry;
    onPath: (n: FsNode, parentPath: string[]) => void;
}

const ScrollbackEntry = ({ entry: e, onPath }: Props) => {
    if (e.kind === 'prompt') return <PromptLine cwd={e.cwd} line={e.line} />;

    if (e.kind === 'err') return <div style={{ color: '#ff8c7a' }}>{e.text}</div>;

    if (e.kind === 'text') return <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{e.text}</pre>;

    if (e.kind === 'tree') return <pre style={{ margin: 0, color: 'var(--muted)' }}>{e.text}</pre>;

    if (e.kind === 'help') return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'max-content 1fr',
            columnGap: 24,
            rowGap: 2,
        }}>
            {e.items.map(([cmd, desc]) => (
                <Fragment key={cmd}>
                    <span style={{ color: 'var(--accent)' }}>{cmd}</span>
                    <span style={{ color: 'var(--muted)' }}>{desc}</span>
                </Fragment>
            ))}
        </div>
    );

    if (e.kind === 'cat') return (
        <pre
            className="term-cat-block"
            style={{
                margin: '4px 0 6px',
                whiteSpace: 'pre-wrap',
                background: 'var(--panel)',
                border: '1px solid var(--border)',
                borderRadius: 6,
                color: 'var(--ink)',
            }}
        >
            <span style={{ color: 'var(--dim)', fontSize: 11 }}>── {e.path.join('/') || e.name} ──</span>
            {'\n'}
            {e.text}
        </pre>
    );

    if (e.kind === 'ls') return (
        <div className="term-ls-grid">
            {e.items.map((n) => {
                const isDir = n.type === 'dir';
                return (
                    <button
                        key={n.name}
                        onClick={() => onPath(n, e.path)}
                        style={{
                            all: 'unset',
                            cursor: 'pointer',
                            textAlign: 'left',
                            color: isDir ? 'var(--accent)' : 'var(--ink)',
                            padding: '1px 4px',
                            borderRadius: 3,
                        }}
                        onMouseEnter={(ev) => { ev.currentTarget.style.background = 'var(--border)'; }}
                        onMouseLeave={(ev) => { ev.currentTarget.style.background = 'transparent'; }}
                    >
                        {isDir ? '▸ ' : '· '}{n.name}{isDir ? '/' : ''}
                    </button>
                );
            })}
        </div>
    );

    return null;
};

export default ScrollbackEntry;
