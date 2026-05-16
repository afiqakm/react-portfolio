import { KeyboardEvent, useEffect, useRef } from 'react';


import LivePromptInput from './LivePromptInput';
import QuickCommandBar from './QuickCommandBar';
import ScrollbackEntry from './ScrollbackEntry';
import StatusBar from './StatusBar';
import TerminalHeader from './TerminalHeader';
// import TweaksPanel from './TweaksPanel';

import { portfolioFs } from '~utils/portfolioFs';
import { complete } from '~utils/commands';
import { FsNode } from '~types/fs';
import { useThemeStore } from '~store/themeStore';
import { useTerminalStore } from '~store/terminalStore';

const Terminal = () => {
    const { cwd, scrollback, input, setInput, runLine, navigateHistory, clearScrollback, pushEntry } = useTerminalStore();
    const { dark, accent } = useThemeStore();
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Apply theme to <html>
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
        document.documentElement.style.setProperty('--accent', accent);
    }, [dark, accent]);

    // Auto-scroll to bottom on new entries
    useEffect(() => {
        const el = scrollRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [scrollback]);

    // Auto-focus input on mount
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // Refocus on any body click (unless inside tweaks panel, a button, or selecting text)
    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if ((e.target as Element).closest('button')) return;
            if ((e.target as Element).closest('[data-tweaks-panel]')) return;
            const sel = window.getSelection();
            if (sel && sel.toString().length > 0) return;
            inputRef.current?.focus();
        };
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    const onPath = (n: FsNode, parentPath: string[]) => {
        const fullPath = parentPath.concat(n.name).join('/');
        if (n.type === 'dir') runLine(`cd ~/${fullPath}`);
        else runLine(`cat ~/${fullPath}`);
    };

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            runLine(input);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            navigateHistory(1);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            navigateHistory(-1);
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const result = complete(input, cwd, portfolioFs);
            if (result !== null) setInput(result);
        } else if (e.key === 'l' && e.ctrlKey) {
            e.preventDefault();
            clearScrollback();
        } else if (e.key === 'c' && e.ctrlKey) {
            e.preventDefault();
            pushEntry({ kind: 'prompt', cwd, line: input + '^C' });
            setInput('');
        }
    };

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <TerminalHeader />

            <div
                ref={scrollRef}
                style={{ flex: 1, overflowY: 'auto' }}
            >
                <main
                    className='term-main'
                    style={{ maxWidth: 1100, margin: '0 auto' }}
                >
                    {scrollback.map((e, i) => (
                        <div
                            key={i}
                            style={{ margin: e.kind === 'prompt' ? '12px 0 2px' : '0 0 2px' }}
                        >
                            <ScrollbackEntry entry={e} onPath={onPath} />
                        </div>
                    ))}

                    <LivePromptInput
                        ref={inputRef}
                        cwd={cwd}
                        value={input}
                        onChange={setInput}
                        onKeyDown={onKeyDown}
                    />
                </main>
            </div>

            <QuickCommandBar />
            <StatusBar />
            {/* <TweaksPanel /> */}
        </div>
    );
};

export default Terminal;
