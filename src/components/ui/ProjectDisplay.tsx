import { useState, useEffect } from 'react';
import { Project, ProjectMetric } from '@/data/projects';

// A loading "skeleton" component styled with Tailwind's animate-pulse
function ProjectSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-3 animate-pulse"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-4 animate-pulse"></div>
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-20 animate-pulse"></div>
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-24 animate-pulse"></div>
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-16 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

// This is the main, full component
export default function ProjectDisplay() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // This useEffect hook fetches the "live data" when the component loads
  useEffect(() => {
    async function fetchProjects() {
      setIsLoading(true);
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: Project[] = await response.json();
        setProjects(data);
      } catch (error) {
        console.error(error);
        // Handle error state here (e.g., show an error message)
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, []); // The empty array [] means this runs once when the component mounts

  // Show loading skeletons while data is being fetched
  if (isLoading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Our Projects
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProjectSkeleton />
          <ProjectSkeleton />
          <ProjectSkeleton />
        </div>
      </div>
    );
  }

  // Render the actual projects once data is loaded
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Our Projects
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col"
          >
            <div className="p-6 flex-grow">
              <div className="mb-4">
                <span
                  className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                    project.origin === 'labs'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}
                >
                  {project.origin === 'labs' ? 'Labs Project' : 'Consulting'}
                </span>
                {project.clientName && (
                  <span className="ml-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
                    {project.clientName}
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                {project.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-5">
                {project.description}
              </p>

              {project.short_kpi_summary && (
                <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 dark:bg-gray-700">
                  <p className="text-sm italic font-medium text-blue-800 dark:text-blue-200">
                    {project.short_kpi_summary}
                  </p>
                </blockquote>
              )}

              <div className="flex flex-wrap gap-2 mb-5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2.5 py-0.5 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.metrics && (
              <div className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-6">
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">
                  Key Metrics
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {project.metrics.map((metric) => (
                    <div key={metric.label}>
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {metric.value}
                      </div>
                      <div className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
