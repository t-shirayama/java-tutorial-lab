package lab.programmingbasics;

public class JavaProgrammingBasicsApp {
    private static final String TITLE = "Javaプログラミング初歩";
    private static final String PACKAGE_NAME = "lab.programmingbasics";
    private static final StudyStep[] STUDY_STEPS = {
            new StudyStep(1, "READMEを読む"),
            new StudyStep(2, "サンプルコードを実行する"),
            new StudyStep(3, "メソッド名を変えて再実行する")
    };

    public static void main(String[] args) {
        StudyPlanPrinter printer = new StudyPlanPrinter();
        printer.printPlan(TITLE, PACKAGE_NAME, STUDY_STEPS);
    }
}
