import React from 'react'
import { cn } from '@/utils'

type ProjectCardProps = {
	heading: string
	className?: string
	subheading: string
	imagePath: string[]
	altText?: string[]
	link?: string
	useShortDesc?: boolean
	index: number
}

function ProjectCard({
	heading,
	className,
	subheading,
	imagePath,
	altText,
	link,
	useShortDesc,
	index
}: ProjectCardProps) {
	const [imageIndex, setImageIndex] = React.useState(0)
	// console.log('imagePath', imagePath)

	// React.useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		// Fade out the image
	// 		// After 500ms, update imageIndex and fade in the new image
	// 		setImageIndex((prev) => (prev === imagePath.length - 1 ? 0 : prev + 1))
	// 	}, 4500)
	// 	return () => clearInterval(interval)
	// }, [])

	const [opacity, setOpacity] = React.useState(1)

	return (
		<div
			className={cn(
				className,
				'flex scroll-p-10 flex-col gap-y-3 rounded-2xl border border-border bg-primary-foreground ',
				link && 'transition-all hover:border-foreground/25 hover:shadow-sm'
			)}
			id={`portfolio-${index + 1}`}
		>
			{/* TODO: Make this a slider? */}
			<a
				href={useShortDesc ? `/portfolio/#portfolio-${index + 1}` : link}
				target={useShortDesc ? '_self' : '_blank'}
			>
				<img
					key={`image-${imageIndex}-${heading}`}
					src={imagePath[imageIndex]}
					alt={altText?.[imageIndex] || ''}
					// animate-slow-pulse
					className={` h-60 w-full rounded-2xl rounded-bl-none rounded-br-none object-cover`}
					// style={{ opacity: imagePath.length === 1 ? 1 : opacity }}
				/>
			</a>
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

			{link && !useShortDesc ? (
				<div className='w-100 mt-auto flex flex-row justify-end p-4'>
					<div>
						<span className='flex items-center'>
							<span className='absolute inline-flex h-2 w-2 animate-ping rounded-full border border-green-400 bg-green-400 opacity-75' />
							<span className='relative inline-flex h-2 w-2 rounded-full bg-green-400' />
							<a href={link} target='_blank' className='w-100 ml-2 flex items-center'>
								Live
							</a>
						</span>
					</div>
				</div>
			) : null}
			<slot />
		</div>
	)
}

export default ProjectCard
