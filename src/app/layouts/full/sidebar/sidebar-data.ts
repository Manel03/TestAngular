import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
 
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },

  {
    displayName: 'Gestion des utilisateurs',
    iconName: 'user-plus',
    route: '/back-office/user-list',
  },
  {
    displayName: 'Demande des formations',
    iconName: 'layout-navbar-expand',
    route: '/back-office/excel-list',
  },
  {
    displayName: 'Gestion des Actualités',
    iconName: 'list',
    route: '/back-office/actualite-list',
  },
  {
    displayName: 'Gestion des Formations',
    iconName: 'poker-chip',
    route: '/back-office/formation-list',
  },
  {
    displayName: 'Tooltips',
    iconName: 'tooltip',
    route: '/ui-components/tooltips',
  },
  {
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'lock',
    route: '/authentication/login',
  },
  {
    displayName: 'Register',
    iconName: 'user-plus',
    route: '/authentication/register',
  },
  {
    navCap: 'Extra',
  },
  {
    displayName: 'Icons',
    iconName: 'mood-smile',
    route: '/extra/icons',
  },
  // {
  //   displayName: 'Sample Page',
  //   iconName: 'aperture',
  //   route: '/extra/sample-page',
  // },
];
