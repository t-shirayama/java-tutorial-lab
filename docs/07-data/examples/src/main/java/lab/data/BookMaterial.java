package lab.data;

public final class BookMaterial implements LearningMaterial {
    private final String title;

    public BookMaterial(String title) {
        this.title = title;
    }

    @Override
    public String displayName() {
        return "書籍: " + title;
    }
}
