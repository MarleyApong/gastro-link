import * as RemixIcons from "react-icons/ri"

export const ItemsInternalAdmin = [
    {
        Icon: RemixIcons.RiHomeOfficeLine,
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
                Icon: RemixIcons.RiListRadio,
                Display: "Nouvelle enquête",
                Link: "/surveys/new",
            },
            {
                Icon: RemixIcons.RiListRadio,
                Display: "Liste des enquêtes",
                Link: "/surveys/list",
            },
            {
                Icon: RemixIcons.RiStickyNoteLine,
                Display: "Liste des notes",
                Link: "/surveys/note",
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

export const ItemsInternalUser = [
    {
        Icon: RemixIcons.RiHomeOfficeLine,
        Display: "Tableau de bord",
        Link: "/dashboard"
    },
    {
        Icon: RemixIcons.RiOrganizationChart,
        Display: "Organisations",
        Link: "/organizations",
        subNav: [
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
        Link: "/company",
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

export const ItemsExternalAdmin = [
    {
        Icon: RemixIcons.RiHomeOfficeLine,
        Display: "Tableau de bord",
        Link: "/dashboard"
    },
    {
        Icon: RemixIcons.RiBuildingLine,
        Display: "Entreprises",
        Link: "/company",
        subNav: [
            {
                Icon: RemixIcons.RiAddLine,
                Display: "Nouvelle entreprise",
                Link: "/company/new",
            },
            {
                Icon: RemixIcons.RiListRadio,
                Display: "Liste des entreprises",
                Link: "/company/list",
            }
        ]
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
        Link: "/survey",
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