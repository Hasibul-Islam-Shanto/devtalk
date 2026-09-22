export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const logError = (error: unknown, context: string) => {
  console.error(`[${context}]`, error);
};
