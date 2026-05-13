package lab.data;

public enum ReadingStatus {
    NOT_STARTED("未着手"),
    READING("読書中"),
    FINISHED("完了");

    private final String label;

    ReadingStatus(String label) {
        this.label = label;
    }

    public String label() {
        return label;
    }
}
