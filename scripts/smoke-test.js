import { spawn } from 'node:child_process';

const port = 3100;
const baseUrl = `http://127.0.0.1:${port}`;

const server = spawn(process.execPath, ['src/server.js'], {
  env: { ...process.env, PORT: String(port) },
  stdio: 'ignore',
});

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

try {
  let response;

  for (let attempt = 0; attempt < 20; attempt += 1) {
    if (server.exitCode !== null) {
      throw new Error('Server exited before becoming available.');
    }

    try {
      response = await fetch(`${baseUrl}/health`, {
        signal: AbortSignal.timeout(1000),
      });

      if (response.ok) {
        break;
      }
    } catch {
      // The server may still be starting.
    }

    await delay(250);
  }

  if (!response?.ok) {
    throw new Error('Smoke test failed: /health did not return a successful response.');
  }

  const body = await response.json();

  if (body.status !== 'ok' || body.application !== 'Task Manager') {
    throw new Error('Smoke test failed: unexpected /health response.');
  }

  console.log('Smoke test passed: /health is available.');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  server.kill();
}
