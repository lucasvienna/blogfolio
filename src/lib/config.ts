import { dev } from "$app/environment";
import { resolve } from "$app/paths";

const titlePrefix = "LV | ";
const description = "Blog and portfolio of Lucas Vienna";
const origin = dev ? "http://localhost:5173" : "https://lucasvienna.dev";
const url = (origin + resolve("/")).replace(/\/$/u, "");

export { titlePrefix, description, url };
export default { titlePrefix, description, url };
