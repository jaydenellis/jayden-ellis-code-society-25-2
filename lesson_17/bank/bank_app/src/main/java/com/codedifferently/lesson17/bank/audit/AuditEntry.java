package com.codedifferently.lesson17.bank.audit;

import java.time.LocalDateTime;

/**
 * Represents an audit log entry that records a financial transaction. This class follows the Single
 * Responsibility Principle by focusing solely on representing audit information.
 */
public class AuditEntry {

  private final String transactionType;
  private final double amount;
  private final String accountNumber;
  private final LocalDateTime timestamp;
  private final String description;

  /**
   * Creates a new audit entry.
   *
   * @param transactionType The type of transaction (DEBIT, CREDIT).
   * @param amount The transaction amount.
   * @param accountNumber The account number involved.
   * @param description Additional transaction description.
   */
  public AuditEntry(
      String transactionType, double amount, String accountNumber, String description) {
    this.transactionType = transactionType;
    this.amount = amount;
    this.accountNumber = accountNumber;
    this.description = description;
    this.timestamp = LocalDateTime.now();
  }

  /**
   * Gets the transaction type.
   *
   * @return The transaction type.
   */
  public String getTransactionType() {
    return transactionType;
  }

  /**
   * Gets the transaction amount.
   *
   * @return The transaction amount.
   */
  public double getAmount() {
    return amount;
  }

  /**
   * Gets the account number.
   *
   * @return The account number.
   */
  public String getAccountNumber() {
    return accountNumber;
  }

  /**
   * Gets the timestamp of the transaction.
   *
   * @return The timestamp.
   */
  public LocalDateTime getTimestamp() {
    return timestamp;
  }

  /**
   * Gets the transaction description.
   *
   * @return The description.
   */
  public String getDescription() {
    return description;
  }

  @Override
  public String toString() {
    return String.format(
        "[%s] %s: $%.2f on account %s - %s",
        timestamp, transactionType, amount, accountNumber, description);
  }
}
