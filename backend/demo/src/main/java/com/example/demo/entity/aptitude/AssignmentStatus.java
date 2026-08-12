package com.example.demo.entity.aptitude;

public enum AssignmentStatus {
    ASSIGNED,       // test published, student has not opened it yet
    IN_PROGRESS,    // student has started the timed session
    SUBMITTED,      // student submitted normally before time ran out
    AUTO_SUBMITTED  // forced submit: time expired, tab switch, or fullscreen exit
}
