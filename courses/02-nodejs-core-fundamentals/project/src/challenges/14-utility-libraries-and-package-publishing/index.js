function formatPackageName(name) {
  return name.toLowerCase().replaceAll(" ", "-");
}

export { formatPackageName };

export function solve_14_utility_libraries_and_package_publishing() {
  const packageConfig = `{
    "name": "utility-package",
    "version": "1.0.0",
    "scripts": {
      "test": "node --test",
      "publish": "npm publish"
    }
  }`;

  const config = JSON.parse(packageConfig);
  const packageName = formatPackageName(config.name);
  const npmScript = config.scripts.test;

  return {
    packageName,
    packageVersion: config.version,
    packageExport: "./index.js",
    scripts: config.scripts,
    npmScript,
    publishWorkflow: config.scripts.publish
  };
}

