"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandler {
    // ========================== Public functions ==========================
    // Common error handlers
    static handleAndThrowError(error, customMessage) {
        if (error instanceof Error) {
            if (customMessage) {
                throw new Error(`${customMessage}: ${error.message}`);
            }
            else {
                throw new Error(error.message);
            }
        }
        else {
            throw new Error(ErrorHandler.UNKNOWN_ERROR_MESSAGE);
        }
    }
    // Decryption error handlers
    static handleDecryptDataWithPasswordError(error, options) {
        let errorMessage = error.message;
        switch (error.message) {
            case "error:1C800064:Provider routines::bad decrypt":
                errorMessage = "The data is not encrypted with the correct key.";
                if (options.includeRepoUrl) {
                    errorMessage += " Make sure the data is encrypted from the correct repository.";
                }
                break;
            case "error:1C80006B:Provider routines::wrong final block length":
                errorMessage = "The data is not encrypted with the correct key or the data is corrupted.";
                if (options.useBase64Input) {
                    errorMessage += " Make sure the input data is valid base64 format.";
                }
                if (options.includeRepoUrl) {
                    errorMessage += " Make sure the data is encrypted from the correct repository.";
                }
                break;
            default:
                errorMessage = `${this.UNKNOWN_ERROR_MESSAGE}: ${error.message}`;
                break;
        }
        return errorMessage;
    }
    static handleDecryptDataWithPrivateKeyError(error) {
        let errorMessage = error.message;
        switch (error.message) {
            case "error:1E08010C:DECODER routines::unsupported":
                errorMessage = `${this.INVALID_PRIVATE_KEY_ERROR_MESSAGE}.`;
                break;
            case "Invalid base64 format. Please provide a valid base64 encoded string.":
                errorMessage = `${this.INVALID_PRIVATE_KEY_ERROR_MESSAGE}.`;
                break;
            default:
                errorMessage = `${this.UNKNOWN_ERROR_MESSAGE}: ${error.message}`;
                break;
        }
        return errorMessage;
    }
}
// ========================== Constants =================================
// Common error messages
ErrorHandler.UNKNOWN_ERROR_MESSAGE = "Unknown error occurred";
// Encryption error messages
ErrorHandler.NO_PUBLIC_KEY_ERROR_MESSAGE = "Encryption failed: No public key found";
// Decryption error messages
ErrorHandler.NO_PRIVATE_KEY_ERROR_MESSAGE = "Decryption failed: No private key found";
ErrorHandler.INVALID_PRIVATE_KEY_ERROR_MESSAGE = "Invalid private key";
ErrorHandler.DECRYPTION_ERROR_MESSAGE = "Decryption failed: None of the given data values could be decrypted using the given private key";
exports.default = ErrorHandler;
