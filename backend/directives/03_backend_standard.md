# 03_Backend_Standard.md

> **STATUS**: MANDATORY
> **STACK**: PYTHON / FASTAPI

## 1. Core Stack
All backend logic must be implemented in **Python** using **FastAPI**.
*   **Framework**: FastAPI.
*   **Async**: Use `async`/`await` for all I/O.
*   **Validation**: Pydantic v2 (Strict).
*   **ORM**: SQLAlchemy 2.0 (Async) or Tortoise-ORM.
*   **Env**: `python-dotenv`.

## 2. Ultra-Deep Debugging (CRITICAL)
**Visibility is everything.** You must implement a logging system that captures **100% of the context**.

### A. What to Log (Everything)
1.  **Access Logs**: Every single API request must be logged with `Method`, `Path`, `Status`, `Latency`, and `IP`.
2.  **Auth Attempts**:
    *   *Success*: Log User ID and Role.
    *   *Failure*: Log **EXACT REASON** (e.g., "Expired Token", "Invalid Signature", "Missing Header"). Never just "401 Unauthorized".
3.  **Database Context**: Log generated SQL queries in Development mode. Log transaction success/rollback in Production.
4.  **Unhandled Exceptions**: Capture the **FULL STACK TRACE** and specific variable values that caused the crash.

### B. Logging Format (Structured)
Use `structlog` or standard `logging` with JSON formatter.
```json
{
  "level": "ERROR",
  "timestamp": "2026-01-11T12:00:00Z",
  "path": "/api/v1/orders/create",
  "user_id": "cust_123",
  "event": "PaymentGatewayError",
  "reason": "Stripe API declined card",
  "context": { "amount": 500, "currency": "EUR" }
}
```

## 3. Architecture Rules
Keep the codebase modular. Do not dump everything in `main.py`.

```text
Backend/
├── app/
│   ├── api/            # Route handlers
│   │   └── v1/
│   ├── core/           # Config, Security, LOGGING (setup_logging.py)
│   ├── models/         # Database models (SQLAlchemy/Tortoise)
│   ├── schemas/        # Pydantic models (Req/Res)
│   ├── services/       # Business Logic (Complex operations)
│   └── main.py         # App entry point
├── .env
└── requirements.txt
```

## 4. API Standards
1.  **Documentation**: All endpoints must be typed so `/docs` (Swagger) generates automatically.
2.  **Response Handling**:
    *   Use Pydantic models for `response_model`.
    *   Use `HTTPException` for errors (with clear detail messages).
3.  **Dependency Injection**: Use `Depends()` for DB sessions and User Auth.

## 5. Security & Efficiency
1.  **CORS**: Strictly define `allow_origins`.
2.  **Server**: Use `uvicorn` for production.
3.  **Migrations**: Use **Alembic**.
