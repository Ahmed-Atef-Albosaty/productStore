import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    // Validate input fields
    if (
      !newProduct.name ||
      !newProduct.image ||
      !newProduct.price ||
      isNaN(newProduct.price) ||
      newProduct.price <= 0
    ) {
      return { success: false, message: "Please fill in all fields correctly" };
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        // Handle HTTP errors
        const errorData = await res.json();
        return {
          success: false,
          message: errorData.message || "Failed to create product",
        };
      }

      const data = await res.json();
      set((state) => ({ products: [...state.products, data.data] })); // creates a new array with the updated product list
      return { success: true, message: "Product created successfully" };
    } catch (error) {
      // Handle network or unexpected errors
      console.error("Error creating product:", error);
      return {
        success: false,
        message: "An error occurred while creating the product",
      };
    }
  },
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.data });
  },
  deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }
    set((state) => ({
      products: state.products.filter((products) => products._id !== pid),
    }));
    return { success: true, message: data.message };
  },
  updateProduct: async (pid, updateProduct) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateProduct),
    });
    const data = await res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }
    // Update the product in the store
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data.data : product
      ),
    }));
    return { success: true, message: data.message }; // <-- Add this line
  },
}));
