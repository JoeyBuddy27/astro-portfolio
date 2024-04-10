import React, { useState, useEffect } from 'react'
import ProjectCard from './ProjectCard.tsx'
import { cn } from '@/utils'

let originalData = []

const apiKey = '$2a$10$.i6OSz1qYvSb5dL/lQcQq.GbRKV/Wsw7gxMtxCLnH8GZ7JxChtmHS'
const apiUrl = `https://api.jsonbin.io/v3/b/65eb4a2c1f5677401f3a62df`

try {
	const response = await fetch(apiUrl, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'X-Access-Key': apiKey,
			'Access-Control-Allow-Origin': '*'
		}
	})
	if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`)
	}
	const data = await response.json()
	originalData = data.record
} catch (error) {
	console.error('Error fetching data:', error)
}

const Portfolio = () => {
	const [allData, setAllData] = useState(originalData)
	const [allOriginalData, setAllOriginalData] = useState([])
	const [activeType, setActiveType] = useState('All')

	// useEffect(async () => {
	// 	try {
	// 		const response = await fetch(apiUrl, {
	// 			method: 'GET',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 				'X-Access-Key': apiKey,
	// 				'Access-Control-Allow-Origin': '*'
	// 			}
	// 		})
	// 		if (!response.ok) {
	// 			throw new Error(`HTTP error! Status: ${response.status}`)
	// 		}
	// 		const data = await response.json()
	// 		setAllData(data.record)
	// 	} catch (error) {
	// 		console.error('Error fetching data:', error)
	// 	}
	// }, []) // Empty dep

	// const [uniqueTypes, setUniqueTypes] = useState([])
	const uniqueTypes = ['All', ...new Set(originalData.map((item) => item.type))]

	// useEffect(() => {
	// 	if (allData.length) {
	// 		const types = allData.map((item) => item.type)
	// 		console.log('types', types)
	// 		const uniqueArray = [...new Set(types)]
	// 		setUniqueTypes(uniqueArray)
	// 	}
	// }, [allData])

	const filterByType = (type) => {
		setActiveType(type)
		if (type === 'All') return setAllData(originalData)
		const filteredData = originalData?.filter((item) => item.type === type)
		setAllData(filteredData)
	}

	return (
		<div className='flex w-full scroll-p-10 flex-col gap-y-10'>
			<section className='flex flex-col items-center gap-y-7'>
				<div className='flex flex-col items-center gap-y-4'>
					<h1 className='text-3xl font-bold'>Portfolio</h1>
				</div>
				<div className='flex flex-col items-center gap-y-4'>
					{/* <h2 className='text-xl font-bold'>Filter by type</h2> */}
					<div className='flex flex-row items-center gap-x-4'>
						{/* TODO: style better */}
						{uniqueTypes.map((type, index) => (
							<div
								key={index}
								className={cn(
									'cursor-pointer transition delay-200 ease-in-out',
									activeType === type && 'text-green-400'
								)}
								onClick={() => filterByType(type)}
							>
								{type}
							</div>
						))}
					</div>
				</div>
				<div>
					<div className='grid scroll-p-10 grid-cols-1 gap-4 md:grid-cols-3'>
						{allData.map((portfolioItem, index) => (
							<>
								<ProjectCard
									client:load
									key={`portfolio_${index + 1}`}
									link={portfolioItem?.link}
									index={index}
									heading={portfolioItem?.title}
									subheading={portfolioItem?.short}
									imagePath={portfolioItem?.image?.[0]}
									altText={portfolioItem?.title}
									className='w-full'
									type={portfolioItem?.type}
								/>
							</>
						))}
					</div>
				</div>
			</section>
		</div>
	)
}

export default Portfolio