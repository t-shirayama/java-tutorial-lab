package lab.classes;

public class Book {
    private static int createdCount;

    private String title;
    private int pageCount;

    public Book(String title, int pageCount) {
        this.title = title;
        this.pageCount = pageCount;
        createdCount++;
    }

    public void addPages(int pages) {
        pageCount = pageCount + pages;
    }

    public String summary() {
        return title + " / " + pageCount + "ページ";
    }

    public static int getCreatedCount() {
        return createdCount;
    }

    @Override
    public String toString() {
        return "Book{title='" + title + "', pageCount=" + pageCount + "}";
    }
}
