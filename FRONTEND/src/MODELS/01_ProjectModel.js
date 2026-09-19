import { projectsData as fullProjectsData } from './00_projectsData';
import fallbackJsonData from '../DATA/projectsData.json';

const getFallbackData = () => {
  if (Array.isArray(fullProjectsData) && fullProjectsData.length > 0) return fullProjectsData;
  if (Array.isArray(fallbackJsonData)) return fallbackJsonData;
  if (fallbackJsonData && Array.isArray(fallbackJsonData.value)) return fallbackJsonData.value;
  return [];
};

export class ProjectModel {
  static async fetchProjects() {
    const fallbackProjects = getFallbackData();
    try {
      if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        return fallbackProjects;
      }
      const res = await fetch('http://127.0.0.1:8000/api/projects/');
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      return (Array.isArray(data) && data.length > 0) ? data : fallbackProjects;
    } catch (err) {
      console.warn("API offline, rendering bundled projects data:", err);
      return fallbackProjects;
    }
  }

  static getCategories() {
    return ['All', 'Fire Safety', 'Mechanical', 'LPG Systems'];
  }

  static filterProjects(projectsData, category = 'All', searchQuery = '') {
    const fallbackProjects = getFallbackData();
    const list = Array.isArray(projectsData) ? projectsData : fallbackProjects;
    return list.filter((item) => {
      if (!item) return false;
      const matchesCategory = category === 'All' || item.category === category;
      const term = (searchQuery || '').toLowerCase().trim();
      
      const client = item.client || item.company || '';
      const type = item.scope || item.type || '';
      const address = item.location || item.address || '';
      
      const matchesSearch =
        !term ||
        client.toLowerCase().includes(term) ||
        type.toLowerCase().includes(term) ||
        address.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }

  static getStats(projectsData) {
    const list = Array.isArray(projectsData) ? projectsData : [];
    return {
      total: list.length,
      fireSafety: list.filter((p) => p && p.category === 'Fire Safety').length,
      mechanical: list.filter((p) => p && p.category === 'Mechanical').length,
      lpg: list.filter((p) => p && p.category === 'LPG Systems').length,
    };
  }
}
