import { Content } from './Content';
import { Menu } from './Menu';
import { Sidebar } from './Sidebar';

export const Main = () => {
  return (
    <div className="main">
      <Menu />
      <Sidebar />
      <Content />
    </div>
  );
};
