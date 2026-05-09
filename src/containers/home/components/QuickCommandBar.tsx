import { useTerminalStore } from '~store/terminalStore';

const QUICK_COMMANDS: [string, string][] = [
    ['ls',           'ls'],
    ['cd ..',        'cd ..'],
    ['cd ~',         'cd ~'],
    ['cd work',      'cd work'],
    ['cd writing',   'cd writing'],
    ['cd stack',     'cd stack'],
    ['open linea',   'open linea'],
    ['cat about.md', 'cat ~/about.md'],
    ['contact',      'contact'],
    ['tree',         'tree'],
    ['help',         'help'],
    ['clear',        'clear'],
];

const QuickCommandBar = () => {
    const runLine = useTerminalStore((s) => s.runLine);

    return (
        <div
            className="term-quickbar hide-scrollbar"
            style={{
                position: 'fixed',
                left: 8,
                right: 8,
                bottom: 36,
                zIndex: 6,
                gap: 6,
                padding: 6,
                background: 'var(--panel)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                boxShadow: '0 -4px 14px rgba(0,0,0,0.18)',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
            }}
        >
            {QUICK_COMMANDS.map(([label, cmd]) => (
                <button
                    key={label}
                    onClick={() => runLine(cmd)}
                    style={{
                        all: 'unset',
                        cursor: 'pointer',
                        borderRadius: 999,
                        padding: '7px 12px',
                        fontSize: 12,
                        border: '1px solid var(--border)',
                        background: 'var(--bg)',
                        color: 'var(--ink)',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                    }}
                >
                    {label}
                </button>
            ))}
        </div>
    );
};

export default QuickCommandBar;
