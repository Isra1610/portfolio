"use client"

import { useEffect, useRef, useState } from "react"
import { galleryPacks } from "@/utils/data/gallery"
import Image from "next/image"

/**
 * Gallery
 * props:
 * - packages: Array<{ title: string, images: Array<{ url: string, caption?: string }> }>
 */
export default function Gallery() {
	const [hovered, setHovered] = useState(null)
	const [isOpen, setIsOpen] = useState(false)
	const [activePackage, setActivePackage] = useState(null)
	const [activeIndex, setActiveIndex] = useState(0)
	const modalRef = useRef()

	// Keyboard navigation for modal
	useEffect(() => {
		if (!isOpen) return
		if (typeof window === "undefined") return
		function onKey(e) {
			if (e.key === "ArrowRight") next()
			if (e.key === "ArrowLeft") prev()
			if (e.key === "Escape") close()
		}
		window.addEventListener("keydown", onKey)
		return () => window.removeEventListener("keydown", onKey)
	}, [isOpen, activeIndex, activePackage])

	function open(pkg, idx = 0) {
		setActivePackage(pkg)
		setActiveIndex(idx)
		setIsOpen(true)
	}

	function close() {
		setIsOpen(false)
		setActivePackage(null)
		setActiveIndex(0)
	}

	function prev() {
		if (!activePackage) return
		setActiveIndex((i) => (i - 1 + activePackage.images.length) % activePackage.images.length)
	}

	function next() {
		if (!activePackage) return
		setActiveIndex((i) => (i + 1) % activePackage.images.length)
	}

		return (
				<div id="gallery" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
					<div className="w-[100px] h-[100px] bg-violet-100 rounded-full absolute top-6 left-[42%] translate-x-1/2 filter blur-3xl opacity-20"></div>

					<div className="flex justify-center -translate-y-[1px]">
						<div className="w-3/4">
							<div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent  w-full" />
						</div>
					</div>

					<div className="flex justify-center my-5 lg:py-8">
						<div className="flex  items-center">
							<span className="w-24 h-[2px] bg-[#1a1443]"></span>
							<span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
								Gallery
							</span>
							<span className="w-24 h-[2px] bg-[#1a1443]"></span>
						</div>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full z-10">
					{galleryPacks?.map((pkg, pIdx) => (
						<div
							key={pIdx}
							className="group relative cursor-pointer"
							onMouseEnter={() => setHovered(pIdx)}
							onMouseLeave={() => setHovered(null)}
						>
										<div
											className="relative h-56 rounded"
											style={{ background: 'none'}}
											onClick={() => open(pkg, 0)}
										>
								{/* render up to first 3 images as stacked/fanned */}
								{Array.from({ length: Math.min(3, pkg.images?.length || 0) }).map((_, i) => {
									const img = pkg.images[i]
									const isHovered = hovered === pIdx
									// V-fan effect from top
									const spread = 30 // degrees of total spread
									const baseAngle = -spread / 2
									const angle = baseAngle + (i * (spread / (Math.min(3, pkg.images.length) - 1 || 1)))
													const baseStyle = {
														position: "absolute",
														top: isHovered ? `10%` : `12%`,
														left: `calc(50% - 40%)`,
														width: "80%",
														height: "80%",
														objectFit: "contain",
														borderRadius: "10px",
														transition: "transform 220ms cubic-bezier(.4,2,.6,1), opacity 220ms cubic-bezier(.4,2,.6,1)",
														transformOrigin: "bottom center",
														zIndex: 10 + i,
														background: 'none',
													}
									const transform = isHovered
										? `rotate(${angle}deg) translateY(-18px) scale(1.05)`
										: i === 0
										? "rotate(0deg)"
										: "rotate(0deg) scale(0.96)"
									const opacity = !isHovered && i > 0 ? 0 : 1
									return img ? (
										<Image
											key={i}
											src={img.url}
											alt={img.caption || `${pkg.title} ${i + 1}`}
											width={800}
											height={450}
											style={{ ...baseStyle, transform, opacity }}
											className="select-none"
											draggable={false}
										/>
									) : null
								})}
							</div>
							<div className="mt-3 flex items-center justify-center">
								<h3 className="text-base font-semibold text-white drop-shadow">{pkg.title}</h3>
							</div>
						</div>
					))}
				</div>
						{/* Fullscreen image viewer */}
						{isOpen && activePackage && (
							<div
								ref={modalRef}
								className="fixed inset-0 z-50 flex items-center justify-center"
								style={{ background: 'rgba(0,0,0,0.85)' }}
							>
								{/* Backdrop click closes viewer */}
								<div
									className="absolute inset-0"
									onClick={close}
									aria-hidden
									style={{ cursor: 'zoom-out' }}
								/>
											{/* Main image with margin */}
											<div className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none">
												<Image
													src={activePackage.images[activeIndex].url}
													alt={activePackage.images[activeIndex].caption || activePackage.title}
													width={1600}
													height={900}
													className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl select-none"
													style={{ background: 'transparent' }}
													draggable={false}
												/>
											</div>
								{/* Close button */}
								<button
									onClick={close}
									className="fixed top-6 right-6 z-20 bg-white/90 hover:bg-white text-black pt-[10px] pb-3 px-3 w-12 h-12 font-bold text-xl"
									style={{ borderRadius: '50%', boxShadow: '0 2px 8px rgba(0,0,0,0.18)' }}
									aria-label="Cerrar"
								>
									✕
								</button>
								{/* Prev button */}
								<button
									onClick={(e) => { e.stopPropagation(); prev() }}
									className="fixed left-6 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-black pt-[10px] pb-3 px-3  w-12 h-12 font-bold text-xl"
									style={{ borderRadius: '50%', boxShadow: '0 2px 8px rgba(0,0,0,0.18)' }}
									aria-label="Anterior"
								>
									‹
								</button>
								{/* Next button */}
								<button
									onClick={(e) => { e.stopPropagation(); next() }}
									className="fixed right-6 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-black pt-[10px] pb-3 px-3  w-12 h-12 font-bold text-xl"
									style={{ borderRadius: '50%', boxShadow: '0 2px 8px rgba(0,0,0,0.18)' }}
									aria-label="Siguiente"
								>
									›
								</button>
								{/* Caption and index */}
								<div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-20 text-center px-4">
									<div className="text-xl text-white drop-shadow mb-1">{activePackage.images[activeIndex].caption}</div>
									<div className="text-lg text-gray-200">&lt;{activeIndex + 1}/{activePackage.images.length}&gt;</div>
								</div>
							</div>
						)}
			</div>
		)
}

