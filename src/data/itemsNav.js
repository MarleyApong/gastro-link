import * as RemixIcons from "react-icons/ri"

export const ItemsInternalAdmin = [
    {
        Icon: RemixIcons.RiDashboardLine,
        Display: "Tableau de bord",
        Link: "/dashboard"
    },
    {
        Icon: RemixIcons.RiOrganizationChart,
        Display: "Organisations",
        Link: "/organizations",
        subNav: [
            {
                Icon: RemixIcons.RiAddLine,
                Display: "Nouvelle organisation",
                Link: "/organizations/new",
            },
            {
                Icon: RemixIcons.RiListRadio,
                Display: "Liste des organisations",
                Link: "/organizations/list",
            }
        ]
    },
    {
        Icon: RemixIcons.RiStoreLine,
        Display: "Restaurants",
        Link: "/companies",
        subNav: [
            {
                Icon: RemixIcons.RiAddLine,
                Display: "Nouveau restaurant",
                Link: "/companies/new",
            },
            {
                Icon: RemixIcons.RiListRadio,
                Display: "Liste des restaurants",
                Link: "/companies/list",
            }
        ]
    },
    {
        Icon: RemixIcons.RiSurveyLine,
        Display: "Enquêtes",
        Link: "/surveys",
        subNav: [
            {
                Icon: RemixIcons.RiAddLine,
                Display: "Nouvelle enquête",
                Link: "/surveys/new",
            },
            {
                Icon: RemixIcons.RiListRadio,
                Display: "Liste des enquêtes",
                Link: "/surveys/list",
            }
        ]
    },
    {
        Icon: RemixIcons.RiHomeOfficeLine,
        Display: "Gestion",
        Link: "/managers",
        subNav: [
            {
                Icon: RemixIcons.RiPantoneLine,
                Display: "produits",
                Link: "/managers/products",
            },
            {
                Icon: RemixIcons.RiKeynoteLine,
                Display: "Tables",
                Link: "/managers/tables",
            }
        ]
    },
    {
        Icon: RemixIcons.RiUserHeartLine,
        Display: "Clients",
        Link: "/customers",
    },
    {
        Icon: RemixIcons.RiUserSettingsLine,
        Display: "Utilisateurs",
        Link: "/users",
        subNav: [
            {
                Icon: RemixIcons.RiAddLine,
                Display: "Nouveau utilisateur",
                Link: "/users/new",
            },
            {
                Icon: RemixIcons.RiListRadio,
                Display: "Liste des utilisateurs",
                Link: "/users/list",
            }
        ]
        
    },
    {
        Icon: RemixIcons.RiSoundModuleLine,
        Display: "Paramètres",
        Link: "/settings",
    }
]

export const ItemsInternalUser = [
    {
        Icon: RemixIcons.RiDashboardLine,
        Display: "Tableau de bord",
        Link: "/dashboard"
    },
    {
        Icon: RemixIcons.RiOrganizationChart,
        Display: "Organisations",
        Link: "/organizations",
    },
    {
        Icon: RemixIcons.RiStoreLine,
        Display: "Restaurants",
        Link: "/companies",
    },
    {
        Icon: RemixIcons.RiSurveyLine,
        Display: "Enquêtes",
        Link: "/survey",
        subNav: [
            {
                Icon: RemixIcons.RiListRadio,
                Display: "Liste des enquêtes",
                Link: "/survey/list",
            }
        ]
    },
    {
        Icon: RemixIcons.RiUserHeartLine,
        Display: "Clients",
        Link: "/customer",
    },
    {
        Icon: RemixIcons.RiSoundModuleLine,
        Display: "Paramètres",
        Link: "/settings",
    }
]

//==============================================

