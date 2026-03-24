'use client';

import { useRouter } from 'next/navigation';

export default function DemoButton() {
  const router = useRouter();

  const handleClick = () => {
    // Clean analytics event - no console.log
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'hero_demo_click', {
        event_category: 'engagement',
        event_label: 'hero_start_demo'
      });
    }
    router.push('/auth/register');
  };

  return (
    <button
      onClick={handleClick}
      className="bg-white text-[#1e40af] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
    >
      ابدأ Demo الآن
    </button>
  );
}