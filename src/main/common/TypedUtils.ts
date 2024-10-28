export type ClassAsyncify<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => Promise<infer R>
    ? T[K]
    : T[K] extends (...args: any[]) => infer R
    ? (...args: Parameters<T[K]>) => Promise<R>
    : T[K]
}
