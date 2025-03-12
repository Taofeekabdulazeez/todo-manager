import { ApiResponse } from "@/types";

class Http {
  public async post<T>(url: string, data: object) {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    return result as ApiResponse<T>;
  }

  public async get<T>(url: string) {
    const response = await fetch(url, { method: "GET" });
    const result = await response.json();

    return result as ApiResponse<T>;
  }

  public async delete<T>(url: string) {
    const response = await fetch(url, { method: "DELETE" });
    const result = await response.json();

    return result as ApiResponse<T>;
  }

  public async patch<T>(url: string, data: object) {
    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    return result as ApiResponse<T>;
  }

  public async put<T>(url: string, data: object) {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    return result as ApiResponse<T>;
  }
}

const http = new Http();

export default http;
