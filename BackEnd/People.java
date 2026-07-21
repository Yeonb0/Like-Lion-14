public class People {
    // field
    private String name;
    private int age;

    // constructor
    public People(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // method
    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getAge() {
        return age;
    }
}
