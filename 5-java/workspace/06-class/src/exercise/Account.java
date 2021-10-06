package exercise;

public class Account {
	static final int Min_BALANCE = 0;
	static final int MAX_BALANCE = 1000000;

	private int balance = 0;

	void setBalance(int balance) {
		if (balance >= Min_BALANCE && balance <= MAX_BALANCE) {
			this.balance = balance;
		}
	}

	int getBalance() {
		return this.balance;
	}
}
