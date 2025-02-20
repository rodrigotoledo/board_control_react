import React from 'react';
import { useProjectContext } from '../context/ProjectContext';

interface Project {
  id: number;
  name: string;
  completed_at?: string | null;
}

const Projects: React.FC = () => {
  const { projects, completeProject, isLoadingProjects } = useProjectContext();

  return (
    <div className="w-full px-10 mt-8">
      <h2 className="text-2xl font-bold mb-4">Project List</h2>
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 px-4 py-2 text-left">Project</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Status</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!isLoadingProjects && projects.map((project: Project) => (
            <tr key={project.id}>
              <td className="border border-gray-200 px-4 py-2">{project.name}</td>
              <td className="border border-gray-200 px-4 py-2">
                {project.completed_at ? (
                  <span className="text-green-500">Completed</span>
                ) : (
                  <span className="text-yellow-500">Pending</span>
                )}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {project.completed_at ? (
                  <span className="text-green-500">{new Date(project.completed_at).toLocaleString()}</span>
                ) : (
                 <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => completeProject(project)}
                  >
                    Mark as Completed
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Projects;
