package com.example.demo.exception;

public class TestAlreadySubmittedException extends RuntimeException {
    public TestAlreadySubmittedException(String message) {
        super(message);
    }
}
