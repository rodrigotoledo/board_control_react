import { FaBriefcase, FaTasks, FaCheckDouble } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks';
import { useProjects } from '../hooks/useProjects';
import ProgressBadge from './ProgressBadge';

const Navbar = () => {
  const { data: tasksData } = useTasks();
  const { data: projectsData } = useProjects();

  return (
    <nav className="bg-gray-800 p-4 text-white fixed w-full top-0">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold">
          <FaCheckDouble className="w-10 h-10 m-2" />
        </Link>
        <div className="flex space-x-4">
          <Link to="/tasks" className="flex items-center space-x-2">
            <FaTasks className="mr-2" />
            Tasks
            <ProgressBadge
              total={tasksData?.meta?.total_count || 0} 
              completed={tasksData?.meta?.total_completed_count || 0} 
            />
          </Link>
          <Link to="/projects" className="flex items-center space-x-2">
            <FaBriefcase className="mr-2" />
            Projects
            <ProgressBadge
              total={projectsData?.meta?.total_count || 0} 
              completed={projectsData?.meta?.total_completed_count || 0} 
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
