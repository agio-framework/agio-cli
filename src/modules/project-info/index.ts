import ora from 'ora';
import chalk from 'chalk';
import { join } from 'path';
import * as Table from 'cli-table3';


/**
 * Project Info Module
 * Run all function to show an Agio project informations.
 *
 * @param  {string} projectPath
 */
export default (projectPath: string = '.') => {

    const spinner = ora().start('Getting project info...');

    try {

        const project = require(join(process.cwd(), projectPath, 'package.json'));

        // Check if found project is a valid Agio project
        if (project.dependencies && project.dependencies['@agio/framework']) {


            // Yahh, create info table to print
            const infoTable: Table.GenericTable<any> = new Table({ head: [] });

            infoTable.push(
                [
                    'Name',
                    'Version',
                    'License',
                    'Agio Version',
                    'Author'
                ].map(head => chalk.blueBright(head)),
                [
                    project.name || '?',
                    project.version || '?',
                    `${project.license || '?'} (${project.private ? 'private' : 'public'})`,
                    project.dependencies['@agio/framework'] || '?',
                    project.author && project.author.name ? project.author.name : (project.author ? project.author.split('<')[0] : '?'),
                ],
                [
                    {
                        vAlign: 'center',
                        hAlign: 'center',
                        colSpan: 5,
                        rowSpan: 2,
                        content: project.description,
                    }
                ],
                []
            );

            // Take you info :)
            spinner.stop();
            console.log(chalk.bgHex('#282a2f').white(infoTable.toString()));

        } else {

            // No Agio project
            spinner.warn(chalk.yellow('This path not contain an Agio project'));

        }

    } catch (err) {

        // Fail to read package.json not found
        spinner.fail(chalk.red('Could not find a project in this path.'));
        console.log(chalk.redBright(err.message.split('\n')[0]));

    }

}