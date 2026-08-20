export function solve_06_semver_lockfile_policy() {
  const currentVersion = "5.0.0";
  const requestedVersion = "5.2.0";

  const currentParts = currentVersion.split(".").map(Number);
  const requestedParts = requestedVersion.split(".").map(Number);

  const sameMajorVersion = currentParts[0] === requestedParts[0];

  const allowed = sameMajorVersion;

  return {
    currentVersion,
    requestedVersion,
    allowed,
    policy: allowed
      ? "Upgrade allowed"
      : "Upgrade blocked: major version change",
  };
}
