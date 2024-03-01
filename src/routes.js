

let superAdmin = [
    {
        name: "Manage classroom",
        component: "ManageClasses",
        to: "/ManageClasses",
        icon: "fa-solid fa-school"
    },
    {
        name: "Manage Entity",
        component: "EntityPage",
        to: "/EntityPage",
        icon: "fa-solid fa-user"
    }

]

export const routesList = [...superAdmin];