import { Product } from '@/types/product';

const BASE_URL = 'https://fakestoreapi.com';

export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchWithErrorHandling<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new ApiError(
        `HTTP error! status: ${response.status}`,
        response.status
      );
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network error occurred');
  }
}

export const api = {
  // Get all products
  async getProducts(): Promise<Product[]> {
    return fetchWithErrorHandling<Product[]>(`${BASE_URL}/products`);
  },

  // Get a single product by ID
  async getProduct(id: number): Promise<Product> {
    return fetchWithErrorHandling<Product>(`${BASE_URL}/products/${id}`);
  },

  // Get products by category
  async getProductsByCategory(category: string): Promise<Product[]> {
    return fetchWithErrorHandling<Product[]>(
      `${BASE_URL}/products/category/${category}`
    );
  },

  // Get all categories
  async getCategories(): Promise<string[]> {
    return fetchWithErrorHandling<string[]>(`${BASE_URL}/products/categories`);
  },
};