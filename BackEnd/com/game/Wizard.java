public class Wizard extends Character{
    private int mana;

    public Wizard(String name, int mana) {
        super(name,100,25);
        this.mana=mana;
    }

    public void showInfo(){
        System.out.println("유형 : 마법사");
        super.showInfo();
        System.out.println("마나 : "+mana);
    }

    public void attack(){
        if(mana>=10){
            System.out.println(getName()+"이 파이어볼을 사용합니다! (공격력: "+getAttackPower()+")");
            mana-=10;
        }else{
            System.out.println(getName()+"이 마나가 부족하여 공격할 수 없습니다.");
        }
    }
}