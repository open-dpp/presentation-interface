const keycloakDisabled = true;

export { keycloakDisabled };

export const API_URL = import.meta.env.VITE_API_ROOT_URL as string;
export const MANAGEMENT_ROOT_URL = import.meta.env
  .VITE_MANAGEMENT_ROOT_URL as string;
export const AUTH_ROOT_URL = import.meta.env.VITE_AUTH_ROOT_URL as string;
export const MEDIA_SERVICE_URL = import.meta.env.VITE_MEDIA_SERVICE_ROOT;