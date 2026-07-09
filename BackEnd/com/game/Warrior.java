public class Warrior extends Character{
    public Warrior(String name){
        super(name, 150,20);
    }

    public void attack(){
        System.out.println(getName()+"이 검으로 공격합니다! (공격력: "+getAttackPower()+")");
    }
}