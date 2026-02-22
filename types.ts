// src/types.ts

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

// UPDATED: Now supports arrays
export interface SiteSettings {
  id?: number;
  emails: string[];
  phones: string[];
  address: string;
  tagline: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  is_active: boolean;
}

// UPDATED: Now supports detailed structure
export interface BudgetOption {
  id: string;
  project_type: string;
  amount: string;
  timeline: string;
}