/**
 * Mengubah array error dari server menjadi objek { field: message }
 * @param {Array} errorArray - Array dari objek error (seperti respons server)
 * @returns {Object} Objek error yang siap digunakan oleh state
 */
type ServerErrorItem = {
  origin: string;
  code: string;
  minimum?: number;
  inclusive?: boolean;
  path: string[];
  message: string;
};

type TransformedErrors = {
  [key: string]: string;
};

export const transformErrorMessage = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errorResponse: any
): TransformedErrors => {
  const errorsObject: TransformedErrors = {};

  if (errorResponse?.error && Array.isArray(errorResponse.error)) {
    errorResponse.error.forEach((element: ServerErrorItem) => {
      if (element.path && element.path.length > 0) {
        const fieldName = element.path[0];
        if (!errorsObject[fieldName]) {
          errorsObject[fieldName] = element.message;
        }
      }
    });
  }

  return errorsObject;
};
