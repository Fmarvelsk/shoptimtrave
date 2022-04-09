import Widgets from "./widgets";
import { footer } from "./data";
const { widgets } = footer;

const Footer: React.FC = () => (
  <footer className="mt-9 mb-4 md:mt-11 lg:mt-16 3xl:mt-20 pt-2.5 lg:pt-0 2xl:pt-2">
    <Widgets widgets={widgets} />
  </footer>
);

export default Footer;
