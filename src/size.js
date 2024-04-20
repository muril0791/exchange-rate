const isMobile = () => window.matchMedia("(max-width: 767px)").matches;
const isDesktop = () => window.matchMedia("(min-width: 1024px)").matches;
const isLandscape = () => window.matchMedia("(orientation: landscape)").matches;

export default { isMobile, isDesktop, isLandscape };
