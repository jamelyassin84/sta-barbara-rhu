import {FuseNavigationItem} from '@fuse/components/navigation'

export const ADMIN_NAVIGATION: FuseNavigationItem[] = [
    {
        id: '1',
        title: 'Dashboard',
        type: 'basic',
        icon: 'dashboard',
        link: '/admin/dashboard',
    },

    {
        id: '2',
        title: 'Appointments',
        type: 'basic',
        icon: 'feather:calendar',
        link: '/admin/appointments',
    },

    {
        id: '3',
        title: 'Patients',
        type: 'basic',
        icon: 'heroicons_outline:user-group',
        link: '/admin/patients',
    },

    {
        id: '3',
        title: 'Reports',
        type: 'basic',
        icon: 'feather:activity',
        link: '/admin/reports',
    },

    {
        id: '3',
        title: 'Symptoms',
        type: 'basic',
        icon: 'feather:alert-triangle',
        link: '/admin/symptoms',
    },

    {
        id: '3',
        title: 'Symptoms Category',
        type: 'basic',
        icon: 'feather:git-pull-request',
        link: '/admin/symptoms-category',
    },

    {
        id: '4',
        title: 'Users',
        type: 'basic',
        icon: 'feather:user',
        link: '/admin/users',
    },
]
