package com.codedifferently.lesson17.bank;

import com.codedifferently.lesson17.bank.exceptions.InsufficientFundsException;
import java.util.Set;

/** Represents a general bank account. */
public abstract class Account {

    protected final Set<Customer> owners;
    protected final String accountNumber;
    protected double balance;
    protected boolean isActive;

    /**
     * Creates a new account.
     *
     * @param accountNumber The account number.
     * @param owners The owners of the account.
     * @param initialBalance The initial balance of the account.
     */
    public Account(String accountNumber, Set<Customer> owners, double initialBalance) {
        this.accountNumber = accountNumber;
        this.owners = owners;
        this.balance = initialBalance;
        this.isActive = true;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public Set<Customer> getOwners() {
        return owners;
    }

    public double getBalance() {
        return balance;
    }

    public boolean isClosed() {
        return !isActive;
    }

    /** Deposits funds into the account. */
    public void deposit(double amount) {
        if (isClosed()) {
            throw new IllegalStateException("Cannot deposit to a closed account");
        }
        if (amount <= 0) {
            throw new IllegalArgumentException("Deposit amount must be positive");
        }
        balance += amount;
    }

    /** Withdraws funds from the account. */
    public void withdraw(double amount) throws InsufficientFundsException {
        if (isClosed()) {
            throw new IllegalStateException("Cannot withdraw from a closed account");
        }
        if (amount <= 0) {
            throw new IllegalStateException("Withdrawal amount must be positive");
        }
        if (balance < amount) {
            throw new InsufficientFundsException("Account does not have enough funds for withdrawal");
        }
        balance -= amount;
    }

    /** Closes the account if balance is zero. */
    public void closeAccount() {
        if (balance > 0) {
            throw new IllegalStateException("Cannot close account with a positive balance");
        }
        isActive = false;
    }

    @Override
    public int hashCode() {
        return accountNumber.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Account other) {
            return accountNumber.equals(other.accountNumber);
        }
        return false;
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "{"
            + "accountNumber='" + accountNumber + '\''
            + ", balance=" + balance
            + ", isActive=" + isActive
            + '}';
    }
}
