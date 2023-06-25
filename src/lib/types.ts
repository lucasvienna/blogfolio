export type Categories = 'sveltekit' | 'svelte' | string;

export type Post = Metadata & {
	slug: string;
};

/** Frontmatter for a .md post */
export type Metadata = {
	title: string;
	description: string;
	date: string;
	categories: Categories[];
	published: boolean;
};
