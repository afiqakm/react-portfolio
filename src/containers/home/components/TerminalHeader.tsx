const DOT_COLORS = ['#ff5f57', '#febc2e', '#28c840'];

const TerminalHeader = () => (
    <header
        className="term-header"
        style={{
            position: 'sticky',
            top: 0,
            zIndex: 5,
            background: 'var(--bg)',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: 12,
        }}
    >
        {DOT_COLORS.map((bg) => (
            <span
                key={bg}
                style={{ width: 12, height: 12, borderRadius: '50%', background: bg, flexShrink: 0, display: 'inline-block' }}
            />
        ))}
        <span
            className="hidden sm:inline"
            style={{ marginLeft: 16, color: 'var(--muted)' }}
        >
            ~/afiqakm · zsh
        </span>
        <span
            className="hidden sm:inline"
            style={{ marginLeft: 'auto', color: 'var(--dim)' }}
        >
            v1.0 · interactive · type 'help'
        </span>
    </header>
);

export default TerminalHeader;
