package com.example.demo.entity.coding;

/**
 * Tracks whether the Placement Cell has weighed in on a proctoring
 * violation. Only the placement cell can move a PENDING request to
 * APPROVED or REJECTED -- students can never resume on their own.
 */
public enum ResumeDecision {
    NONE,       // no violation has ever happened for this assignment
    PENDING,    // a violation just auto-submitted the test; waiting on PC
    APPROVED,   // PC allowed the student to resume; consumed on next /start
    REJECTED    // PC reviewed the screenshot and denied the resume; final
}
