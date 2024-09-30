interface HandleErrorProps {
  message: string;
  error: unknown;
}

export function handleError({ message, error }: HandleErrorProps): never {
  console.error(error);
  if (error instanceof Error) {
    throw error;
  }
  throw new Error(message);
}
