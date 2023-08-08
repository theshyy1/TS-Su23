export interface Product {
    id: number;
    name: string;
    price: number;
    image?: string;
    categoryId: number;
    description: string;
}

export interface Category {
    id: number;
    name: string;
}

export interface User {
    id: number;
    name: string;
    password: string;
    confirmpassword?: string;
    roleId?: number;
}

export interface Role {
    id: number;
    name: string;
}