package lab.packagesdemo;

import java.time.LocalDate;

import static lab.packagesdemo.MessageFormatter.format;

public class PackagesApp {
    public static void main(String[] args) {
        System.out.println(format("import"));
        System.out.println(MessageFormatter.packagePrivateFormat("access control"));
        System.out.println("full name: " + java.util.Map.Entry.class.getName());
        System.out.println("date: " + LocalDate.of(2026, 5, 13));
    }
}
