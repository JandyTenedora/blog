---
title: "Data Representation: Integers, Floats, and Endianness"
weight: 30
---

> **Source:** *Computer Systems: A Programmer's Perspective* (3rd ed.) by Randal E. Bryant and David R. O'Hallaron (Pearson, 2015), Chapter 2. These are personal study notes. All original content is copyright the authors and publisher.

---

## Everything is bytes

Computers use the **byte** (8 bits) as the smallest addressable unit. A running program views memory as a large array of bytes — the **virtual address space** — where every byte has a unique address.

**Hexadecimal** is the shorthand: one hex digit represents 4 bits, so one byte = two hex digits (0x00–0xFF).

**Word size** determines pointer size and the maximum addressable memory:

| Word size | Pointer size | Theoretical address space |
|-----------|-------------|--------------------------|
| 32-bit | 4 bytes | 4 GB |
| 64-bit | 8 bytes | 16 exabytes |

Modern systems are 64-bit. Any pointer — `void *` in C, or any pointer in Go — is 8 bytes.

**Data type sizes on 64-bit Linux:**

| C type | Go equivalent | Size |
|--------|--------------|------|
| `char` | `byte` / `int8` | 1 byte |
| `short` | `int16` | 2 bytes |
| `int` | `int32` | 4 bytes |
| `long` | `int64` | 8 bytes |
| `float` | `float32` | 4 bytes |
| `double` | `float64` | 8 bytes |
| pointer | pointer | 8 bytes |

---

## Byte ordering (endianness)

When a multi-byte value is stored in memory, which byte goes at the lowest address?

- **Little-endian** (x86, modern ARM): least-significant byte at the lowest address. `0x01234567` is stored as `67 45 23 01` in memory.
- **Big-endian** (network byte order): most-significant byte first. Same value stored as `01 23 45 67`.

Where this matters:
- **Network programming**: the Internet uses big-endian. In C, use `htons()`/`htonl()` to convert. In Go, use `encoding/binary.BigEndian`.
- **Binary file formats**: each format specifies its own byte order.
- **Debugging**: memory dumps on x86 look byte-reversed for multi-byte values.

---

## Integer representations

### Unsigned integers

A w-bit unsigned value has range [0, 2^w − 1]. The bit pattern is interpreted as a straightforward binary number:

```
4-bit unsigned: 1011 = 1×2³ + 0×2² + 1×2¹ + 1×2⁰ = 8 + 0 + 2 + 1 = 11
```

### Two's complement (signed integers)

The most significant bit (MSB) is the **sign bit**, with weight −2^(w−1) instead of +2^(w−1):

```
4-bit two's complement:
  1011 = (−1×2³) + 0×2² + 1×2¹ + 1×2⁰ = −8 + 2 + 1 = −5
  0110 = ( 0×2³) + 1×2² + 1×2¹ + 0×2⁰ =  0 + 4 + 2 =  6
```

Range for w-bit two's complement: [−2^(w−1), 2^(w−1) − 1]

For `int32`: [−2,147,483,648, +2,147,483,647]

Note the **asymmetry**: one more negative value than positive. `math.MinInt32` has no positive counterpart — negating it overflows back to itself.

**Why two's complement?** Addition is identical for both signed and unsigned — the CPU uses the *same adder circuit*. The sign bit's negative weight is the only difference.

### The same bits, different values

```
Bit pattern:  1111 1111 1111 1111 1111 1111 1111 1111  (32 bits)

As uint32:   4,294,967,295  (2³² − 1)
As int32:    −1
As float32:  NaN
```

**The bits carry no inherent meaning. The type is the contract.** Static typing means the compiler enforces that contract at compile time — a value typed as `int32` cannot be passed where `uint32` is expected without an explicit conversion. Dynamic typing defers this to runtime.

### Sign extension

When widening a signed integer (`int8` → `int32`), fill the new high-order bits with copies of the sign bit:

```
int8  −5:  1111 1011
int32 −5:  1111 1111  1111 1111  1111 1111  1111 1011
           ──────────────────────────────────
           sign bit replicated across new positions
```

