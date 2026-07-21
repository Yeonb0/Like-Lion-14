public class Main {
    public static void main(String[] args) {

        WizardCookie wizardCookie = new WizardCookie("마법사 쿠키");
        WizardCookie wizardCookie2 = new WizardCookie("마법마법 쿠키",120,30);


        wizardCookie.showInfo();
        wizardCookie2.showInfo();
        wizardCookie2.attack();
        wizardCookie2.attack();
        wizardCookie2.attack();
    }
}