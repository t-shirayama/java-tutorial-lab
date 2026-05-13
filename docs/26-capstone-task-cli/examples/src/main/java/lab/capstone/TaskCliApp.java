package lab.capstone;

import java.io.IOException;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.List;

public class TaskCliApp {
    private static final System.Logger LOGGER = System.getLogger("lab.capstone");

    public static void main(String[] args) throws IOException {
        LOGGER.log(System.Logger.Level.INFO, "タスク管理CLIを開始します");

        List<Task> tasks = List.of(
                new Task("Javaを復習する", TaskStatus.TODO, LocalDate.of(2026, 5, 14)),
                new Task("Streamで絞り込む", TaskStatus.TODO, LocalDate.of(2026, 5, 15)),
                new Task("JUnitテストを実行する", TaskStatus.DONE, LocalDate.of(2026, 5, 13))
        );

        TaskService service = new TaskService();
        TaskFileStore store = new TaskFileStore();
        Path path = Path.of("target", "tasks.txt");

        System.out.println("=== タスク管理CLI ===");
        service.todoTasks(tasks).forEach(task -> System.out.println("未完了: " + task.title()));
        service.search(tasks, "Stream").forEach(task -> System.out.println("検索: " + task.title()));

        store.save(path, tasks);
        System.out.println("保存先: " + path);
        System.out.println("読み込み件数: " + store.load(path).size());

        LOGGER.log(System.Logger.Level.INFO, "タスク管理CLIを終了します");
    }
}
