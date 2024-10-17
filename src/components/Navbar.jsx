// Navbar.js
import React, {useEffect, useState} from 'react';
import { FaBriefcase, FaTasks, FaCheckDouble } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Se estiver usando react-router
import { useTaskContext } from '../context/TaskContext';
import { useProjectContext } from '../context/ProjectContext';


const Navbar = () => {
  const { tasks, completedTaskCount, tasksColor, isLoadingTasks } = useTaskContext();
  const { projects, completedProjectCount, projectsColor, isLoadingProjects } = useProjectContext();
  let [ tasksColorTheme, setTasksColorTheme ] = useState('bg-gray-400')
  let [ tasksCount, setTasksCount ] = useState(null)

  let [ projectsColorTheme, setProjectsColorTheme ] = useState('bg-gray-400')
  let [ projectsCount, setProjectsCount ] = useState(null)
  useEffect(() => {
    if(tasks !== undefined){
      setTasksColorTheme(tasksColor);
      setTasksCount(completedTaskCount);
    }
    if(projects !== undefined){
      setProjectsColorTheme(projectsColor);
      setProjectsCount(completedProjectCount);
    }
  }, [tasks, projects]);

  return (
    <nav className="bg-gray-800 p-4 text-white fixed w-full top-0">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold">
          <FaCheckDouble className='w-10 h-10 m-2' />
        </Link>
        <div className="flex space-x-4">
          <Link to="/tasks" className="flex items-center space-x-2">
            <FaTasks className="mr-2" />
            Tasks
            <span className={`rounded-full ${tasksColorTheme} text-white w-8 h-8 font-bold items-center justify-center flex`}>{tasksCount}</span>
          </Link>
          <Link to="/projects" className="flex items-center space-x-2">
            <FaBriefcase className="mr-2" />
            Projects
            <span className={`rounded-full ${projectsColorTheme} text-white w-8 h-8 font-bold text-center items-center justify-center flex`}>{projectsCount}</span>
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