For unsigned widening: zero-extend (fill with 0s). Different rule, same result.

---

## Integer arithmetic

### Unsigned: modular wraparound

w-bit addition discards any carry out from bit w — this is modular arithmetic:

```
Result = (a + b) mod 2^w

4-bit example: 12 + 5 = 17, but 17 mod 16 = 1
   1100  (12)
 + 0101  (5)
 ──────
  10001  → discard carry → 0001 = 1
```

**Overflow detection for unsigned:** `result < a`.

### Two's complement: overflow changes sign

```
4-bit: 6 + 7, but max positive is 7 (0111)
  0110  (+6)
+ 0111  (+7)
──────
  1101  = −3 in two's complement  ← positive overflow, wrong sign
```

- Positive overflow (two large positives): result wraps to negative
- Negative overflow (two large negatives): result wraps to positive

In Go, signed integer overflow is defined as two's complement wraparound. In C it is undefined behaviour.

### Shifts as fast multiply/divide

| Expression | Effect | Cost |
|------------|--------|------|
| `x << k` | x × 2^k | 1 cycle |
| `x >> k` (unsigned) | x ÷ 2^k, truncate toward 0 | 1 cycle |
| `x >> k` (signed) | x ÷ 2^k, round toward −∞ | 1 cycle |
| `x * y` | multiply | ~3 cycles |
| `x / y` | divide | 20–90 cycles |

Compilers automatically replace `x * 8` with `x << 3`.

---

## Floating point (IEEE 754)

```
float32 (single precision) — 32 bits:
  ┌─────┬──────────────────┬──────────────────────────────┐
  │  s  │  exponent (8 b)  │       fraction (23 b)        │
  └─────┴──────────────────┴──────────────────────────────┘
   bit 31      bits 30–23               bits 22–0

float64 (double precision) — 64 bits:
  ┌─────┬──────────────────────┬──────────────────────────────────┐
  │  s  │  exponent (11 b)     │         fraction (52 b)          │
  └─────┴──────────────────────┴──────────────────────────────────┘
```

**Value formula:** (−1)^s × M × 2^E

For normalised values: M = 1.fraction (the leading 1 is implied), E = exponent field − bias (127 for float32, 1023 for float64).

**Special values (exponent field = all 1s):**

| Fraction field | Meaning |
|----------------|---------|
| all zeros | ±∞ |
| non-zero | NaN (Not a Number) |

NaN propagates — any arithmetic involving NaN returns NaN. `NaN != NaN` is `true`.

### Decimal fractions cannot be represented exactly

```
0.1 in binary = 0.00011001100110011...  (infinite repeating)
```

```go
fmt.Println(0.1 + 0.2 == 0.3)  // false
fmt.Println(0.1 + 0.2)         // 0.30000000000000004
```

**Never compare floats with `==`.** Use an epsilon comparison:
```go
const epsilon = 1e-9
math.Abs(a - b) < epsilon
```

### Floating point is not associative

```
(1e20 + (-1e20)) + 3.14  =  0 + 3.14  =  3.14
 1e20 + (-1e20 + 3.14)   =  1e20 + (-1e20)  ≈  0.0   // catastrophic cancellation
```

This is why compilers cannot freely reorder float expressions for optimisation.

---

## Key takeaways

- Everything in memory is bytes. A **type** is a contract about how to interpret those bytes.
- Static typing enforces that contract at compile time; dynamic typing defers it to runtime.
- **Two's complement**: MSB has weight −2^(w−1). The same adder circuit works for signed and unsigned. Asymmetric range — one more negative value than positive.
- `0xFFFFFFFF` = 4,294,967,295 as `uint32`, = −1 as `int32`, = NaN as `float32`. Same bits, three different values.
- **Unsigned overflow**: defined, wraps modularly. **Signed overflow in Go**: defined, wraps two's complement. In C: undefined behaviour.
- Sign-extend when widening signed integers; zero-extend for unsigned.
- **IEEE 754**: most decimals are not exactly representable. Never use `==` on floats. Not associative.
- Endianness matters at boundaries: network I/O and binary file parsing.
