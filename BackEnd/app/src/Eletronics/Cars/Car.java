package Electronics.Cars;

// 자동차 클래스 기본 설계
public class Car implements CarInterface{
    private String brand;
    private int speed;

    // 생성자
    public Car(String brand) {
        this.brand = brand;
        this.speed = 0;
    }
    public Car(String brand, int speed){
        this.brand=brand;
        this.speed=speed;
    }

    //Getter
    public String getBrand(){ return this.brand;}
    public int getSpeed(){ return this.speed; }

    //Setter
    public void setBrand(String brand){this.brand = brand;}
    public void setSpeed(int speed){ this.speed= speed;}


    // 가속 메서드
    public void accelerate() {
        speed += 10;
        System.out.println(this.brand + " 가속 중! 현재 속도: " + speed + "km/h");
    }

    public void isChargeable() {
        System.out.println(this.brand + " is not chargeable.");
    }

}