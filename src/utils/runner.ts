import { exec, ProcessEnvOptions } from 'child_process';

/**
 * Command runner, promisify child process
 *
 * @param  {string} command
 * @param  {ProcessEnvOptions} options?
 */
export const run = (command: string, options?: ProcessEnvOptions) => new Promise((resolve, reject) => {
    exec(command, {...options}, (err, stdout, stderr) => err ? reject(stderr) : resolve(stdout))
});
