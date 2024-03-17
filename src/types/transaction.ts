export interface Transaction {
    _id: string;
    amount: number;
    sourceId: string;
    targetId: string;
    type: number;
    status: number;
    createTime: Date;
    updateTime: Date;
    updateBy: string;
}

export interface TransactionResponse {
    _id: string;
    amount: number;
    sourceId: string;
    targetId: string;
    type: number;
    status: number;
    createTime: Date;
    updateTime: Date;
    updateBy: string;
}

export interface TransactionData {
    data: TransactionResponse[];
    currentPage: number;
    totalPage: number;
}
