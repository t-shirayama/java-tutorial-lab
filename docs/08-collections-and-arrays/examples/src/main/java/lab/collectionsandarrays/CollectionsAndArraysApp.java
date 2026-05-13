package lab.collectionsandarrays;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class CollectionsAndArraysApp {
    public static void main(String[] args) {
        List<String> tasks = new ArrayList<>(List.of("読む", "動かす"));
        tasks.add("書き換える");
        Map<String, Integer> scores = Map.of("文法", 80, "実行", 90);
        Set<String> tags = new LinkedHashSet<>(List.of("java", "maven", "java"));
        ArrayDeque<String> queue = new ArrayDeque<>();
        queue.addLast("1章");
        queue.addLast("2章");
        String[] commands = {"compile", "exec:java"};

        System.out.println("tasks: " + tasks);
        System.out.println("文法 score: " + scores.get("文法"));
        System.out.println("tags: " + tags);
        System.out.println("next: " + queue.removeFirst());
        for (String command : commands) {
            System.out.println("command: " + command);
        }
    }
}
