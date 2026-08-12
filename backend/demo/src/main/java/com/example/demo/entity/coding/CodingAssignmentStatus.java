package com.example.demo.entity.coding;

public enum CodingAssignmentStatus {
    ASSIGNED,       // test published, student has not opened it yet
    IN_PROGRESS,    // student has started the timed session
    SUBMITTED,      // student submitted normally before time ran out
    AUTO_SUBMITTED  // forced submit: time expired, tab switch, window blur, fullscreen exit, etc.
}
