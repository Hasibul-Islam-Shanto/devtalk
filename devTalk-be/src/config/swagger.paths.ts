import { appsPaths } from './swagger.paths.apps';
import { authPaths } from './swagger.paths.auth';
import { contentPaths } from './swagger.paths.content';
import { userPaths } from './swagger.paths.users';

export const swaggerPaths = {
  ...authPaths,
  ...userPaths,
  ...contentPaths,
  ...appsPaths,
};
