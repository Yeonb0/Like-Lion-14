public class Main {
    public static void main(String[] args) {
        // 생성자 new 연산자
        Robot Hubo = new Robot("휴보");
        Robot Ubo = new Robot("유보");

        Hubo.walk();
        Hubo.speak("안녕 인간들");
        System.out.println(Hubo.getName());

        People jio = new People("이름", 23);
        System.out.println(jio.getName());
        System.out.println(jio.getAge());
    }
}
