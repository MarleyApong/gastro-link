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
        Icon: RemixIcons.RiBuildingLine,
        Display: "Entreprises",
        Link: "/companies",
        subNav: [
            {
                Icon: RemixIcons.RiAddLine,
                Display: "Nouvelle entreprise",
                Link: "/companies/new",
            },
            {
                Icon: RemixIcons.RiListRadio,
                Display: "Liste des entreprises",
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
        Icon: RemixIcons.RiBuildingLine,
        Display: "Entreprises",
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
        Icon: RemixIcons.RiBuildingLine,
        Display: "Entreprises",
        Link: "/companies",
        subNav: [
            {
                Icon: RemixIcons.RiAddLine,
                Display: "Nouvelle entreprise",
                Link: "/companies/new",
            },
            {
                Icon: RemixIcons.RiListRadio,
                Display: "Liste des entreprises",
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
        Link: "/customer",
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
        Icon: RemixIcons.RiBuildingLine,
        Display: "Entreprises",
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