import { create } from 'zustand';

import { Entry } from '~types/terminal';
import { executeCommand } from '~utils/commands';
import { portfolioFs } from '~utils/portfolioFs';

const BANNER = `   ▄▖▄▖▄▖▄▖   ▄▖▄ ▖▄▖▄▖▖
   ▌▌▙▖▐ ▌▌   ▌▌▙▘▛▌▌▌▌
   ▛▌▌ ▟▖█▌   ▛▌▌▌▌▌▛▌▙▖`;

const INITIAL_SCROLLBACK: Entry[] = [
    { kind: 'text', text: BANNER },
    { kind: 'text', text: "welcome. this is Afiq Akmal's portfolio — as a unix shell." },
    { kind: 'text', text: 'afiqakm · afiqakm.dev' },
    { kind: 'text', text: 'type help, or just start with: ls' },
    { kind: 'text', text: '' },
];

interface TerminalState {
    cwd: string[];
    scrollback: Entry[];
    input: string;
    cmdHistory: string[];
    historyIndex: number;
    setInput: (v: string) => void;
    runLine: (line: string) => void;
    navigateHistory: (dir: 1 | -1) => void;
    clearScrollback: () => void;
    pushEntry: (e: Entry) => void;
    reset: () => void;
}

export const useTerminalStore = create<TerminalState>()((set, get) => ({
    cwd: [],
    scrollback: INITIAL_SCROLLBACK,
    input: '',
    cmdHistory: [],
    historyIndex: -1,

    setInput: (v) => set({ input: v }),

    runLine: (line) => {
        const { cwd, cmdHistory } = get();
        const { entries, newCwd, clear } = executeCommand(line, cwd, portfolioFs);
        if (clear) {
            set({ scrollback: [], cwd: newCwd, input: '', historyIndex: -1 });
        } else {
            set((s) => ({
                scrollback: [...s.scrollback, ...entries],
                cwd: newCwd,
                input: '',
                historyIndex: -1,
                cmdHistory: line.trim() ? [line, ...cmdHistory].slice(0, 60) : cmdHistory,
            }));
        }
    },

    navigateHistory: (dir) => {
        const { cmdHistory, historyIndex } = get();
        if (dir === 1) {
            const next = Math.min(cmdHistory.length - 1, historyIndex + 1);
            if (next >= 0 && cmdHistory[next] !== undefined) {
                set({ historyIndex: next, input: cmdHistory[next] });
            }
        } else {
            const next = historyIndex - 1;
            if (next < 0) set({ historyIndex: -1, input: '' });
            else set({ historyIndex: next, input: cmdHistory[next] || '' });
        }
    },

    clearScrollback: () => set({ scrollback: [] }),

    pushEntry: (e) => set((s) => ({ scrollback: [...s.scrollback, e] })),

    reset: () => set({
        cwd: [],
        scrollback: INITIAL_SCROLLBACK,
        input: '',
        cmdHistory: [],
        historyIndex: -1,
    }),
}));
