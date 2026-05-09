import { forwardRef, KeyboardEvent } from 'react';

import { prettyCwd } from '~utils/fs';

interface Props {
    cwd: string[];
    value: string;
    onChange: (v: string) => void;
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const LivePromptInput = forwardRef<HTMLInputElement, Props>(
    ({ cwd, value, onChange, onKeyDown }, ref) => (
        <div
            className="term-prompt-host"
            style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 8,
                marginTop: 12,
                flexWrap: 'wrap',
            }}
        >
            <span style={{ color: 'var(--accent)' }}>afiqakm@dev</span>
            <span style={{ color: 'var(--dim)' }}>:</span>
            <span style={{ color: 'var(--muted)' }}>{prettyCwd(cwd)}</span>
            <span style={{ color: 'var(--dim)' }}>$</span>
            <span style={{ flex: 1, minWidth: 200 }}>
                <input
                    ref={ref}
                    autoFocus
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={onKeyDown}
                    spellCheck={false}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    style={{
                        all: 'unset',
                        width: '100%',
                        font: 'inherit',
                        color: 'var(--ink)',
                        caretColor: 'var(--accent)',
                    }}
                />
            </span>
        </div>
    ),
);

LivePromptInput.displayName = 'LivePromptInput';

export default LivePromptInput;
