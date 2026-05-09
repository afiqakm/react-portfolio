const StatusBar = () => {
    const today = new Date().toLocaleDateString();

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 7,
            background: 'var(--panel)',
            borderTop: '1px solid var(--border)',
            padding: '6px 18px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 11,
            color: 'var(--dim)',
        }}>
            <span>NORMAL · ~/afiqakm · main</span>
            <span className="hidden sm:flex" style={{ gap: 18, display: 'flex' }}>
                <span>↑↓ history</span>
                <span>tab complete</span>
                <span>ctrl+l clear</span>
            </span>
            <span className="hidden sm:inline">{`UTF-8 · LF · ${today}`}</span>
        </div>
    );
};

export default StatusBar;
