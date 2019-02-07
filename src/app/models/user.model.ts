export interface User {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  destino?: string;
  horarioOrigemSaida?: string;
  transporte?: string;
  ponto_encontro?: string;
}
