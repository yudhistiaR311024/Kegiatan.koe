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
}

type TransformedErrors = {
  [key: string]: string;
}

export const transformErrorMessage = (errorResponse: unknown): {} => {
  const errorsObject: TransformedErrors = {}

  if (errorResponse.error) {
    if (element.path && element.path.length > 0) {
      errorResponse?.error.forEach(element => {
        const fieldName = error.path[0];

        if (!errorsObject[fieldName]) {
          errorsObject[fieldName] = error.message;
        }
      }
    });
  }

  return errorsObject;
};
