export interface PaginatedResponse<T> {
	totalElements: number;
	totalPages: number;
	first: boolean;
	last: boolean;
	pageable: {
		paged: boolean;
		pageNumber: number;
		pageSize: number;
		offset: number;
		sort: {
			sorted: boolean;
			empty: boolean;
			unsorted: boolean;
		};
		unpaged: boolean;
	};
	size: number;
	content: T[];
	number: number;
	sort: {
		sorted: boolean;
		empty: boolean;
		unsorted: boolean;
	};
	numberOfElements: number;
	empty: boolean;
}

export interface PaginationParams {
	page?: number;
	size?: number;
	sort?: string;
}

export interface PaginationContext {
	totalElements: number;
	totalPages: number;
	first: boolean;
	last: boolean;
	size: number;
	number: number;
	numberOfElements: number;
	empty: boolean;
	pageNumber?: number;
	pageSize?: number;
	offset?: number;
}
