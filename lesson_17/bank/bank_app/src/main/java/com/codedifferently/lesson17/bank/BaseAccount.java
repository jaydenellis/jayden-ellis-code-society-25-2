package com.codedifferently.lesson17.bank;

import com.codedifferently.lesson17.bank.exceptions.InsufficientFundsException;
import java.util.Set;

/**
 * Abstract base class for all bank accounts that provides common functionality. This class follows
 * the Template Method pattern and implements shared behavior while allowing subclasses to define
 * specific account rules.
 */
public abstract class BaseAccount implements Account {

  protected final Set<Customer> owners;
  protected final String accountNumber;
  protected double balance;
  protected boolean isActive;

  /**
   * Creates a new base account.
   *
   * @param accountNumber The account number.
   * @param owners The owners of the account.
   * @param initialBalance The initial balance of the account.
   */
  protected BaseAccount(String accountNumber, Set<Customer> owners, double initialBalance) {
    this.accountNumber = accountNumber;
    this.owners = owners;
    this.balance = initialBalance;
    this.isActive = true;
  }

  @Override
  public String getAccountNumber() {
    return accountNumber;
  }

  @Override
  public Set<Customer> getOwners() {
    return owners;
  }

  @Override
  public void deposit(double amount) throws IllegalStateException {
    if (isClosed()) {
      throw new IllegalStateException("Cannot deposit to a closed account");
    }
    if (amount <= 0) {
      throw new IllegalArgumentException("Deposit amount must be positive");
    }
    balance += amount;
  }

  @Override
  public void withdraw(double amount) throws InsufficientFundsException, IllegalStateException {
    if (isClosed()) {
      throw new IllegalStateException("Cannot withdraw from a closed account");
    }
    if (amount <= 0) {
      throw new IllegalStateException("Withdrawal amount must be positive");
    }
    if (balance < amount) {
      throw new InsufficientFundsException("Account does not have enough funds for withdrawal");
    }

    // Template method - allows subclasses to add additional withdrawal validation
    if (!canWithdraw(amount)) {
      throw new IllegalStateException("Withdrawal not allowed for this account type");
    }

    balance -= amount;
  }

  @Override
  public double getBalance() {
    return balance;
  }

  @Override
  public void closeAccount() throws IllegalStateException {
    if (balance > 0) {
      throw new IllegalStateException("Cannot close account with a positive balance");
    }
    isActive = false;
  }

  @Override
  public boolean isClosed() {
    return !isActive;
  }

  /**
   * Template method that allows subclasses to add additional withdrawal validation. This follows
   * the Open/Closed Principle - open for extension, closed for modification.
   *
   * @param amount The amount to withdraw.
   * @return True if the withdrawal is allowed, false otherwise.
   */
  protected abstract boolean canWithdraw(double amount);

  @Override
  public int hashCode() {
    return accountNumber.hashCode();
  }

  @Override
  public boolean equals(Object obj) {
    if (obj instanceof BaseAccount other) {
      return accountNumber.equals(other.accountNumber);
    }
    return false;
  }

  @Override
  public String toString() {
    return getClass().getSimpleName()
        + "{"
        + "accountNumber='"
        + accountNumber
        + '\''
        + ", balance="
        + balance
        + ", isActive="
        + isActive
        + '}';
  }
}
