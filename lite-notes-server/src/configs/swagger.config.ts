import { parse } from 'yaml';
import fs from 'fs';

const swaggerDocument = parse(fs.readFileSync('./swagger.yaml', 'utf8'));

export default swaggerDocument;
