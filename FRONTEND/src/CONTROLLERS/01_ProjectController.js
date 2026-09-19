import { ProjectModel } from '../MODELS/01_ProjectModel';
import { filterObserver } from './00_FilterObserver';

export class ProjectController {
  constructor() {
    this.currentCategory = filterObserver.getCategory();
    this.searchQuery = '';
    this.selectedProject = null;
    this.visibleCount = 9;
  }

  getCategories() {
    return ProjectModel.getCategories();
  }

  getFilteredProjects(projectsData = null) {
    return ProjectModel.filterProjects(projectsData, this.currentCategory, this.searchQuery);
  }

  setCategory(category) {
    this.currentCategory = category;
    this.visibleCount = 9;
    filterObserver.notify(category);
  }

  setSearchQuery(query) {
    this.searchQuery = query;
  }

  setSelectedProject(project) {
    this.selectedProject = project;
  }

  loadMore() {
    this.visibleCount += 9;
  }
}

export const projectController = new ProjectController();
