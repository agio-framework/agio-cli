import * as program from 'commander';
import modules from './modules';

program
    .option('n new <project_name>', 'Create a new Agio project')
    .option('i info', 'Project info')
    .option('g generate [type]', 'Generate project code');

program.parse(process.argv);

const option = program.opts();
const args = program.args;


// Create new project
if (option.new) {

    modules.newProject(option.new);

// Generate project code
} else if (option.generate) {


// Project info
} else if(option.info) {

}
