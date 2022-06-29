export const Menu = () => {
  return (
    <div className="menu">
      <ul className="menu__list">
        <li>
          <div className="menu-icon-home"></div>
        </li>
        <li>
          <div className="menu-icon-market"></div>
        </li>
        <li>
          <div className="menu-icon-search"></div>
        </li>
      </ul>
      <ul className="menu__list">
        <li>
          <div className="menu-icon-settings"></div>
        </li>
        <li>
          <div className="menu-icon-chat"></div>
        </li>
        <li>
          <div className="menu-icon-exit"></div>
        </li>
      </ul>
    </div>
  );
};
