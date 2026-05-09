import { prettyCwd } from '~utils/fs';

interface Props {
    cwd: string[];
    line: string;
}

const PromptLine = ({ cwd, line }: Props) => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <span style={{ color: 'var(--accent)' }}>afiqakm@dev</span>
        <span style={{ color: 'var(--dim)' }}>:</span>
        <span style={{ color: 'var(--muted)' }}>{prettyCwd(cwd)}</span>
        <span style={{ color: 'var(--dim)' }}>$</span>
        <span>{line}</span>
    </div>
);

export default PromptLine;
