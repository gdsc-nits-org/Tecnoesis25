"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const MusicButton = dynamic(() => import('~/components/MusicButton'), {
  ssr: false,
});

export default function DynamicMusicButton() {
  return (
    // Suspense is good practice for dynamic imports
    <Suspense fallback={null}>
      <MusicButton />
    </Suspense>
  );
}