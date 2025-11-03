// app/api/restaurants/route.ts
import { NextResponse } from 'next/server';
import { cache } from '@/app/lib/cache';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const CACHE_KEY = 'restaurants';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function GET() {
  try {
    const cachedData = cache.get(CACHE_KEY, CACHE_TTL);
    if (cachedData) {
      console.log('Returning cached restaurants data');
      return NextResponse.json(cachedData, {
        headers: {
          'X-Cache': 'HIT',
        },
      });
    }

    console.log('Fetching fresh restaurants data from API');
    const res = await fetch(`${API_BASE_URL}/restaurants`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch restaurants');
    }

    const data = await res.json();
    cache.set(CACHE_KEY, data, CACHE_TTL);

    return NextResponse.json(data, {
      headers: {
        'X-Cache': 'MISS',
      },
    });
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return NextResponse.json(
      { error: 'Failed to fetch restaurants' },
      { status: 500 }
    );
  }
}