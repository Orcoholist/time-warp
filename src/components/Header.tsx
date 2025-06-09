// import React from 'react';
// import { usePathname } from 'next/navigation';
// import Link from 'next/link';
// import './Header.css';

// const navigationItems = [
//   { id: 1, title: 'Главная', path: '/' },
//   { id: 2, title: 'Машина времени', path: '/timemachine' },
//   // Add other navigation items as needed
// ];

// const Header: React.FC = () => {
//   const pathname = usePathname();
  
//   return (
//     <header className="header">
//       <h1 className="header__title">Путешествия во времени</h1>
//       <nav>
//         <ul className="header__list">
//           {navigationItems.map((item) => (
//             <li key={item.id}>
//               <Link 
//                 href={item.path}
//                 className={pathname === item.path ? "active" : ""}
//               >
//                 {item.title}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default Header;
