import Github from './Github';

function Footer() {
  return (
    <footer className="w-full h-26 bg-primary flex items-center justify-between p-[12px] font-serif font-light">
      <div className="flex flex-col gap-1">
        <p>Cocktail Discovery Service, SSOUL </p>
        <div className="flex flex-col sm:flex-row gap-0.5 sm:gap-2">
          <span>&copy; 2025 SSOUL.</span>
          <span>All rights reserved.</span>
        </div>
      </div>
      <Github />
    </footer>
  );
}

export default Footer;
