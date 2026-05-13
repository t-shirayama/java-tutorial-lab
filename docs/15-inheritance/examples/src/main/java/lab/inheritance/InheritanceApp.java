package lab.inheritance;

public class InheritanceApp {
    static class Lesson {
        private final String title;

        Lesson(String title) {
            this.title = title;
        }

        String describe() {
            return "Lesson: " + title;
        }

        String category() {
            return "general";
        }
    }

    static class ReadingLesson extends Lesson {
        ReadingLesson(String title) {
            super(title);
        }

        @Override
        String describe() {
            return "Reading " + super.describe();
        }
    }

    static class VideoLesson extends Lesson {
        VideoLesson(String title) {
            super(title);
        }

        @Override
        String category() {
            return "video";
        }
    }

    interface Named {
        String name();
    }

    interface DisplayNamed extends Named {
        default String displayName() {
            return "name=" + name();
        }
    }

    public static void main(String[] args) {
        Lesson[] lessons = {
                new ReadingLesson("継承"),
                new VideoLesson("オーバーライド")
        };
        DisplayNamed named = () -> "Java";

        for (Lesson lesson : lessons) {
            System.out.printf("%s / category=%s / runtime=%s%n",
                    lesson.describe(),
                    lesson.category(),
                    lesson.getClass().getSimpleName());
        }

        System.out.println(named.displayName());
    }
}
