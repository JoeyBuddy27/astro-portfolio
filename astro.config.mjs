import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import { remarkReadingTime } from './src/utils/remarkReadingTime.ts'
import remarkUnwrapImages from 'remark-unwrap-images'
import rehypeExternalLinks from 'rehype-external-links'
import expressiveCode from 'astro-expressive-code'
import { expressiveCodeOptions } from './src/site.config'
import icon from 'astro-icon'
import react from '@astrojs/react'
import vercel from '@astrojs/vercel/serverless'

// https://astro.build/config
export default defineConfig({
	site: 'https://astro-portfolio-three-zeta.vercel.app/',
	// base: '/astro-portfolio',
	integrations: [
		expressiveCode(expressiveCodeOptions),
		react(),
		tailwind({
			applyBaseStyles: false
		}),
		sitemap(),
		mdx(),
		icon()
	],
	markdown: {
		remarkPlugins: [remarkUnwrapImages, remarkReadingTime],
		rehypePlugins: [
			[
				rehypeExternalLinks,
				{
					target: '_blank',
					rel: ['nofollow, noopener, noreferrer']
				}
			]
		],
		remarkRehype: {
			footnoteLabelProperties: {
				className: ['']
			}
		}
	},
	prefetch: true,
	output: 'server',
	adapter: vercel(),
	vite: {
		ssr: {
			// Add npm packages containing invalid code here
			noExternal: ['lil-gui']
		}
	}
})
