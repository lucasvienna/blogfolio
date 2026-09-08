-- Project-local Neovim configuration.
--
-- Requires `vim.o.exrc = true` in your init.lua. Neovim asks once whether to
-- trust this file; everything below is scoped to this project only.

local root = vim.fn.getcwd()

-- nvim-lspconfig ships `oxlint` and `oxfmt` server definitions that prefer this
-- repo's node_modules/.bin binaries over a global install. Both read
-- .oxlintrc.json / .oxfmtrc.json, so the editor enforces exactly what CI does --
-- including options.typeAware and options.typeCheck.
vim.lsp.enable({ "oxlint", "oxfmt" })

-- ESLint is kept solely for eslint-plugin-svelte; it defines no rules for .ts or
-- .js here, so there is nothing for it to report outside Svelte templates.
vim.lsp.config("eslint", { filetypes = { "svelte" } })

-- Point conform.nvim at oxfmt rather than prettier, which this project dropped.
local ok, conform = pcall(require, "conform")
if ok then
	conform.formatters.oxfmt = {
		command = vim.fs.joinpath(root, "node_modules/.bin/oxfmt"),
		args = { "--stdin-filepath", "$FILENAME" },
		stdin = true
	}
	local filetypes = {
		"javascript",
		"typescript",
		"svelte",
		"json",
		"jsonc",
		"css",
		"markdown",
		"yaml",
		"toml"
	}
	for _, ft in ipairs(filetypes) do
		conform.formatters_by_ft[ft] = { "oxfmt" }
	end
end
