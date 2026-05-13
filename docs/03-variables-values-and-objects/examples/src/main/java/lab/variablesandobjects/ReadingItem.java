package lab.variablesandobjects;

public class ReadingItem {
    private String title;
    private final int pageCount;

    public ReadingItem(String title, int pageCount) {
        this.title = title;
        this.pageCount = pageCount;
    }

    public void rename(String newTitle) {
        title = newTitle;
    }

    @Override
    public String toString() {
        return "ReadingItem{title='" + title + "', pageCount=" + pageCount + "}";
    }
}
