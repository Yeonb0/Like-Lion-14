public class Robot {
    // field
    private String name;

    // constructor
    public Robot(String name) {
        this.name = name;
    }

    // method
    // 걷기
    public void walk() {
        System.out.println(name + "이(가) 걷고 있습니다.");
    }

    // 말하기
    public void speak(String message) {
        System.out.println(name + ": " + message);
    }

    // 이름 가져오기
    public String getName() {
        return name;
    }

    // 이름 설정하기
    public void setName(String name) {
        this.name = name;
    }
}
