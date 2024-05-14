package dev.thangnk.jobsgobe.common.enums;

import java.util.stream.Stream;

public enum Role {
    CANDIDATE,
    RECRUITER,
    ADMIN;

    public static Role of(String value) {
        return Stream.of(Role.values())
                .filter(r -> r.name().equalsIgnoreCase(value))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Role is invalid"));
    }

}
