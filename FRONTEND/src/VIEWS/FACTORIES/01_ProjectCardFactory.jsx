// ==========================================================
// VIEW FACTORY: ProjectCardFactory
// Design Pattern: Factory Pattern
// Responsibility: Dynamically instantiates specialized project card views
// based on engineering discipline (Fire Safety, Mechanical, LPG)
// ==========================================================

import React from 'react';
import { ShieldAlert, Flame, Wrench, MapPin, CheckCircle, ArrowUpRight } from 'lucide-react';

const FireSafetyCardView = ({ project, onSelect }) => (
  <div className="project-card fire-safety-card" onClick={() => onSelect(project)}>
    <div className="card-image-wrap">
      <img src={project.image} alt={project.client} loading="lazy" />
      <div className="card-badge badge-fire">
        <ShieldAlert size={14} />
        <span>NFPA Standard</span>
      </div>
      <div className="card-overlay">
        <span className="view-btn">Inspect Specs <ArrowUpRight size={16} /></span>
      </div>
    </div>
    <div className="card-body">
      <div className="card-header">
        <span className="category-tag tag-fire">{project.category}</span>
        <span className="location-tag"><MapPin size={12} /> {project.location || project.address}</span>
      </div>
      <h3 className="project-title">{project.client}</h3>
      <p className="project-desc">{project.scope || project.type}</p>
      <div className="card-footer">
        <span className="highlight-text"><CheckCircle size={14} color="#E61C24" /> {project.highlight}</span>
      </div>
    </div>
  </div>
);

const MechanicalCardView = ({ project, onSelect }) => (
  <div className="project-card mechanical-card" onClick={() => onSelect(project)}>
    <div className="card-image-wrap">
      <img src={project.image} alt={project.client} loading="lazy" />
      <div className="card-badge badge-mechanical">
        <Wrench size={14} />
        <span>Heavy Engineering</span>
      </div>
      <div className="card-overlay">
        <span className="view-btn">Inspect Specs <ArrowUpRight size={16} /></span>
      </div>
    </div>
    <div className="card-body">
      <div className="card-header">
        <span className="category-tag tag-mechanical">{project.category}</span>
        <span className="location-tag"><MapPin size={12} /> {project.location || project.address}</span>
      </div>
      <h3 className="project-title">{project.client}</h3>
      <p className="project-desc">{project.scope || project.type}</p>
      <div className="card-footer">
        <span className="highlight-text"><CheckCircle size={14} color="#0B3B60" /> {project.highlight}</span>
      </div>
    </div>
  </div>
);

const LPGCardView = ({ project, onSelect }) => (
  <div className="project-card lpg-card" onClick={() => onSelect(project)}>
    <div className="card-image-wrap">
      <img src={project.image} alt={project.client} loading="lazy" />
      <div className="card-badge badge-lpg">
        <Flame size={14} />
        <span>Central Reticulation</span>
      </div>
      <div className="card-overlay">
        <span className="view-btn">Inspect Specs <ArrowUpRight size={16} /></span>
      </div>
    </div>
    <div className="card-body">
      <div className="card-header">
        <span className="category-tag tag-lpg">{project.category}</span>
        <span className="location-tag"><MapPin size={12} /> {project.location || project.address}</span>
      </div>
      <h3 className="project-title">{project.client}</h3>
      <p className="project-desc">{project.scope || project.type}</p>
      <div className="card-footer">
        <span className="highlight-text"><CheckCircle size={14} color="#D97706" /> {project.highlight}</span>
      </div>
    </div>
  </div>
);

const DefaultCardView = ({ project, onSelect }) => (
  <div className="project-card" onClick={() => onSelect(project)}>
    <div className="card-image-wrap">
      <img src={project.image} alt={project.client} loading="lazy" />
    </div>
    <div className="card-body">
      <h3 className="project-title">{project.client}</h3>
      <p className="project-desc">{project.scope || project.type}</p>
    </div>
  </div>
);

export class ProjectCardFactory {
  static createCard(project, onSelect) {
    switch (project.category) {
      case 'Fire Safety':
        return <FireSafetyCardView key={project.id} project={project} onSelect={onSelect} />;
      case 'Mechanical':
        return <MechanicalCardView key={project.id} project={project} onSelect={onSelect} />;
      case 'LPG Systems':
        return <LPGCardView key={project.id} project={project} onSelect={onSelect} />;
      default:
        return <DefaultCardView key={project.id} project={project} onSelect={onSelect} />;
    }
  }
}
