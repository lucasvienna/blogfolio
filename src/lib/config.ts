import { dev } from '$app/environment';
import { base } from '$app/paths';

const titlePrefix = 'LV | ';
const description = 'Blog and portfolio of Lucas Vienna';
const url = ((dev ? 'http://localhost:5173/' : 'https://lucasvienna.dev/') + base).replace(
	/\/$/,
	''
);

export { titlePrefix, description, url };
export default { titlePrefix, description, url };
