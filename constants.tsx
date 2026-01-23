
import { Project, PricingService } from './types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Titan Energy Dashboard',
    description: 'A high-performance monitoring tool for industrial solar farms.',
    problem: 'The client needed to visualize real-time data from 5,000+ sensors across multiple geographic locations without latency.',
    solution: 'We built a custom WebSocket-driven dashboard using React and D3.js, optimizing for large dataset rendering.',
    techUsed: ['React', 'D3.js', 'Node.js', 'AWS'],
    imageUrl: 'https://picsum.photos/seed/titan/800/600',
    visitUrl: 'https://example.com'
  },
  {
    id: '2',
    title: 'Slate Ecommerce',
    description: 'Minimalist luxury apparel store focusing on lightning-fast performance.',
    problem: 'Conversion rates were dropping due to slow page loads on mobile devices.',
    solution: 'Migration to a headless architecture with Next.js and Shopify API reduced TBT by 70%.',
    techUsed: ['Next.js', 'Shopify', 'Tailwind', 'Framer Motion'],
    imageUrl: 'https://picsum.photos/seed/slate/800/600',
    visitUrl: 'https://example.com'
  }
];

export const PRICING_SERVICES: PricingService[] = [
  {
    id: 'landing',
    name: 'Landing Page',
    description: 'High-converting single page site.',
    basePrice: 2500,
    icon: 'Layout'
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Full store with inventory management.',
    basePrice: 8000,
    icon: 'ShoppingBag'
  },
  {
    id: 'cms',
    name: 'Custom CMS',
    description: 'Tailored admin panels and content systems.',
    basePrice: 5000,
    icon: 'Database'
  },
  {
    id: 'seo',
    name: 'SEO Audit',
    description: 'Deep technical SEO optimization.',
    basePrice: 1500,
    icon: 'Search'
  },
  {
    id: 'branding',
    name: 'Logo & Branding',
    description: 'Visual identity system.',
    basePrice: 3000,
    icon: 'Figma'
  }
];
