import { BugIcon, Icon, MarkGithubIcon, ReportIcon, StarIcon } from "@primer/octicons-react";

type MenuIcon = {
    name: string;
    title: string;
    icon: Icon;
    href: string;
}

// menu bar icons for navigation
export const menuBarIcons: Record<string, MenuIcon> = {
    webstore: {
        name: "Web Store",
        title: "Rate this extension on chrome webstore",
        icon: StarIcon,
        href: "https://chrome.google.com/webstore/category/extensions",
    },
    bug: {
        name: "Bug",
        title: "Report a bug",
        icon: BugIcon,
        href: "https://github.com/shufo/timed-url-opener/issues/new"
    },
    feedback: {
        name: "Feedback",
        title: "Feedback",
        icon: ReportIcon,
        href: "https://github.com/shufo/timed-url-opener/issues/new"
    },
    github: {
        name: "GitHub",
        title: "Star this project on GitHub",
        icon: MarkGithubIcon,
        href: "https://github.com/shufo/timed-url-opener"
    },
};
