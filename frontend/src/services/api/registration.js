/**
 * Serviço de cadastro
 * Gerencia todas as requests relacionadas ao processo de cadastro
 */

import { httpClient } from "../http/client.js";
import { ENDPOINTS } from "./endpoints.js";

export async function submitRegistration(data) {
  try {
    const response = await httpClient.post(ENDPOINTS.REGISTRATION.POST, data);
    return {
      success: true,
      message: response.message || "Cadastro realizado com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Erro ao cadastrar.",
    };
  }
}
