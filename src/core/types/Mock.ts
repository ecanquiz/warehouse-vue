import type { Mock } from 'vitest'

export type MockWithScrollTo = Mock & {
    (options?: ScrollToOptions): void;
    (x: number, y: number): void;
}
