"use client";
import React, {createContext, useState} from 'react';
import { ServerResponse, request } from '@/services/request';

export enum Category{
    Uncategorized,
    Salgados,
    Doces,
    Bebidas,
    Drinks
}

export type Product = {
    _id: number,
    name: string,
    qtd: number,
    category: Category,
    preco: number,
    description: string
}

type ProductContextType = {
    Products: Product[];
    addProduct: (_id:number, name:string, qtd:number, category:Category, preco:number, description:string) => void;
    removeProduct: (_id:number) => void;
    changeCategory: (_id:number, new_Category:Category) => void;
    deleteProduct: (_id:number) => void;
    loadingProducts: boolean;
    updateProducts: () => void;
    updatedProducts: boolean;
}

export const ProductContext = createContext({} as ProductContextType);

export const ProductContextProvider = ({ children } : {children: React.ReactNode;}) => {
    const [Products, setProducts] = useState<Product[]>([]);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [updatedProducts, setUpdatedProducts] = useState(false);

    const addProduct = (_id:number, name:string, qtd:number, category:Category, preco:number, description:string) => {
        let newProduct = {
            _id: _id,
            name: name,
            qtd: qtd,
            category: category,
            preco: preco,
            description: description
        }
        setProducts([...Products, newProduct]);
    };

    const deleteProduct = async (_id:number) => {
        let res = await request<ServerResponse>(`http://127.0.0.1:5000/products/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxIiwidXNlcm5hbWUiOiJDYXJvbGluZSIsImlzQWRtaW4iOiJ0cnVlIiwiaWF0IjoxNzE4MTEzMzk0fQ.J8uH7BVAXE9YSGEWB5GMo7QWLE78MVyYjjIJEVUbhHQ',
                'isAdmin': 'true'
            },
            referrerPolicy: 'no-referrer',
            cache: 'no-store'
        }, false)
    }

    const updateProducts = async () => {
        if(!updatedProducts){
            let res = await request<Product[]>('http://127.0.0.1:5000/products', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                referrerPolicy: 'no-referrer',
                cache: 'no-store'
            }, false);
            console.log(res);
            setProducts(res);
            setUpdatedProducts(true);
        }
    }

    const removeProduct = async (_id:number) => {
        setProducts(Products.filter((_:Product, index:number) =>
            _id !== index
        ))
    };

    const changeCategory = (_id:number, new_Category:Category) => {
        Products[_id].category = new_Category;
    };

    return (
        <ProductContext.Provider value={{ Products, addProduct, removeProduct, changeCategory, deleteProduct, loadingProducts, updateProducts, updatedProducts }}>
            {children}
        </ProductContext.Provider>
    );
}