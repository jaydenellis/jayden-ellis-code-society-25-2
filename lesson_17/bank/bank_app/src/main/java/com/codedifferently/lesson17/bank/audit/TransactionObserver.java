package com.codedifferently.lesson17.bank.audit;

/**
 * Interface for objects that can observe and log account transactions. This interface follows the
 * Observer pattern and Dependency Inversion Principle by defining an abstraction that the ATM can
 * depend on without knowing specific implementation details.
 */
public interface TransactionObserver {

  /**
   * Called when a transaction occurs on an account.
   *
   * @param transactionType The type of transaction (DEBIT, CREDIT).
   * @param amount The transaction amount.
   * @param accountNumber The account number involved.
   * @param description Additional transaction description.
   */
  void onTransaction(
      String transactionType, double amount, String accountNumber, String description);
}
