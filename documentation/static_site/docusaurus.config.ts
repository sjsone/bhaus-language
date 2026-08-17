import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import remarkGithubAdmonitionsToDirectives from "remark-github-admonitions-to-directives";
import rehypeRfcKeywords from "./src/plugins/rehypeRfcKeywords";

const config: Config = {
    title: "BHaus",
    tagline: "Architecture and Design for Software Engineering",
    favicon: "img/favicon.ico",

    // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
    future: {
        v4: true, // Improve compatibility with the upcoming Docusaurus v4
    },

    url: "https://sjsone.github.io/bhaus-language",
    baseUrl: "/",


    trailingSlash: false,

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: "sjsone", // Usually your GitHub org/user name.
    projectName: "bhaus-language", // Usually your repo name.

    onBrokenLinks: "throw",

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: "en",
        locales: ["en"],
    },

    presets: [
        [
            "classic",
            {
                docs: {
                    sidebarPath: "./sidebarsLanguage.ts",
                    path: "../language",
                    beforeDefaultRemarkPlugins: [remarkGithubAdmonitionsToDirectives],
                },
                theme: {
                    customCss: [
                        "./src/css/colors.css",
                        "./src/css/custom.css",
                    ],
                },
            } satisfies Preset.Options,
        ],
    ],

    plugins: [
        [
            "@docusaurus/plugin-content-docs",
            {
                id: "specification",
                path: "../specification",
                routeBasePath: "specification",
                sidebarPath: "./sidebarsSpecification.ts",
                beforeDefaultRemarkPlugins: [remarkGithubAdmonitionsToDirectives],
                rehypePlugins: [rehypeRfcKeywords],
                // ... other options
            },
        ],
        [
            "@docusaurus/plugin-content-docs",
            {
                id: "gettingStarted",
                path: "../getting-started",
                routeBasePath: "getting-started",
                sidebarPath: "./sidebarsGettingStarted.ts",
                beforeDefaultRemarkPlugins: [remarkGithubAdmonitionsToDirectives],
                rehypePlugins: [rehypeRfcKeywords],


                // ... other options
            },
        ],
    ],

    themeConfig: {
        // Replace with your project's social card
        image: "img/docusaurus-social-card.jpg",
        colorMode: {
            respectPrefersColorScheme: true,
        },
        navbar: {
            title: "BHaus",
            logo: {
                alt: "BHaus Logo",
                src: "img/logo.svg",
            },
            items: [
                {
                    type: "docSidebar",
                    sidebarId: "languageSidebar",
                    position: "left",
                    label: "Language",
                },
                {
                    type: "docSidebar",
                    docsPluginId: "specification",
                    sidebarId: "specificationSidebar",
                    position: "left",
                    label: "Specification",
                },
                {
                    type: "docSidebar",
                    docsPluginId: "gettingStarted",
                    sidebarId: "gettingStartedSidebar",
                    position: "left",
                    label: "Getting Started",
                },
                {
                    href: "https://github.com/sjsone/bhaus-toolset",
                    label: "GitHub",
                    position: "right",
                },
            ],
        },
        docs: {
        },
        footer: {
            links: [
                {
                    title: "Docs",
                    items: [
                        {
                            label: "Introduction",
                            to: "/docs",
                        },
                        {
                            label: "Getting Started",
                            to: "/getting-started/installation",
                        },
                        {
                            label: "Specification",
                            to: "/specification",
                        },
                    ],
                },
                {
                    title: "More",
                    items: [
                        {
                            label: "GitHub",
                            href: "https://github.com/sjsone/bhaus-toolset",
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} BHaus. Built with Docusaurus.`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
