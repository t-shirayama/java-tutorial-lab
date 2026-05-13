package lab.strings;

public class StudyTopic {
    private final String name;
    private final String level;

    public StudyTopic(String name, String level) {
        this.name = name;
        this.level = level;
    }

    @Override
    public String toString() {
        return "StudyTopic{name='" + name + "', level='" + level + "'}";
    }
}
