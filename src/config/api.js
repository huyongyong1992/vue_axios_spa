import { request } from './request';

export const login = (params) => request('/login', params);
