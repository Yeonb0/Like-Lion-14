package Electronics.Cars;

public class SUV extends AbstractCar {
    public SUV(String brand) {
        super(brand);
    }

    @Override
    public void accelerate() {
        speed += 5;
        System.out.println(brand + " 가속 중! 현재 속도: " + speed + " km/h");
    }
}
