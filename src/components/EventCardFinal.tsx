import React from 'react'
import Image from 'next/image'

type Props = {
  title: string
  description?: string
  imageUrl?: string
  date?: string
  time?: string
  location?: string
  onEdit?: () => void
  onDelete?: () => void
}

export default function EventCardFinal({ title, description, imageUrl, date, time, location, onEdit, onDelete }: Props) {
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <div className="flex flex-col md:flex-row items-stretch gap-4 p-6">
        {imageUrl && (
          <div className="w-full md:w-56 h-40 relative flex-shrink-0 rounded-lg overflow-hidden">
            <Image src={imageUrl} alt={title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 224px" unoptimized />
          </div>
        )}

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">{title}</h3>
              <div className="text-sm text-slate-500 ml-4">{time ?? ''}</div>
            </div>
            <div className="text-sm text-slate-500 mt-2">{date ?? ''}</div>
            {description && <p className="mt-3 text-sm md:text-base text-gray-700 dark:text-gray-300">{description}</p>}
          </div>

          <div className="mt-4 flex items-center gap-3">
            {onEdit && <button onClick={onEdit} className="px-4 py-2 text-sm md:text-base font-medium text-white bg-blue-600 rounded-lg">Edit</button>}
            {onDelete && <button onClick={onDelete} className="px-4 py-2 text-sm md:text-base font-medium text-white bg-red-600 rounded-lg">Delete</button>}
          </div>
        </div>
      </div>
    </div>
  )
}
