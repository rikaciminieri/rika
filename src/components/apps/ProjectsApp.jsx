import { useLanguage } from '../../contexts/LanguageContext';

const PROJECTS = [
  { key: 'portfolio', descKey: 'portfolioDesc', tags: ['React', 'Vite', 'Tailwind CSS'] },
  { key: 'cms', descKey: 'cmsDesc', tags: ['Next.js', 'i18n', 'MDX'] },
  { key: 'events', descKey: 'eventsDesc', tags: ['React', 'Python', 'GraphQL'] },
  { key: 'lab', descKey: 'labDesc', tags: ['D3.js', 'Flask', 'WebSockets'] },
  { key: 'gcApi', descKey: 'gcApiDesc', tags: ['Node', 'Express', 'PostgreSQL'] },
  { key: 'ai', descKey: 'aiDesc', tags: ['Claude API', 'Python', 'LLMs'] },
];

export default function ProjectsApp() {
  const { t } = useLanguage();

  return (
    <div className="notepad-content">
      <h2>{t('projects.title')}</h2>
      <div className="projects-grid">
        {PROJECTS.map((p) => (
          <div key={p.key} className="project-card">
            <h3>{t(`projects.${p.key}`)}</h3>
            <p>{t(`projects.${p.descKey}`)}</p>
            <div className="tags">
              {p.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
