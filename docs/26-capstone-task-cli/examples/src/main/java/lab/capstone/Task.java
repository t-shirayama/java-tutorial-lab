package lab.capstone;

import java.time.LocalDate;

public record Task(String title, TaskStatus status, LocalDate dueDate) {
    public Task {
        if (title == null || title.isBlank()) {
            throw new IllegalArgumentException("title must not be blank");
        }
        if (status == null) {
            throw new IllegalArgumentException("status must not be null");
        }
        if (dueDate == null) {
            throw new IllegalArgumentException("dueDate must not be null");
        }
    }
}
