import { FaBriefcase, FaTasks, FaCheckDouble } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTasksStats } from '../hooks/useTasksStats';
import { useProjectsStats } from '../hooks/useProjectsStats';
import ProgressBadge from './ProgressBadge';

const Navbar = () => {
  const { data: tasksStats } = useTasksStats();
  const { data: projectsStats } = useProjectsStats();

  return (
    <nav className="bg-gray-800 p-4 text-white fixed w-full top-0">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold flex items-center justify-center">
          <FaCheckDouble className="w-10 h-10 m-2" />
          Board Control
        </Link>
        <div className="flex space-x-4">
          <Link to="/tasks" className="flex items-center space-x-2">
            <FaTasks className="mr-2" />
            Tasks
            <ProgressBadge
              total={tasksStats?.total_count || 0} 
              completed={tasksStats?.completed_count || 0} 
            />
          </Link>
          <Link to="/projects" className="flex items-center space-x-2">
            <FaBriefcase className="mr-2" />
            Projects
            <ProgressBadge
              total={projectsStats?.total_count || 0} 
              completed={projectsStats?.completed_count || 0} 
            />
          </Link>
          <Link to="/sign-out" className="flex items-center space-x-2">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
