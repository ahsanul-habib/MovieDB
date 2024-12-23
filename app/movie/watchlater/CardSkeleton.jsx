import React from 'react'

const CardSkeleton = () => {
  return (
<div className="bg-gray-700 rounded-lg overflow-hidden shadow-lg group relative animate-pulse">
  <div className="w-full h-[450px] bg-gray-200" />
  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
    <div className="flex justify-between items-center">
      <div className="w-12 h-4 bg-gray-200 rounded" />
      <div className="h-6 bg-gray-200 rounded px-3 py-1" />
    </div>
  </div>
</div>

  )
}

export default CardSkeleton