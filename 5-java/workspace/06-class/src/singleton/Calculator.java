package singleton;

// static 멤버만 있음
// static 필드, 메서드

// 객체로 찍어내는 클래스가 아님
// 필드값, 메서드를 기능적인 관점에서 실행하는 클래스
// 싱글턴(singleton) 클래스로 만들어 외부에서 객체 생성을 못하게함
public class Calculator {
	private static Calculator calc = new Calculator();

	private final static double PI = 3.141592;

	// 기본생성자를 외부에서 접근못하게함
	private Calculator() {

	}

	private static Calculator getInstance() {
		return calc;
	}

	static int plus(int a, int b) {
		return a + b;
	}

	static int minus(int a, int b) {
		return a - b;
	}

	static double getAreaCircle(int r) {
		return r * r * PI;
	}
}