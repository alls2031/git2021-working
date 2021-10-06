package exam;

import java.util.HashMap;
import java.util.InputMismatchException;
import java.util.Map;
import java.util.Scanner;

public class BankApplication {

	// Map 여러가지 형태의 Map 가능한 타입(Inteface)
	// = HashMap
	// = HashTable
	// = TreeMap
	//
	// 대입하는 자료구조에 따라서 같은 메서드를 호출하더라도
	// 내부적인 처리방식이 다름

	// 계좌목록 Map 객체
	// Map<키타입, 값타입> 변수명 = new HashMap<키타입, 값타입>();
	private static Map<String, Account> accounts = new HashMap<String, Account>();

	private static Scanner scanner = new Scanner(System.in);

	public static void main(String[] args) {

		boolean run = true;
		while (run) {
			System.out.println("----------------------------------------------------------");
			System.out.println("1.계좌생성 | 2.계좌목록 | 3.예금 | 4.출금 | 5.종료");
			System.out.println("----------------------------------------------------------");
			System.out.print("선택> ");

			try {
				int selectNo = scanner.nextInt();

				if (selectNo == 1) {
					createAccount();
				} else if (selectNo == 2) {
					accountList();
				} else if (selectNo == 3) {
					deposit();
				} else if (selectNo == 4) {
					withdraw();
				} else if (selectNo == 5) {
					run = false;
				} else if (selectNo > 5 || selectNo < 1) {
					System.out.println("1~5의 숫자를 입렵해 주세요.");
				}
			} catch (InputMismatchException exception) {
				break;
			}
		}

		System.out.println("프로그램 종료");
	}

	// 계좌생성하기(계좌추가하기)
	private static void createAccount() {
		System.out.println("-----------------");
		System.out.println("계좌생성");
		System.out.println("-----------------");
		System.out.println("계좌번호: ");

		String Ano = scanner.next();

		if (accounts.containsKey(Ano)) {
			System.out.println("해당 계좌는 이미 존재합니다");
			return;
		}

		System.out.println("계좌주: ");
		String Owner = scanner.next();

		System.out.println("초기입금액: ");
		int Balance = scanner.nextInt();

		if (Balance <= 10) {
			System.out.println("최소 입력 금액은 10원입니다.");
		} else {
			Account account = new Account(Ano, Owner, Balance);
			accounts.put(Ano, account);
			System.out.println("계좌가 생성되었습니다.");
		}

	}

	// 계좌목록보기
	private static void accountList() {
		if (accounts.isEmpty()) {
			System.out.println("계좌 목록이 없습니다.");
			return;
		}

		System.out.println("-----------");
		System.out.println("계좌목록");
		System.out.println("-----------");

		for (Account account : accounts.values()) {
			String Owner = account.getOwner();
			int balance = account.getBalance();
			System.out.println(account.getAno() + "\t" + Owner + "\t" + balance);
		}

	}

	// 예금하기(필드값수정)
	private static void deposit() {
		if (accounts.isEmpty()) {
			System.out.println("예금할 계좌 목록이 없습니다.");
			return;
		}

		System.out.println("--------");
		System.out.println("예금");
		System.out.println("--------");
		System.out.println("계좌번호: ");
		String Ano = scanner.next();
		if (accounts.containsKey(Ano)) {
			System.out.println("예금액: ");
			int depo = scanner.nextInt();
			Account account = accounts.get(Ano);
			account.setBalance(account.getBalance() + depo);
			System.out.println("예금 되었습니다.");
		}
	}

	// 출금하기(필드값수정)
	private static void withdraw() {
		if (accounts.isEmpty()) {
			System.out.println("출금할 계좌가 없습니다.");
			return;
		}

		System.out.println("--------");
		System.out.println("출금");
		System.out.println("--------");
		System.out.println("계좌번호: ");
		String ano = scanner.next();
		if (accounts.containsKey(ano)) {
			System.out.println("출금액: ");
			int withd = scanner.nextInt();
			Account account = accounts.get(ano);
			account.setBalance(account.getBalance() - withd);
			System.out.println("출금 되었습니다.");
		}
	}

}