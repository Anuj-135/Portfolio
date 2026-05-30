export const categories = [
    {
        id: 'frontend', label: 'Frontend', emoji: '🎨', color: '#6c63ff',
        skills: [
            { name: 'React', level: 95, desc: 'Hooks, Context, Custom components' },
            { name: 'Next.js', level: 90, desc: 'App Router, SSR, SSG' },
            { name: 'Tailwind CSS', level: 90, desc: 'Utility-first, Responsive design' },
            { name: 'JavaScript', level: 92, desc: 'ES6+, Async, DOM manipulation' },
            { name: 'HTML & CSS', level: 92, desc: 'Semantic HTML, Flexbox, Grid' },
            { name: 'Framer Motion', level: 75, desc: 'Animations, Transitions' },
        ],
    },
    {
        id: 'backend', label: 'Backend', emoji: '⚙️', color: '#06b6d4',
        skills: [
            { name: 'Node.js', level: 45, desc: 'REST APIs, Middleware' },
            { name: 'Express.js', level: 40, desc: 'Routing, Error handling' },
            { name: 'MongoDB', level: 38, desc: 'CRUD, Mongoose ODM' },
            { name: 'REST APIs', level: 70, desc: 'Design, Integration, Testing' },
            { name: 'SQL Basics', level: 40, desc: 'Queries, Joins, Relations' },
            { name: 'Auth / JWT', level: 65, desc: 'Token-based auth, Sessions' },
        ],
    },
    {
        id: 'tools', label: 'Tools', emoji: '🛠️', color: '#f59e0b',
        skills: [
            { name: 'Git & GitHub', level: 92, desc: 'Version control, Collaboration' },
            { name: 'VS Code', level: 90, desc: 'Extensions, Shortcuts, Debugging' },
            { name: 'Figma', level: 60, desc: 'Wireframes, Design handoff' },
            { name: 'npm / yarn', level: 78, desc: 'Package management' },
            { name: 'Postman', level: 65, desc: 'API testing & debugging' },
            { name: 'Vercel', level: 65, desc: 'Deployment, CI/CD' },
        ],
    },
]

export const levelLabel = (n) => {
    if (n >= 85) return 'Expert'
    if (n >= 70) return 'Advanced'
    if (n >= 55) return 'Intermediate'
    return 'Learning'
}