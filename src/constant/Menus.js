
export const MENUS = [
    {
        name: 'Umum',
        children: [
            {
                name: 'Home',
                link: '/home',
                iconClassName: 'fas fa-home',
            }, {
                name: 'Characterized',
                link: '/characterizer',
                iconClassName: 'fas fa-tachometer-alt',
                // authenticated: true,
            }]
    }, {
        name: 'Help',
        children: [
            {
                name: 'About',
                link: '/about',
                // iconClassName: 'fas fa-database'
            },
            {
                name: 'Tutorial',
                link: '/tutorial',
                iconClassName: 'fas fa-users',
            }
        ]


    }

]
