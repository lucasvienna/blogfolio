import { dev } from '$app/environment';

const titlePrefix = 'LV | ';
const description = 'Blog and portfolio of Lucas Vienna';
const url = dev ? 'http://localhost:5173/' : 'https://lucasvienna.dev/';

export { titlePrefix, description, url };
export default { titlePrefix, description, url };
