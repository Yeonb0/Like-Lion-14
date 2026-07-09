package Electronics.Cars;

public abstract class AbstractCar {
    protected String brand;
    protected int speed;

    public AbstractCar(String brand) {
        this.brand = brand;
        this.speed = 0;
    }

    // abstract method
    public abstract void accelerate();

    public void isChargeable() {
        System.out.println(brand + " is not chargeable.");
    }
}
