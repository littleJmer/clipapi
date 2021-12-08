const node_env = process.env.NODE_ENV || 'development';

import prodConfig from './production.config';
import devConfigs from './development.config';

let CONFIG;

if (node_env === 'production') CONFIG = prodConfig;
if (node_env === 'development') CONFIG = devConfigs;

export default CONFIG;