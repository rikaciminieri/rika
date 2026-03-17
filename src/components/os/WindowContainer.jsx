import { useWindows } from '../../contexts/WindowContext';
import Window from './Window';
import AboutApp from '../apps/AboutApp';
import ProjectsApp from '../apps/ProjectsApp';
import TerminalApp from '../apps/TerminalApp';
// import GalleryApp from '../apps/GalleryApp';
// import CurrentlyApp from '../apps/CurrentlyApp';
import GrilledCheeseApp from '../apps/GrilledCheeseApp';
import ContactApp from '../apps/ContactApp';
// import JapanApp from '../apps/JapanApp';
import TrashApp from '../apps/TrashApp';

const APP_COMPONENTS = {
  welcome: AboutApp,
  projects: ProjectsApp,
  terminal: TerminalApp,
  // gallery: GalleryApp,
  // currently: CurrentlyApp,
  gc: GrilledCheeseApp,
  contact: ContactApp,
  // japan: JapanApp,
  trash: TrashApp,
};

export default function WindowContainer() {
  const { windows } = useWindows();

  return (
    <div id="windowContainer">
      {windows.map((win) => {
        const AppComponent = APP_COMPONENTS[win.appId];
        if (!AppComponent) return null;
        return (
          <Window key={win.id} win={win}>
            <AppComponent appId={win.appId} />
          </Window>
        );
      })}
    </div>
  );
}
