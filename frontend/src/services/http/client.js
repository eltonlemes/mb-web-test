/**
 * Cliente HTTP base usando fetch
 * Configuração centralizada para todas as requests da aplicação
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

/**
 * Cliente HTTP customizado
 */
class HttpClient {
  constructor(baseURL = "") {
    this.baseURL = baseURL;
  }

  /**
   * Faz uma requisição HTTP
   * @param {string} endpoint - Endpoint da API
   * @param {Object} options - Opções da requisição
   * @returns {Promise<Object>}
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const defaultOptions = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    };

    const config = { ...defaultOptions, ...options };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      return data;
    } catch (error) {
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        throw new Error("Erro de conexão com o servidor");
      }
      throw error;
    }
  }

  /**
   * Requisição GET
   * @param {string} endpoint
   * @param {Object} options
   * @returns {Promise<Object>}
   */
  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: "GET" });
  }

  /**
   * Requisição POST
   * @param {string} endpoint
   * @param {Object} data
   * @param {Object} options
   * @returns {Promise<Object>}
   */
  post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  /**
   * Requisição PUT
   * @param {string} endpoint
   * @param {Object} data
   * @param {Object} options
   * @returns {Promise<Object>}
   */
  put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  /**
   * Requisição DELETE
   * @param {string} endpoint
   * @param {Object} options
   * @returns {Promise<Object>}
   */
  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: "DELETE" });
  }
}

// Instância global do cliente HTTP
export const httpClient = new HttpClient(API_BASE_URL);
