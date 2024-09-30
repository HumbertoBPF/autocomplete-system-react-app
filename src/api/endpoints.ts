import { instance } from './http';

export const autocomplete = (searchParams: URLSearchParams) =>
    instance.get(`/autocomplete?${searchParams}`);
export const searchWord = (searchParams: URLSearchParams) =>
    instance.get(`/search?${searchParams}`);
