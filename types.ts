export interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  techUsed: string[];
  imageUrl: string;
  visitUrl: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  budget: string;
  timeline: string;
  message: string;
  timestamp: number;
}

export interface SiteSettings {
  id?: number;
  email: string;
  address: string;
  phone: string;
  tagline: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  is_active: boolean;
}

export interface BudgetOption {
  id: string;
  label: string;
  sort_order: number;
}