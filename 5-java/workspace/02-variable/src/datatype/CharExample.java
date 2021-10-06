package datatype;

public class CharExample {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		char c1 ='A';
		char c2 = 65;
		char c3 = '\u0041';
		
		char c4 ='°¡';
		char c5 = 44032;
		char c6 = '\uac00';
		
		int unicodeA = c1;
		int unicodeGa = c4;
		System.out.println(unicodeA);
		System.out.println(unicodeGa);
	}

}
