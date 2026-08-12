package com.example.demo.exception;

/** Thrown when a student tries to call /start a second time for the same
 * assignment (page refresh, reopened tab, etc). Per requirements, tests
 * cannot be resumed once started -- this forces an auto-submit instead. */
public class ResumeNotAllowedException extends RuntimeException {
    public ResumeNotAllowedException(String message) {
        super(message);
    }
}
