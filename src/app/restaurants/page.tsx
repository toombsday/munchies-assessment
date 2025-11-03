// app/restaurants/page.tsx
'use client';

import { useEffect, useState } from 'react';
import RestaurantCard from '@/app/components/RestaurantCard';
import FilterButton from '@/app/components/FilterButton';
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

interface Filter {
  id: string;
  name: string;
  image_url: string;
}

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [selectedFilterId, setSelectedFilterId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch from proxy API routes (with cache)
        const [restaurantsRes, filtersRes] = await Promise.all([
          fetch('/api/restaurants'),
          fetch('/api/filters'),
        ]);

        if (!restaurantsRes.ok || !filtersRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const restaurantsData = await restaurantsRes.json();
        const filtersData = await filtersRes.json();

        // Log cache status
        console.log('Restaurants cache:', restaurantsRes.headers.get('X-Cache'));
        console.log('Filters cache:', filtersRes.headers.get('X-Cache'));

        setRestaurants(restaurantsData.restaurants);
        setFilters(filtersData.filters);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Filter restaurants
  const filteredRestaurants = selectedFilterId
    ? restaurants.filter((restaurant) =>
        restaurant.filter_ids.includes(selectedFilterId)
      )
    : restaurants;

  const handleFilterClick = (filterId: string) => {
    setSelectedFilterId(selectedFilterId === filterId ? null : filterId);
  };

  const handleClearFilter = () => {
    setSelectedFilterId(null);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading restaurants...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Image
          src="/munchies-logo.svg"
          alt="Munchies Logo"
          width={180}
          height={40}
        />
      </div>

      {/* Filter Buttons */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Filter by Category</h2>
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => (
            <FilterButton
              key={filter.id}
              filter={filter}
              isActive={selectedFilterId === filter.id}
              onClick={() => handleFilterClick(filter.id)}
            />
          ))}
        </div>
      </div>

      {/* Restaurant Results */}
      <div className="mb-4">

        <h1 className="text-3xl font-bold mb-6 text-munchies">Restaurants</h1>
        <p className="text-gray-600">
          Showing {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''}
          {selectedFilterId && (
            <button
              onClick={handleClearFilter}
              className="ml-2 text-blue-500 hover:underline"
            >
              Clear filter
            </button>
          )}
        </p>
      </div>

      {/* Restaurant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>

      {filteredRestaurants.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No restaurants found for this category.
        </div>
      )}
    </div>
  );
}
