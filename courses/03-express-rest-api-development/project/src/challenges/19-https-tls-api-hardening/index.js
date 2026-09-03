import https from 'node:https';

export function solve_19_https_tls_api_hardening() {
  const tlsOptions = {
    minVersion: 'TLSv1.2',
    maxVersion: 'TLSv1.3',
  };

  return {
    server: https.createServer,
    tlsOptions,
  };
}