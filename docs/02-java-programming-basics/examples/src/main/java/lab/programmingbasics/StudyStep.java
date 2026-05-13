package lab.programmingbasics;

public class StudyStep {
    private final int number;
    private final String description;

    public StudyStep(int number, String description) {
        this.number = number;
        this.description = description;
    }

    public int getNumber() {
        return number;
    }

    public String getDescription() {
        return description;
    }
}
