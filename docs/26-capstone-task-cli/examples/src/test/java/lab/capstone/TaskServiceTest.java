package lab.capstone;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDate;
import java.util.List;
import org.junit.jupiter.api.Test;

class TaskServiceTest {
    private final TaskService service = new TaskService();

    @Test
    void todoTasksAreSortedByDueDate() {
        List<Task> tasks = List.of(
                new Task("late", TaskStatus.TODO, LocalDate.of(2026, 5, 20)),
                new Task("done", TaskStatus.DONE, LocalDate.of(2026, 5, 13)),
                new Task("early", TaskStatus.TODO, LocalDate.of(2026, 5, 14))
        );

        List<Task> result = service.todoTasks(tasks);

        assertEquals(List.of("early", "late"), result.stream().map(Task::title).toList());
    }

    @Test
    void searchFindsTitleIgnoringCase() {
        List<Task> tasks = List.of(
                new Task("Learn Stream", TaskStatus.TODO, LocalDate.of(2026, 5, 14)),
                new Task("Write tests", TaskStatus.TODO, LocalDate.of(2026, 5, 15))
        );

        List<Task> result = service.search(tasks, "stream");

        assertEquals(1, result.size());
        assertEquals("Learn Stream", result.getFirst().title());
    }
}
