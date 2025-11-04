// components/RestaurantCard.tsx
import Image from 'next/image';

interface Restaurant {
  id: string;
  name: string;
  rating: number;
  filter_ids: string[];
  image_url: string;
  delivery_time_minutes: number;
  price_range_id: string;
}

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const imageUrl = `https://${process.env.NEXT_PUBLIC_API_HOSTNAME}${restaurant.image_url}`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={restaurant.name}
          fill
          className="object-cover"
          sizes="100%"
          priority
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{restaurant.name}</h3>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <span>⭐</span>
            <span>{restaurant.rating}</span>
          </div>
          <div>
            <span>🕒 {restaurant.delivery_time_minutes} min</span>
          </div>
        </div>
      </div>
    </div>
  );
}