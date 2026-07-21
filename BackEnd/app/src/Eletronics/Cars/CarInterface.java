package Electronics.Cars;

public interface CarInterface {
    String getBrand();
    int getSpeed();
    void setBrand(String brand);
    void setSpeed(int speed);
    void accelerate();
    void isChargeable();
}
