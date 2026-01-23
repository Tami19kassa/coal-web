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