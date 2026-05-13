package lab.classes;

public class ReadingGoal {
    private final String title;
    private final int targetPages;

    public ReadingGoal(String title, int targetPages) {
        this.title = title;
        this.targetPages = targetPages;
    }

    @Override
    public String toString() {
        return "ReadingGoal{title='" + title + "', targetPages=" + targetPages + "}";
    }
}
