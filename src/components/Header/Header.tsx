// src/components/Header/Header.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveLink } from '../../features/headerSlice';
import { logout } from '../../features/authSlice';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigationItems } from '../../data/navigationItems';
import './Header.css';
import { RootState } from '../../app/store'; // 👈 Импортируем RootState

const Header = () => {
  const dispatch = useDispatch();
  const { activeLinkId } = useSelector((state: RootState) => state.header); // 👈 Используем RootState
  const { isAuthenticated } = useSelector((state: RootState) => state.auth); // 👈 Используем RootState
  const pathname = usePathname();

  const items = React.useMemo(
    () => navigationItems(isAuthenticated),
    [isAuthenticated]
  );

  React.useEffect(() => {
    const currentItem = items.find(item => item.path === pathname);
    if (currentItem) {
      dispatch(setActiveLink(currentItem.id.toString()));
    }
  }, [pathname, items, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="header">
      <ul className="header__list">
        {items.map((item) => (
          <li
            key={item.id}
            className={activeLinkId === item.id.toString() ? "active" : ""}
          >
            <Link href={item.path}>{item.title}</Link>
          </li>
        ))}
        {isAuthenticated && (
          <li>
            <button onClick={handleLogout} className="logout-button">
              Выйти
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Header;
