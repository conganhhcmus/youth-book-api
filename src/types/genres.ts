export interface Genres {
    _id: string;
    name: string;
    updateTime: Date;
    createTime: Date;
}

export interface GenresResponse {
    _id: string;
    name: string;
    updateTime: Date;
    createTime: Date;
}

export interface GenresData {
    data: GenresResponse[];
    currentPage: number;
    totalPage: number;
}
