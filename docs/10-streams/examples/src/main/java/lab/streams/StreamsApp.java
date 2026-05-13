package lab.streams;

import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class StreamsApp {
    record Lesson(String title, int minutes) {
    }

    public static void main(String[] args) {
        List<Lesson> lessons = List.of(
                new Lesson("文字列", 20),
                new Lesson("コレクション", 35),
                new Lesson("ストリーム", 30)
        );

        List<String> longLessons = lessons.stream()
                .filter(lesson -> lesson.minutes() >= 30)
                .map(Lesson::title)
                .toList();
        int totalMinutes = lessons.stream().mapToInt(Lesson::minutes).sum();
        double averageMinutes = lessons.stream()
                .mapToInt(Lesson::minutes)
                .average()
                .orElse(0.0);
        Optional<Lesson> firstLong = lessons.stream().filter(lesson -> lesson.minutes() >= 30).findFirst();
        List<String> generatedTopics = Stream.of("lambda", "stream", "optional")
                .map(String::toUpperCase)
                .toList();
        int rangeTotal = IntStream.rangeClosed(1, 3).sum();

        System.out.println("long lessons: " + longLessons);
        System.out.println("total minutes: " + totalMinutes);
        System.out.println("average minutes: " + averageMinutes);
        System.out.println("first long: " + firstLong.map(Lesson::title).orElse("なし"));
        System.out.println("generated topics: " + generatedTopics);
        System.out.println("range total: " + rangeTotal);

        Optional<Lesson> tooLong = lessons.stream()
                .filter(lesson -> lesson.minutes() >= 60)
                .findFirst();
        System.out.println("too long lesson: " + tooLong.map(Lesson::title).orElse("なし"));
    }
}
