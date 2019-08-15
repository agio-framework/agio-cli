import { join } from 'path';
import * as ora from 'ora';
import chalk from 'chalk';
import {exec, rm, cd, which, config, exit, ShellString} from 'shelljs';

config.silent = true;

const spinner = ora();
const DEMO_REPO = 'https://github.com/agio-framework/agio-demo';

const errorHandler = (shellString: ShellString) => {
    // Fail to clone demo
    if (shellString.code) {
        spinner.text = shellString.stderr;
        spinner.fail();
        exit(shellString.code);
    }
}

export default (projectName: string) => {

    if (!which('git')) {
        console.log('Sorry, git is required but are not installed.');
        return exit(0);
    }

    // CLONE DEMO
    spinner.text = `Creating a new project into ${chalk.blue(projectName)}`;
    spinner.start();

    errorHandler(exec(`git clone ${DEMO_REPO} ${projectName}`));
    errorHandler(rm('-rf', join(projectName, '.git')));

    spinner.succeed();

    // INSTALL DEPS
    spinner.text = 'Installing dependencies'
    spinner.clear();
    spinner.start();

    errorHandler(cd(projectName));
    errorHandler(exec('npm install'));

    spinner.succeed();

    spinner.text = 'Finshing...';
    spinner.start();

    errorHandler(cd('..'));
    errorHandler(rm('-rf', projectName));

    spinner.text = 'Done! your project has created.'
    spinner.succeed();

}