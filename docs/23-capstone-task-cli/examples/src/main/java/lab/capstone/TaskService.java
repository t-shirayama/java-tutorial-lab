package lab.capstone;

import java.util.Comparator;
import java.util.List;

public class TaskService {
    public List<Task> todoTasks(List<Task> tasks) {
        return tasks.stream()
                .filter(task -> task.status() == TaskStatus.TODO)
                .sorted(Comparator.comparing(Task::dueDate))
                .toList();
    }

    public List<Task> search(List<Task> tasks, String keyword) {
        String normalizedKeyword = keyword == null ? "" : keyword.toLowerCase();
        return tasks.stream()
                .filter(task -> task.title().toLowerCase().contains(normalizedKeyword))
                .toList();
    }
}
