package lab.streams;

import java.util.List;
import java.util.Optional;

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
        Optional<Lesson> firstLong = lessons.stream().filter(lesson -> lesson.minutes() >= 30).findFirst();

        System.out.println("long lessons: " + longLessons);
        System.out.println("total minutes: " + totalMinutes);
        System.out.println("first long: " + firstLong.map(Lesson::title).orElse("なし"));
    }
}
