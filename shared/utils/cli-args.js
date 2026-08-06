export function getArg(name, argv = process.argv) {
  const equalsPrefix = `--${name}=`;
  const equalsEntry = argv.find((value) => value.startsWith(equalsPrefix));
  if (equalsEntry) {
    const value = equalsEntry.slice(equalsPrefix.length).trim();
    return value || null;
  }

  const flagIndex = argv.findIndex((value) => value === `--${name}`);
  if (flagIndex !== -1) {
    const nextValue = argv[flagIndex + 1];
    if (nextValue && !nextValue.startsWith('--')) {
      const value = nextValue.trim();
      return value || null;
    }
  }

  return null;
}

export function hasFlag(name, argv = process.argv) {
  return argv.includes(`--${name}`);
}
