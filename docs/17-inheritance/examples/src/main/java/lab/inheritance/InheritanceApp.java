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

    interface Named {
        String name();
    }

    interface DisplayNamed extends Named {
        default String displayName() {
            return "name=" + name();
        }
    }

    public static void main(String[] args) {
        Lesson lesson = new ReadingLesson("継承");
        DisplayNamed named = () -> "Java";
        System.out.println(lesson.describe());
        System.out.println(named.displayName());
    }
}
