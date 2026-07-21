public class Main {
    public static void main(String[] args) {

        Wizard wizard=new Wizard("해찬",5);
        Character c1=wizard;

        Character c2=new Warrior("지오");

        c1.showInfo();
        c2.showInfo();

    }
}