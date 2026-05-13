package lab.programmingbasics;

public class StudyPlanPrinter {
    public void printPlan(String title, String packageName, StudyStep[] steps) {
        System.out.println(title);
        System.out.println("パッケージ: " + packageName);
        System.out.println("ステップ数: " + steps.length);
        System.out.println();

        for (StudyStep step : steps) {
            System.out.println(step.getNumber() + ". " + step.getDescription());
        }
    }
}
