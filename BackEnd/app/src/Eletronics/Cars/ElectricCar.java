package Electronics.Cars;

// 전기차 클래스 (상속 적용)
// ElectricCar는 별도로 Getter와 Setter를 정의하지 않아도 됨
public class ElectricCar extends Car {
    private int batteryLevel;

    public ElectricCar(String brand) {
        super(brand);
        this.batteryLevel = 100;
    }

    @Override
    public void accelerate() {
        if (batteryLevel > 0) {
            super.accelerate();
            batteryLevel -= 5;
            System.out.println("배터리 잔량: " + batteryLevel + "%");
        } else {
            System.out.println("배터리가 부족하여 가속할 수 없습니다.");
        }
    }
}
