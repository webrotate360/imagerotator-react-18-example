import WR360 from '@webrotate360/imagerotator';
import { useEffect, useRef } from 'react';

function App() {
  const viewerApi = useRef(null);

  useEffect(() => {
    const viewer = WR360.ImageRotator.Create('webrotate360');
    viewer.licenseCode = 'your-license-code';
    viewer.settings.configFileURL = '/example/example.xml';
    viewer.settings.graphicsPath = '/graphics';
    viewer.settings.alt = 'Your alt image description';
    viewer.settings.responsiveBaseWidth = 800;
    viewer.settings.responsiveMinHeight = 300;
    viewer.settings.apiReadyCallback = (api, isFullScreen) => {
      viewerApi.current = api;
      viewerApi.current.images.onDrag((event) => {
        console.log(`${ event.action }; current image index = ${ viewerApi.current.images.getCurrentImageIndex() }`);
      });
    };
    viewer.runImageRotator();

    return () => {
      if (viewerApi.current) {
        console.log('Destroying Webrotate...');
        viewerApi.current.delete();
      }
    };
  }, []);

  return (
    <div className="alignCenter">
      <div className="viewerContainer">
        <div id="webrotate360"/>
      </div>
    </div>
  );
}

export default App;
