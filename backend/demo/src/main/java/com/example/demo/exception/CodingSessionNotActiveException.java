package com.example.demo.exception;

/** Thrown when run/submit is attempted outside an IN_PROGRESS, non-expired session. */
public class CodingSessionNotActiveException extends RuntimeException {
    public CodingSessionNotActiveException(String message) {
        super(message);
    }
}
