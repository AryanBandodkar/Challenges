export function solve_05_package_json_governance() {
  const packageJson = `{
    "name": "my-node-project",
    "version": "1.0.0",
    "dependencies": {
      "express": "^5.1.0"
    },
    "devDependencies": {
      "nodemon": "^3.1.10"
    },
    "scripts": {
      "start": "node src/main.js",
      "dev": "nodemon src/main.js",
      "test": "node --test"
    }
  }`;

  const config = JSON.parse(packageJson);
  const npmScript = config.scripts.dev;

  return {
    dependencies: config.dependencies,
    devDependencies: config.devDependencies,
    scripts: config.scripts,
    npmScript
  };

}
