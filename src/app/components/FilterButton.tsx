// components/FilterButton.tsx
'use client';

import Image from 'next/image';

interface Filter {
  id: string;
  name: string;
  image_url: string;
}

interface FilterButtonProps {
  filter: Filter;
  isActive: boolean;
  onClick: () => void;
}

export default function FilterButton({ filter, isActive, onClick }: FilterButtonProps) {
  const imageUrl = `https://${process.env.NEXT_PUBLIC_API_HOSTNAME}${filter.image_url}`;

  return (
    <button
      onClick={onClick}
      className={`flex flex-col flex-1 items-center p-3 rounded-lg transition-all ${
        isActive
          ? 'bg-munchies text-white shadow-lg'
          : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
      }`}
    >
      <div className="relative w-12 h-12 mb-2">
        <Image
          src={imageUrl}
          alt={filter.name}
          fill
          className="object-contain"
          sizes="100%"
        />
      </div>
      <span className="text-sm font-medium">{filter.name}</span>
    </button>
  );
}