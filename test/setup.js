import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Hacer vi disponible globalmente
global.vi = vi;

expect.extend(matchers);

afterEach(() => {
  cleanup();
});