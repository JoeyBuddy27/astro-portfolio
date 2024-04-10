import React from 'react'
import { cn } from '@/utils' // Assuming cn is a utility function for className concatenation

function ProjectCard({
	heading,
	className,
	subheading,
	imagePath,
	altText,
	link,
	useShortDesc,
	index
}) {
	return (
		<div
			className={cn(
				className,
				'flex scroll-p-10 flex-col gap-y-3 rounded-2xl border border-border bg-primary-foreground ',
				link && 'transition-all hover:border-foreground/25 hover:shadow-sm'
			)}
			id={`portfolio-${index + 1}`}
		>
			<img
				src={imagePath}
				alt={altText}
				width='200'
				height='200'
				className='h-48 w-full rounded-2xl rounded-bl-none rounded-br-none object-cover'
				loading='eager'
			/>
			<div className='flex flex-col gap-y-0.5 px-5 py-4'>
				<h1 className='text-lg font-medium'>{heading}</h1>
				<h2 className={cn('text-muted-foreground', useShortDesc && 'line-clamp-3')}>
					{subheading}
				</h2>
				{useShortDesc && (
					<a href={`/portfolio/#portfolio-${index + 1}`} className={cn('mt-4 text-green-400 ')}>
						{' '}
						See more{' '}
					</a>
				)}
			</div>

			<div className='w-100 mt-auto flex flex-row justify-end p-4'>
				<button className='mr-3'>Github</button>
				<a href={link} className='w-100 flex items-center'>
					Live
				</a>
			</div>
			<slot />
		</div>
	)
}

export default ProjectCard
