public class WizardCookie extends Cookie {
    // field
    int mp;

    // constructor
    public WizardCookie(String name) {
        super(name);
        this.mp = 50;
    }

    public WizardCookie(String name, int hp, int mp) {
        super(name, hp);
        this.mp = mp;
    }

    // method
    public void showInfo() {
        System.out.println("이름: " + this.getName());
        System.out.println("체력: " + this.getHp());
        System.out.println("마나: " + this.mp);
    }

    public void getMp() {
        System.out.println("마나: " + this.mp);
    }

    public void setMp(int mp) {
        this.mp = mp;
    }

    @Override
    public void attack() {
        if (mp >= 20) {
            super.attack();
            mp -= 10;
            this.getMp();
        } else {
            System.out.println("마나가 부족해 공격을 할 수 없습니다.");
        }
    }
}
