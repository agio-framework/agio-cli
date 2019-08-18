import { join } from 'path';
import ora from 'ora';
import chalk from 'chalk';
import { run } from '../../utils/runner';


const spinner = ora();
const DEMO_REPO = 'https://github.com/agio-framework/agio-demo';


/**
 * Clone the demo repo to start a new project
 *
 * @param  {string} projectName
 */
export default (projectName: string) => {


    // Project destination
    const projectPath = join('.', projectName);


    spinner.text = `Creating a new project: ${chalk.blue(projectName)}`;
    spinner.start();


    // 1 - CLONE BASE PROJECT
    run(`git clone ${DEMO_REPO} ${projectName}`)

    // 2 - REMOVE GIT PATH
    .then(() => run('rm -rf .git', {cwd: projectPath}))

    // 3 - INSTALL DEPENDENCIES
    .then(() => {

        spinner.succeed();
        spinner.text = 'Installing dependencies';
        spinner.start();

        return run('npm install', {cwd: projectPath});

    })

    // 4 - DONE
    .then(() => {

        spinner.succeed();
        spinner.text = chalk.green('Done!');
        spinner.succeed();

    })

    // 0 - ERROR
    .catch((signal) => spinner.fail(signal));

}