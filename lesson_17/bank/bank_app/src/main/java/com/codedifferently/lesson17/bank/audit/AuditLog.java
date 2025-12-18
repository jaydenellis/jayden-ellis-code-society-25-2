package com.codedifferently.lesson17.bank.audit;

import java.util.ArrayList;
import java.util.List;

/**
 * AuditLog class that records all account transactions. This class implements the
 * TransactionObserver interface and follows the Single Responsibility Principle by focusing solely
 * on logging.
 */
public class AuditLog implements TransactionObserver {

  private final List<AuditEntry> entries = new ArrayList<>();

  /**
   * Records a transaction in the audit log.
   *
   * @param transactionType The type of transaction (DEBIT, CREDIT).
   * @param amount The transaction amount.
   * @param accountNumber The account number involved.
   * @param description Additional transaction description.
   */
  @Override
  public void onTransaction(
      String transactionType, double amount, String accountNumber, String description) {
    AuditEntry entry = new AuditEntry(transactionType, amount, accountNumber, description);
    entries.add(entry);
  }

  /**
   * Gets all audit entries.
   *
   * @return A copy of all audit entries.
   */
  public List<AuditEntry> getEntries() {
    return new ArrayList<>(entries);
  }

  /**
   * Gets audit entries for a specific account.
   *
   * @param accountNumber The account number to filter by.
   * @return List of audit entries for the specified account.
   */
  public List<AuditEntry> getEntriesForAccount(String accountNumber) {
    return entries.stream()
        .filter(entry -> entry.getAccountNumber().equals(accountNumber))
        .toList();
  }

  /**
   * Gets the total number of recorded transactions.
   *
   * @return The number of transactions.
   */
  public int getTransactionCount() {
    return entries.size();
  }

  /** Clears all audit entries. This method is primarily for testing purposes. */
  public void clear() {
    entries.clear();
  }
}
