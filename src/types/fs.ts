export type FsFile = { type: 'file'; name: string; content: string };
export type FsDir  = { type: 'dir';  name: string; children: FsNode[] };
export type FsNode = FsFile | FsDir;
