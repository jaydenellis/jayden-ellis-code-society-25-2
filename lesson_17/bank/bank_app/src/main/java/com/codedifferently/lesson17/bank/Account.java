package com.codedifferently.lesson17.bank;

import com.codedifferently.lesson17.bank.exceptions.InsufficientFundsException;
import java.util.Set;

/**
 * Represents a bank account interface that defines common account operations. This interface
 * follows the Interface Segregation Principle by providing only the essential operations that all
 * account types must support.
 */
public interface Account {

  /**
   * Gets the account number.
   *
   * @return The account number.
   */
  String getAccountNumber();

  /**
   * Gets the owners of the account.
   *
   * @return The owners of the account.
   */
  Set<Customer> getOwners();

  /**
   * Deposits funds into the account.
   *
   * @param amount The amount to deposit.
   * @throws IllegalStateException if the account is closed or amount is invalid.
   */
  void deposit(double amount) throws IllegalStateException;

  /**
   * Withdraws funds from the account.
   *
   * @param amount The amount to withdraw.
   * @throws InsufficientFundsException if insufficient funds available.
   * @throws IllegalStateException if the account is closed or amount is invalid.
   */
  void withdraw(double amount) throws InsufficientFundsException, IllegalStateException;

  /**
   * Gets the balance of the account.
   *
   * @return The current account balance.
   */
  double getBalance();

  /**
   * Closes the account.
   *
   * @throws IllegalStateException if the account cannot be closed.
   */
  void closeAccount() throws IllegalStateException;

  /**
   * Checks if the account is closed.
   *
   * @return True if the account is closed, otherwise false.
   */
  boolean isClosed();
}
