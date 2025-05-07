const methods = ['debug', 'info', 'warn', 'error', 'log'] as const

methods.forEach((method) => {
  if (typeof console[method] !== 'function') {
    console[method] = console.log;
  }
});