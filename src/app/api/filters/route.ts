// app/api/filters/route.ts
import { NextResponse } from 'next/server';
import { cache } from '@/app/lib/cache';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const CACHE_KEY = 'filters';
const CACHE_TTL = 10 * 60 * 1000;   // 10 minutes

export async function GET() {
  try {

    const cachedData = cache.get(CACHE_KEY, CACHE_TTL);
    if (cachedData) {
      console.log('Returning cached filters data');
      return NextResponse.json(cachedData, {
        headers: {
          'X-Cache': 'HIT',
        },
      });
    }

    // Fetch from external API
    console.log('Fetching fresh filters data from API');
    const res = await fetch(`${API_BASE_URL}/filter`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch filters');
    }

    const data = await res.json();

    // Store in cache
    cache.set(CACHE_KEY, data, CACHE_TTL);

    return NextResponse.json(data, {
      headers: {
        'X-Cache': 'MISS',
      },
    });
  } catch (error) {
    console.error('Error fetching filters:', error);
    return NextResponse.json(
      { error: 'Failed to fetch filters' },
      { status: 500 }
    );
  }
}