import { NavLink } from 'react-router-dom';
import styles from './side-nav.module.css'; // 导入模块化 CSS

const SideNav = () => {
  return (
    <nav className="w-64 h-full bg-gray-800 text-white">
      {/* 标题或 Logo */}
      <div className="p-4 text-center font-bold text-lg bg-gray-900">
        My Dashboard
      </div>

      {/* 导航链接 */}
      <ul className="space-y-4 p-4">
        <li>
          <NavLink
            to="/procurement"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive ? 'bg-indigo-600 font-bold' : 'hover:bg-gray-700'
              }`
            }
          >
            Procurement
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/insight"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive ? 'bg-indigo-600 font-bold' : 'hover:bg-gray-700'
              }`
            }
          >
            Insight
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive ? 'bg-indigo-600 font-bold' : 'hover:bg-gray-700'
              }`
            }
          >
            Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;