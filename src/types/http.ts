export type Status = 'idle' | 'loading' | 'success' | 'error';

export type Error = {
  status: number;
  message: string;
};
