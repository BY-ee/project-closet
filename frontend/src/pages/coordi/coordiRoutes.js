import { Route } from 'react-router-dom';
import CoordiList from './CoordiList';
import UploadCoordi from './UploadCoordi';

const coordiRoutes = [
  <Route path="" element={<CoordiList />} key="coordi" />,
  <Route path="/upload" element={<UploadCoordi />} key="upload" />,
];

export default coordiRoutes;
