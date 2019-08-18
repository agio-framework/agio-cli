import * as ejs from 'ejs';
import { join } from 'path';
import { existsSync, readFileSync } from 'fs';

ejs.open = '{{';
ejs.close = '}}';

const TEMPLATES_PATH = __dirname;

type TemplateType = 'controller' | 'validator' | 'model';

export const render = (templateType: TemplateType, context: {[key: string]: any}) => {
    
    const templatePath = join(TEMPLATES_PATH, `${templateType}.template.ejs`);

    if (existsSync(templatePath)) return ejs.render(readFileSync(templatePath).toString('utf-8'), context);

    return null;

}