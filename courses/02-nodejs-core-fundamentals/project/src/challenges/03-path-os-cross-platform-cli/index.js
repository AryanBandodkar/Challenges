import path from "node:path";
import os from "node:os";

export function solve_03_path_os_cross_platform_cli() {
 
  const filePath = path.join("data", "files", "example.txt");

  const normalizedPath = path.normalize(filePath);
  const platform = os.platform();
  const architecture = os.arch();
  const homeDirectory = os.homedir();

 
  return {
    filePath,
    normalizedPath,
    platform,
    architecture,
    homeDirectory,
    separator: path.sep,
  };
}
