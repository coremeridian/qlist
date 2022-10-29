export type Disjoint<T1, T2> = Extract<keyof T1, keyof T2> extends never
    ? T2
    : never;
