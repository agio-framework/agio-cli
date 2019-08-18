import {Command} from 'commander';
import modules from './modules';
import chalk from 'chalk';

const program = new Command();

// Line before
// console.log('\n');


// GENERATE CODE
program
    .command('generate <type> <name>')
    .description('Generate new controller')
    .option('--prefix <name>', 'Define controllers prefix')
    .option('--sameprefix', 'Use same controller name as prefix')
    .option('--sql', 'Create SQL model')
    .option('--mongo', 'Create MongoDB model')
    .option('--for <controller>', 'Define controller of validator')
    .alias('g')
    .action((type, name, options) => {

        // Generate controller
        if (type === 'controller') modules.generateCode.controller(
            name,
            options.sameprefix ? name : options.prefix 
        );

    });


// CREATE NEW PROJECT
program
    .command('new <project_name>')
    .description('Create a new Agio project')
    .alias('n')
    .action((projectName: string) => modules.newProject(projectName));


// GET AN EXISTENT PROJECT INFO
program
    .command('info [project_path]')
    .description('Get project informations')
    .alias('i')
    .action((projectPath?: string) => modules.projectInfo(projectPath));



// UNKNOWN COMMANDS

const help = () => program.outputHelp((help) => `\n${chalk.red(help)}\n`);
// program.on('command:*', help);

program.on('--help', (help) => {
    
    console.log('\nExamples:');
    console.log(chalk.blue(`
    \r  agio new my-project
    \r  agio g controller users
    \r  agio g controller users --prefix users
    \r  agio g controller users --sameprefix
    \r  agio g model users --mongo
    \r  agio g model users --sql
    \r  agio g validator create --for users
    \r  agio g middleware session
    `))

});

// Parse arguments
program.parse(process.argv);

// const help = program.outputHelp((help) => `\n${chalk.red(help)}\n`);

// program
//     .option('n new <project_name>', 'Create a new Agio project')
//     .option('i info [project_path]', 'Project info')
//     // .option('g generate <type> <name>', 'Generate project code')
//     .option('g help', 'Show this message');

// program.parse(process.argv);

// const option = program.opts();
// const args = program.args;


// // Create new project
// if (option.new) {

//     modules.newProject(option.new);

// // Generate project code
// } else if (option.generate) {

//     console.log(option.generate, args);

// // Project info
// } else if(option.info) {

//     modules.projectInfo(typeof option.info === 'string' ? option.info : '.');

// // Invalid command, show help banner
// } else {

//     console.log(chalk.blue('a'));

// }

// // Line after
// console.log('\n');