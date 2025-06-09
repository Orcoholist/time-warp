'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveLink } from '../../features/headerSlice';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigationItems } from '../../data/navigationItems';
import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const activeLink = useSelector((state: { header: { activeLink: string } }) => state.header.activeLink);
  const pathname = usePathname();
  
  // Устанавливаем активную ссылку на основе текущего пути
  React.useEffect(() => {
    const currentItem = navigationItems.find(item => item.path === pathname);
    if (currentItem) {
      dispatch(setActiveLink(currentItem.id.toString()));
    }
  }, [pathname, dispatch]);

  const handleLinkClick = (linkId: string) => {
    dispatch(setActiveLink(linkId));
  };

  return (
    <div className="header">
      <ul className="header__list">
        {navigationItems.map((item) => (
          <li
            key={item.id}
             className={pathname === item.path ? "active" : ""}
            onClick={() => handleLinkClick(item.id.toString())}
          >
            <Link href={item.path}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Header;
