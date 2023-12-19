import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name_key: 'SIDEBAR.DASHBOARD',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'N'
    }
  },
  {
    name_key: 'SIDEBAR.SURVEY_ANALYSIS',
    url: '/report/survey',
    icon: 'icon-chart',
    permissions: ["admin", "config", "service", "monitor", "operator"]
  },
  {
    name_key: 'SIDEBAR.CORRELATION_ANALYSIS',
    url: '/report/relation',
    icon: 'icon-equalizer',
    permissions: ["admin", "config", "service", "monitor", "operator"]
  },
  {
    title: true,
    name_key: 'SIDEBAR.MANAGEMENT',
    permissions: []
  },
  {
    name_key: 'SIDEBAR.SURVEY',
    url: '/survey/list',
    icon: 'icon-notebook',
    permissions: ["admin", "config"]
  },
  {
    //name: 'Quản lý khách hàng',
    name_key: 'SIDEBAR.CS_MANAGEMENT',
    url: '/cs/kiosk-invitation',
    icon: 'icon-people',
    permissions: ["admin", "service", "monitor", "operator"],
    children: [
      {
        name_key: 'SIDEBAR.CS_CUSTOMERLIST',
        url: '/cs/customer'
      },
      {
        name_key: 'SIDEBAR.CS_INVITECUSTOMER',
        url: '/cs/kiosk-invitation'
      }
    ]
  },
  {
    name_key: 'SIDEBAR.GROUP_DEVICE',
    url: '/group/list',
    icon: 'icon-grid',
    permissions: ["admin", "service", "monitor"]
  },
  {
    name_key: 'SIDEBAR.DEVICE',
    url: '/device/list',
    icon: 'icon-screen-tablet',
    permissions: ["admin", "service", "monitor"]
  },
  {
    name_key: 'SIDEBAR.COLLECTION',
    url: '/collection/list',
    icon: 'icon-picture',
    permissions: ["admin", "service", "monitor"]
  },
  {
    name_key: 'SIDEBAR.APPLICATION',
    url: '/module/list',
    icon: 'icon-bag',
    permissions: ["admin", "service", "monitor"]
  },
  {
    name_key: 'SIDEBAR.THEME',
    url: '/theme/list',
    icon: 'icon-frame',
    permissions: ["admin", "service", "monitor"]
  },
  {
    name_key: 'SIDEBAR.TARGET',
    url: '/target/list',
    icon: 'icon-user-following',
    permissions: ["admin", "service", "monitor"]
  },
  {
    //name: 'Cấu hình hệ thống',
    name_key: 'SIDEBAR.SYSTEM_CONFIGURATION',
    url: '/cfg/default-language',
    icon: 'icon-people',
    permissions: ["admin", "service", "monitor", "operator"],
    children: [
      {
        name_key: 'SIDEBAR.DEVICE_LANGUAGE',
        url: '/cfg/default-language'
      },
      {
        name_key: 'SIDEBAR.GENERAL_CONFIGURATION',
        url: '/cfg/configuration'
      },
      {
        name_key: 'SIDEBAR.PLUGIN_MANAGEMENT',
        url: '/cfg/plugin-management'
      },
      {
        name_key: 'SIDEBAR.REPORT_PLUGINS',
        url: '/cfg/report-plugins'
      },
      {
        name_key: 'SIDEBAR.POS_NHANH_PAGE',
        url: '/cfg/pos-nhanh-page'
      },
      {
        name_key: 'SIDEBAR.PUBLIC_PAGE',
        url: '/cfg/public-page'
      }
    ]
  },
  {
    //name: 'Quản lý tổ chức',
    name_key: 'SIDEBAR.ORGANIZATION_MNG',
    url: '/organization/list',
    icon: 'icon-people',
    permissions: ["admin", "service", "monitor", "operator"],
    children: [
      {
        name_key: 'SIDEBAR.ORGANIZATION_LIST',
        url: '/organization/list',
      },
      {
        name_key: 'SIDEBAR.ROLES',
        url: '/roles'
      },
      {
        name_key: 'SIDEBAR.ROLE_ASSIGNMENT',
        url: '/role-assignment'
      }
    ]
  },
  {
    //name: 'Tài khoản',
    name_key: 'SIDEBAR.UI_ACCOUNT',
    url: '/profile',
    icon: 'icon-people',
    permissions: ["admin", "service", "monitor", "operator"],
    children: [
      {
        name_key: 'SIDEBAR.PROFILE',
        url: '/account/profile',
      },
      {
        name_key: 'SIDEBAR.CHANGEPASSWORD',
        url: '/account/changepasswd'
      },
      {
        name_key: 'SIDEBAR.LOGINBARCODE',
        url: '/account/loginbarcode'
      }
    ]
  },
  {
    name_key: 'SIDEBAR.OLDVERSION',
    url: 'https://hearme.vn/user',
    icon: 'icon-link',
    class: 'mt-auto',
    variant: 'success',
    attributes: { target: '_blank', rel: 'noopener' }
  },
];
