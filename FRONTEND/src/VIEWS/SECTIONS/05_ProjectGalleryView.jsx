// ==========================================================
// VIEW: ProjectGalleryView
// Responsibility: Presentation of 50+ mega projects
// Patterns: Factory Pattern (via ProjectCardFactory) & Observer Pattern (via filterObserver)
// ==========================================================

import React, { useState, useEffect } from 'react';
import { ProjectModel } from '../../MODELS/01_ProjectModel';
import { ProjectCardFactory } from '../FACTORIES/01_ProjectCardFactory';
import { filterObserver } from '../../CONTROLLERS/00_FilterObserver';
import fallbackProjects from '../../DATA/projectsData.json';
import { Search, Filter, Layers, X, ShieldCheck, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

export const ProjectGalleryView = ({ onOpenQuoteWithProject }) => {
  const [activeCategory, setActiveCategory] = useState(filterObserver.getCategory());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(9);
  const getFallbackData = () => {
    if (Array.isArray(fallbackProjects)) return fallbackProjects;
    if (fallbackProjects && Array.isArray(fallbackProjects.value)) return fallbackProjects.value;
    return [];
  };

  const [allProjects, setAllProjects] = useState(getFallbackData());
  const [loading, setLoading] = useState(false);

  const categories = ProjectModel.getCategories();

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await ProjectModel.fetchProjects();
      if (Array.isArray(data) && data.length > 0) {
        setAllProjects(data);
      }
      setLoading(false);
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const unsubscribe = filterObserver.subscribe((cat) => {
      setActiveCategory(cat);
      setVisibleCount(9);
    });
    return () => unsubscribe();
  }, []);

  const handleCategoryChange = (cat) => {
    filterObserver.notify(cat);
  };

  const filteredProjects = ProjectModel.filterProjects(allProjects, activeCategory, searchQuery);
  const displayedProjects = filteredProjects.slice(0, visibleCount);

  // Gallery slider logic
  const galleryImages = selectedProject?.images?.length > 0 
    ? selectedProject.images 
    : [{ image: selectedProject?.image }];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-head">
          <div className="badge-pill">
            <Layers size={14} /> Proven Track Record
          </div>
          <h2 className="section-title">50+ Enterprise Mega-Projects</h2>
          <p className="section-subtitle">
            Executing mission-critical fire fighting networks, utilities piping, and mechanical solutions 
            for Bangladesh's foremost conglomerates.
          </p>
        </div>

        {/* Filter & Live Search Toolbar */}
        <div className="filter-controls-bar">
          <div className="filter-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
                <span className="count">
                  {cat === 'All'
                    ? (Array.isArray(allProjects) ? allProjects.length : 0)
                    : (Array.isArray(allProjects) ? allProjects.filter((p) => p && p.category === cat).length : 0)}
                </span>
              </button>
            ))}
          </div>

          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by client, location, or system..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-btn" onClick={() => setSearchQuery('')}>
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Project Cards rendered via Factory Pattern */}
        {loading ? (
          <div className="no-results">
            <p>Loading projects...</p>
          </div>
        ) : displayedProjects.length > 0 ? (
          <div className="projects-grid">
            {displayedProjects.map((project) =>
              ProjectCardFactory.createCard(project, (proj) => {
                setSelectedProject(proj);
                setCurrentImageIndex(0);
              })
            )}
          </div>
        ) : (
          <div className="no-results">
            <Filter size={40} color="#0B3B60" />
            <p>No projects match your specified parameters.</p>
            <button
              className="btn-secondary"
              onClick={() => {
                setSearchQuery('');
                handleCategoryChange('All');
              }}
            >
              Reset Search & Filters
            </button>
          </div>
        )}

        {/* Load More Pagination */}
        {!loading && visibleCount < filteredProjects.length && (
          <div className="load-more-wrap">
            <button
              className="btn-secondary load-more-btn"
              onClick={() => setVisibleCount((prev) => prev + 9)}
            >
              Load More Projects ({filteredProjects.length - visibleCount} Remaining)
            </button>
          </div>
        )}
      </div>

      {/* Project Specs Inspection Modal */}
      {selectedProject && (
        <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>
              <X size={20} />
            </button>
            <div className="modal-image-wrap" style={{ position: 'relative' }}>
              <img src={galleryImages[currentImageIndex].image} alt={selectedProject.client} style={{ objectFit: 'cover', width: '100%', height: '300px' }} />
              <div className="modal-category-badge">{selectedProject.category}</div>
              
              {galleryImages.length > 1 && (
                <>
                  <button onClick={prevImage} className="gallery-nav-btn left" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', padding: '5px', cursor: 'pointer' }}>
                    <ChevronLeft size={24} />
                  </button>
                  <button onClick={nextImage} className="gallery-nav-btn right" style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', padding: '5px', cursor: 'pointer' }}>
                    <ChevronRight size={24} />
                  </button>
                  <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, textAlign: 'center', color: 'white', background: 'rgba(0,0,0,0.5)', padding: '5px' }}>
                    {galleryImages[currentImageIndex].caption || 'Project View'} ({currentImageIndex + 1}/{galleryImages.length})
                  </div>
                </>
              )}
            </div>
            <div className="modal-content">
              <div className="modal-location">
                <MapPin size={16} /> {selectedProject.location || selectedProject.address}
              </div>
              <h2 className="modal-title">{selectedProject.client}</h2>
              <div className="modal-spec-block">
                <h4>System Scope & Deliverables</h4>
                <p>{selectedProject.scope || selectedProject.type}</p>
              </div>
              <div className="modal-spec-highlight">
                <ShieldCheck size={20} color="#0B3B60" />
                <span>{selectedProject.highlight}</span>
              </div>
              <div className="modal-actions">
                <button
                  className="btn-primary"
                  onClick={() => {
                    const client = selectedProject.client;
                    setSelectedProject(null);
                    if (onOpenQuoteWithProject) onOpenQuoteWithProject(client);
                  }}
                >
                  Request Proposal for Similar Project
                </button>
                <button className="btn-secondary" onClick={() => setSelectedProject(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
