import ora from 'ora';
import { render } from './templates';
import chalk from 'chalk';
import { writeFileSync } from 'fs';
import { join } from 'path';

export default (name: string, prefix?: string) => {

    // Define paths
    const paths = name.split('/');
    const controllerName = paths.pop();
    const controllerPath = paths.join('/') || controllerName;

    const spinner = ora();
    spinner.start(`Generating controller ${chalk.blue(controllerName)}`);


    // Create code by template
    const code = render('controller', { name: controllerName, prefix });

    // Check if code has created
    if (!code) return spinner.fail('Sorry, something went wrong :(');

    spinner.succeed();
    spinner.start('Saving the code');


    // Save file
    const filename = join(process.cwd(), 'src', 'controllers', controllerPath, `${controllerName}.controller.ts`);

    try {

        writeFileSync(filename, code);
    
        spinner.succeed();
        spinner.succeed(`File: ${chalk.green(filename)}`);

    } catch (err) {

        spinner.fail(`Sorry, i can not write ${chalk.red(filename)}`);
        console.log('\n', chalk.redBright(err.message), '\n')

    }
    


}