import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

export const buildQueryString = (params) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
            query.set(key, String(value));
        }
    });
    return query.toString();
};

export const useProductQuery = () => {
    const [searchParams] = useSearchParams();

    return useMemo(() => ({
        description_like: searchParams.get('description_like') || '',
        productCategory: searchParams.get('productCategory') || '',
        sort: searchParams.get('sort') || '',
        page: Number(searchParams.get('page') || '1'),
        limit: Number(searchParams.get('limit') || '10'),
    }), [searchParams]);
};