export const ItemsExternalSuperAdmin = [
    {
        Icon: RemixIcons.RiDashboardLine,
        Display: "Tableau de bord",
        Link: "/dashboard"
    },
    {
        Icon: RemixIcons.RiStoreLine,
        Display: "Restaurants",
        Link: "/companies",
        subNav: [
            {
                Icon: RemixIcons.RiAddLine,
                Display: "Nouveau restaurant",
                Link: "/companies/new",
            },
            {
                Icon: RemixIcons.RiListRadio,
                Display: "Liste des restaurants",
                Link: "/companies/list",
            }
        ]
    },
    {
        Icon: RemixIcons.RiSurveyLine,
        Display: "Enquêtes",
        Link: "/surveys",
        subNav: [
            {
                Icon: RemixIcons.RiAddLine,
                Display: "Nouvelle enquête",
                Link: "/surveys/new",
            },
            {
                Icon: RemixIcons.RiListRadio,
                Display: "Liste des enquêtes",
                Link: "/surveys/list",
            }
        ]
    },
    {
        Icon: RemixIcons.RiHomeOfficeLine,
        Display: "Gestion",
        Link: "/managers",
        subNav: [
            {
                Icon: RemixIcons.RiPantoneLine,
                Display: "produits",
                Link: "/managers/products",
            },
            {
                Icon: RemixIcons.RiKeynoteLine,
                Display: "Tables",
                Link: "/managers/tables",
            }
        ]
    },
    {
        Icon: RemixIcons.RiUserHeartLine,
        Display: "Clients",
        Link: "/customers",
    },
    {
        Icon: RemixIcons.RiUserSettingsLine,
        Display: "Utilisateurs",
        Link: "/users",
        subNav: [
            {
                Icon: RemixIcons.RiAddLine,
                Display: "Nouveau utilisateur",
                Link: "/users/new",
            },
            {
                Icon: RemixIcons.RiListRadio,
                Display: "Liste des utilisateurs",
                Link: "/users/list",
            }
        ]
        
    },
    {
        Icon: RemixIcons.RiSoundModuleLine,
        Display: "Paramètres",
        Link: "/settings",
    }
]

export const ItemsExternalAdmin = [
    {
        Icon: RemixIcons.RiHomeOfficeLine,
        Display: "Tableau de bord",
        Link: "/dashboard"
    },
    {
        Icon: RemixIcons.RiSurveyLine,
        Display: "Enquêtes",
        Link: "/surveys",
        subNav: [
            {
                Icon: RemixIcons.RiAddLine,
                Display: "Nouvelle enquête",
                Link: "/surveys/new",
            },
            {
                Icon: RemixIcons.RiListRadio,
                Display: "Liste des enquêtes",
                Link: "/surveys/list",
            }
        ]
    },
    {
        Icon: RemixIcons.RiUserHeartLine,
        Display: "Clients",
        Link: "/customers",
    },
    {
        Icon: RemixIcons.RiHomeOfficeLine,
        Display: "Gestion",
        Link: "/managers",
        subNav: [
            {
                Icon: RemixIcons.RiPantoneLine,
                Display: "produits",
                Link: "/managers/products",
            },
            {
                Icon: RemixIcons.RiKeynoteLine,
                Display: "Tables",
                Link: "/managers/tables",
            }
        ]
    },
    {
        Icon: RemixIcons.RiSoundModuleLine,
        Display: "Paramètres",
        Link: "/settings",
    }
]

export const ItemsExternalUser = [
    {
        Icon: RemixIcons.RiHomeOfficeLine,
        Display: "Tableau de bord",
        Link: "/dashboard"
    },
    {
        Icon: RemixIcons.RiStoreLine,
        Display: "Restaurants",
        Link: "/company",
    },
    {
        Icon: RemixIcons.RiSurveyLine,
        Display: "Enquêtes",
        Link: "/surveys",
        subNav: [
            {
                Icon: RemixIcons.RiListRadio,
                Display: "Liste des enquêtes",
                Link: "/survey/list",
            },
            {
                Icon: RemixIcons.RiStickyNoteLine,
                Display: "Liste des notes",
                Link: "/survey/note",
            }
        ]
    },
    {
        Icon: RemixIcons.RiUserHeartLine,
        Display: "Clients",
        Link: "/customer",
    },
    {
        Icon: RemixIcons.RiSoundModuleLine,
        Display: "Paramètres",
        Link: "/settings",
    }
]

export const ItemsExternalServer = [
    {
        Icon: RemixIcons.RiHomeOfficeLine,
        Display: "Tableau de bord",
        Link: "/dashboard"
    },
    {
        Icon: RemixIcons.RiAlarmWarningLine,
        Display: "Commande",
        Link: "/orders",
    },
    {
        Icon: RemixIcons.RiArticleLine,
        Display: "Menu",
        Link: "/menu",
    },
    {
        Icon: RemixIcons.RiSoundModuleLine,
        Display: "Paramètres",
        Link: "/settings",
    }
]