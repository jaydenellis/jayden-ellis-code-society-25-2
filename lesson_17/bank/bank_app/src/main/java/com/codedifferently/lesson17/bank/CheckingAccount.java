package com.codedifferently.lesson17.bank;

import java.util.Set;

/**
 * Represents a checking account that allows all types of withdrawals including checks. This class
 * extends BaseAccount and follows the Liskov Substitution Principle.
 */
public class CheckingAccount extends BaseAccount {

  /**
   * Creates a new checking account.
   *
   * @param accountNumber The account number.
   * @param owners The owners of the account.
   * @param initialBalance The initial balance of the account.
   */
  public CheckingAccount(String accountNumber, Set<Customer> owners, double initialBalance) {
    super(accountNumber, owners, initialBalance);
  }

  /**
   * Checking accounts allow all types of withdrawals including checks. This implements the template
   * method from BaseAccount.
   *
   * @param amount The amount to withdraw.
   * @return Always true for checking accounts as they have no withdrawal restrictions.
   */
  @Override
  protected boolean canWithdraw(double amount) {
    return true; // Checking accounts allow all withdrawals
  }
}
