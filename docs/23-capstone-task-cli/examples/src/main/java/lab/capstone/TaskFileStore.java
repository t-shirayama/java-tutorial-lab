package lab.capstone;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.List;

public class TaskFileStore {
    public void save(Path path, List<Task> tasks) throws IOException {
        Files.createDirectories(path.getParent());
        String text = tasks.stream()
                .map(this::serialize)
                .reduce("", (left, right) -> left + right + System.lineSeparator());
        Files.writeString(path, text);
    }

    public List<Task> load(Path path) throws IOException {
        return Files.readString(path).lines()
                .filter(line -> !line.isBlank())
                .map(this::deserialize)
                .toList();
    }

    private String serialize(Task task) {
        return task.status() + "|" + task.dueDate() + "|" + task.title();
    }

    private Task deserialize(String line) {
        String[] parts = line.split("\\|", 3);
        if (parts.length != 3) {
            throw new IllegalArgumentException("invalid task line: " + line);
        }
        return new Task(parts[2], TaskStatus.valueOf(parts[0]), LocalDate.parse(parts[1]));
    }
}
