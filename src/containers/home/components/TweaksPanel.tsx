import { useState } from 'react';

import { useThemeStore } from '~store/themeStore';

const ACCENTS: { color: string; label: string }[] = [
    { color: '#7ee787', label: 'green' },
    { color: '#ff7a59', label: 'coral' },
    { color: '#5cc8ff', label: 'sky' },
    { color: '#ffd166', label: 'honey' },
    { color: '#b388ff', label: 'lavender' },
];

const TweaksPanel = () => {
    const [open, setOpen] = useState(false);
    const { dark, accent, setDark, setAccent } = useThemeStore();

    return (
        <>
            {/* Toggle button */}
            <button
                onClick={() => setOpen((v) => !v)}
                data-tweaks-panel=""
                title="Tweaks"
                style={{
                    all: 'unset',
                    position: 'fixed',
                    bottom: 44,
                    right: 16,
                    zIndex: 8,
                    cursor: 'pointer',
                    width: 28,
                    height: 28,
                    borderRadius: 7,
                    background: open ? 'var(--panel)' : 'transparent',
                    border: '1px solid var(--border)',
                    color: 'var(--dim)',
                    fontSize: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: 1,
                }}
            >
                ⚙
            </button>

            {/* Panel */}
            {open && (
                <div
                    data-tweaks-panel=""
                    style={{
                        position: 'fixed',
                        bottom: 80,
                        right: 16,
                        zIndex: 9,
                        width: 280,
                        maxWidth: 'calc(100vw - 24px)',
                        background: 'rgba(250,249,247,0.88)',
                        backdropFilter: 'blur(24px) saturate(160%)',
                        WebkitBackdropFilter: 'blur(24px) saturate(160%)',
                        border: '0.5px solid rgba(255,255,255,0.6)',
                        borderRadius: 14,
                        boxShadow: '0 1px 0 rgba(255,255,255,0.5) inset, 0 12px 40px rgba(0,0,0,0.22)',
                        color: '#29261b',
                        fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
                        fontSize: 11.5,
                        lineHeight: 1.4,
                        overflow: 'hidden',
                    }}
                >
                    {/* Header */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 8px 10px 14px',
                    }}>
                        <b style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.01em' }}>Tweaks</b>
                        <button
                            onClick={() => setOpen(false)}
                            style={{
                                all: 'unset',
                                cursor: 'pointer',
                                width: 22,
                                height: 22,
                                borderRadius: 6,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'rgba(41,38,27,0.55)',
                                fontSize: 13,
                            }}
                        >
                            ✕
                        </button>
                    </div>

                    {/* Body */}
                    <div style={{
                        padding: '2px 14px 14px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                    }}>
                        {/* Theme section label */}
                        <div style={{
                            fontSize: 10,
                            fontWeight: 600,
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                            color: 'rgba(41,38,27,0.45)',
                        }}>
                            Theme
                        </div>

                        {/* Dark mode toggle */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 500, color: 'rgba(41,38,27,0.72)' }}>Dark mode</span>
                            <button
                                onClick={() => setDark(!dark)}
                                style={{
                                    all: 'unset',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    width: 32,
                                    height: 18,
                                    borderRadius: 999,
                                    background: dark ? '#34c759' : 'rgba(0,0,0,0.15)',
                                    transition: 'background 0.15s',
                                    flexShrink: 0,
                                    display: 'block',
                                }}
                            >
                                <span style={{
                                    position: 'absolute',
                                    top: 2,
                                    left: dark ? 16 : 2,
                                    width: 14,
                                    height: 14,
                                    borderRadius: '50%',
                                    background: '#fff',
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.25)',
                                    transition: 'left 0.15s',
                                }} />
                            </button>
                        </div>

                        {/* Accent color */}
                        <div>
                            <div style={{
                                fontWeight: 500,
                                color: 'rgba(41,38,27,0.72)',
                                marginBottom: 6,
                            }}>
                                Accent
                            </div>
                            <div style={{ display: 'flex', gap: 6 }}>
                                {ACCENTS.map(({ color, label }) => (
                                    <button
                                        key={color}
                                        onClick={() => setAccent(color)}
                                        title={label}
                                        style={{
                                            all: 'unset',
                                            cursor: 'pointer',
                                            flex: 1,
                                            height: 30,
                                            borderRadius: 6,
                                            background: color,
                                            boxShadow: accent.toLowerCase() === color
                                                ? '0 0 0 2px #29261b, 0 2px 6px rgba(0,0,0,0.15)'
                                                : '0 0 0 0.5px rgba(0,0,0,0.12)',
                                            transition: 'box-shadow 0.1s',
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Try section label */}
                        <div style={{
                            fontSize: 10,
                            fontWeight: 600,
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                            color: 'rgba(41,38,27,0.45)',
                            paddingTop: 4,
                        }}>
                            Try
                        </div>

                        {/* Try commands */}
                        <div style={{
                            fontSize: 11,
                            color: 'rgba(41,38,27,0.65)',
                            lineHeight: 1.55,
                            fontFamily: 'ui-monospace, monospace',
                        }}>
                            <div><code>ls</code> — list current dir</div>
                            <div><code>cd work</code> — browse projects</div>
                            <div><code>open linea</code> — read a project</div>
                            <div><code>cat about.md</code> — read the long story</div>
                            <div><code>tree</code> — see everything</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TweaksPanel;
