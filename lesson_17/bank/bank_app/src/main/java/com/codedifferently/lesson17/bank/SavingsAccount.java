package com.codedifferently.lesson17.bank;

import java.util.Set;

/**
 * Represents a savings account that functions like a checking account but doesn't allow check
 * withdrawals. This class follows the Liskov Substitution Principle by extending BaseAccount and
 * maintaining behavioral compatibility while adding specific restrictions.
 */
public class SavingsAccount extends BaseAccount {

  /**
   * Creates a new savings account.
   *
   * @param accountNumber The account number.
   * @param owners The owners of the account.
   * @param initialBalance The initial balance of the account.
   */
  public SavingsAccount(String accountNumber, Set<Customer> owners, double initialBalance) {
    super(accountNumber, owners, initialBalance);
  }

  /**
   * Savings accounts allow cash withdrawals but should not allow check withdrawals. This implements
   * the template method from BaseAccount to enforce savings account rules.
   *
   * <p>Note: This method validates the withdrawal type through the context of how it's called.
   * Direct withdrawals (cash) are allowed, but check withdrawals should be prevented at the ATM
   * level by not calling withdraw for check operations on savings accounts.
   *
   * @param amount The amount to withdraw.
   * @return Always true for direct withdrawals (cash withdrawals through ATM).
   */
  @Override
  protected boolean canWithdraw(double amount) {
    // Savings accounts allow direct cash withdrawals
    // Check withdrawal prevention is handled at the ATM level
    return true;
  }

  /**
   * Checks if this account supports check transactions. This method helps the BankAtm determine if
   * check operations are allowed.
   *
   * @return False, as savings accounts don't support check transactions.
   */
  public boolean supportsCheckTransactions() {
    return false;
  }
}
