public class Cookie {

    private String name;
    private int hp;

    public Cookie(String name){
        this.name = name;
        this.hp = 100;
    }
    
    public Cookie(String name, int hp){
        this.name = name;
        this.hp = hp;
    }

    public void run(){
        this.hp -= 10;
        System.out.println(name+"가 달립니다. 현재 체력: " + hp +"hp");
    }

    public void attack(){
        System.out.println(name+"가 공격합니다");
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getHp() {
        return hp;
    }

    public void setHp(int hp) {
        this.hp = hp;
    }
}