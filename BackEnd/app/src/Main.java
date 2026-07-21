import Electronics.Cars.Car;
import Electronics.Cars.ElectricCar;

public class Main {
    public static void main(String[] args) {

        Car myCar = new Car("Hyundai");
        myCar.accelerate();
        myCar.isChargeable();
        System.out.println();

        ElectricCar myTesla = new ElectricCar("Tesla");
        myTesla.accelerate();
        myTesla.isChargeable();
    }
}