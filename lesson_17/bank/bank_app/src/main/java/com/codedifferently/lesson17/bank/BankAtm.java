package com.codedifferently.lesson17.bank;

import com.codedifferently.lesson17.bank.audit.TransactionObserver;
import com.codedifferently.lesson17.bank.exceptions.AccountNotFoundException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

/** Represents a bank ATM that supports multiple account types and audit logging. */
public class BankAtm {

  private final Map<UUID, Customer> customerById = new HashMap<>();
  private final Map<String, Account> accountByNumber = new HashMap<>();
  private final List<TransactionObserver> observers = new ArrayList<>();

  /** Adds a transaction observer for audit logging. */
  public void addObserver(TransactionObserver observer) {
    if (observer != null && !observers.contains(observer)) {
      observers.add(observer);
    }
  }

  /** Removes a transaction observer. */
  public void removeObserver(TransactionObserver observer) {
    observers.remove(observer);
  }

  /** Notifies all observers about a transaction. */
  private void notifyObservers(
      String transactionType, double amount, String accountNumber, String description) {
    for (TransactionObserver observer : observers) {
      observer.onTransaction(transactionType, amount, accountNumber, description);
    }
  }

  /**
   * Adds an account to the bank. This method now accepts any Account type, supporting both
   * CheckingAccount and SavingsAccount while maintaining backward compatibility.
   *
   * @param account The account to add.
   */
  public void addAccount(CheckingAccount account) {
    accountByNumber.put(account.getAccountNumber(), account);
    account
        .getOwners()
        .forEach(
            owner -> {
              customerById.put(owner.getId(), owner);
            });
  }

  /**
   * Adds a savings account to the bank. This overloaded method allows adding SavingsAccount objects
   * while maintaining the same public interface.
   *
   * @param account The savings account to add.
   */
  public void addAccount(SavingsAccount account) {
    accountByNumber.put(account.getAccountNumber(), account);
    account
        .getOwners()
        .forEach(
            owner -> {
              customerById.put(owner.getId(), owner);
            });
  }

  /**
   * Finds all accounts owned by a customer.
   *
   * @param customerId The ID of the customer.
   * @return The unique set of accounts owned by the customer.
   */
  public Set<CheckingAccount> findAccountsByCustomerId(UUID customerId) {
    return customerById.containsKey(customerId)
        ? customerById.get(customerId).getAccounts()
        : Set.of();
  }

  /**
   * Deposits funds into an account using cash.
   *
   * @param accountNumber The account number.
   * @param amount The amount to deposit.
   */
  public void depositFunds(String accountNumber, double amount) {
    try {
      Account account = getAccountOrThrow(accountNumber);
      account.deposit(amount);
      notifyObservers("CREDIT", amount, accountNumber, "Cash deposit");
    } catch (Exception e) {
      notifyObservers("CREDIT", amount, accountNumber, "Failed: " + e.getMessage());
      throw e;
    }
  }

  /**
   * Deposits funds into an account using a check. This method validates that the account supports
   * check transactions.
   *
   * @param accountNumber The account number.
   * @param check The check to deposit.
   * @throws IllegalStateException if the account doesn't support check transactions.
   */
  public void depositFunds(String accountNumber, Check check) {
    try {
      Account account = getAccountOrThrow(accountNumber);

      // Check if account supports check transactions (Open/Closed Principle)
      if (account instanceof SavingsAccount savingsAccount
          && !savingsAccount.supportsCheckTransactions()) {
        throw new IllegalStateException("Savings accounts do not support check transactions");
      }

      // For checking accounts or accounts that support checks, proceed with deposit
      if (account instanceof CheckingAccount checkingAccount) {
        check.depositFunds(checkingAccount);
        notifyObservers("CREDIT", 0.0, accountNumber, "Check deposit: " + check.toString());
      } else {
        throw new IllegalStateException("Account type does not support check deposits");
      }
    } catch (Exception e) {
      notifyObservers("CREDIT", 0.0, accountNumber, "Failed check deposit: " + e.getMessage());
      throw e;
    }
  }

  /**
   * Withdraws funds from an account using cash.
   *
   * @param accountNumber The account number.
   * @param amount The amount to withdraw.
   */
  public void withdrawFunds(String accountNumber, double amount) {
    try {
      Account account = getAccountOrThrow(accountNumber);
      account.withdraw(amount);
      notifyObservers("DEBIT", amount, accountNumber, "Cash withdrawal");
    } catch (Exception e) {
      notifyObservers("DEBIT", amount, accountNumber, "Failed: " + e.getMessage());
      throw e;
    }
  }

  /**
   * Gets an account by its number or throws an exception if not found.
   *
   * @param accountNumber The account number.
   * @return The account.
   */
  private Account getAccountOrThrow(String accountNumber) {
    Account account = accountByNumber.get(accountNumber);
    if (account == null || account.isClosed()) {
      throw new AccountNotFoundException("Account not found");
    }
    return account;
  }
}
