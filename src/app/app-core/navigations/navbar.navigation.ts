export const NAVBAR_NAVIGATION: NavbarNavigation[] = [
    {link: '/', title: 'Home'},
    {link: '/home/about', title: 'About Us'},
    {link: '/home/contact-us', title: 'Contact-us'},
    {link: '/auth/sign-in', title: 'Sign-in'},
]

export interface NavbarNavigation {
    title: string
    link: string
}
