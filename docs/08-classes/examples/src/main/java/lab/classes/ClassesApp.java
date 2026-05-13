package lab.classes;

public class ClassesApp {
    public static void main(String[] args) {
        showClassAndObject();
        showStaticMember();
        showImmutableObject();
    }

    private static void showClassAndObject() {
        Book book = new Book("Java入門", 240);
        book.addPages(20);

        System.out.println("== クラスとオブジェクト ==");
        System.out.println(book);
        System.out.println("summary: " + book.summary());
        System.out.println();
    }

    private static void showStaticMember() {
        new Book("クラス設計", 180);

        System.out.println("== staticメンバ ==");
        System.out.println("created books: " + Book.getCreatedCount());
        System.out.println();
    }

    private static void showImmutableObject() {
        ReadingGoal goal = new ReadingGoal("Java基礎を読む", 120);

        System.out.println("== 不変オブジェクト ==");
        System.out.println(goal);
    }
}
