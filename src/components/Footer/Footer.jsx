import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear(); // 自动获取年份

  return (
    <footer className="footer">
      <p className="footer__font footer__name">Developed by Jiabao Wu</p>
      <p className="footer__font footer__year">{currentYear}</p>
    </footer>
  );
}

export default Footer;
