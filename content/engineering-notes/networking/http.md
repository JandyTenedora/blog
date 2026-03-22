---
title: "HTTP and the Web"
weight: 10
---

> **Source:** *Computer Networking: A Top-Down Approach* (8th ed.) by James F. Kurose and Keith W. Ross (Pearson, 2021), §2.1–2.2. These are personal study notes. All original content is copyright the authors and publisher.

---

## Application architectures

Network applications run on end systems (hosts), not on routers or switches. Two dominant paradigms:

- **Client-server**: always-on server with a fixed, well-known IP address; clients initiate contact. Clients don't talk directly to each other. Examples: Web, email, FTP. Servers live in data centres for scale.
- **Peer-to-peer (P2P)**: no always-on server; arbitrary end systems (peers) talk directly to each other. Self-scaling: each new peer adds capacity as well as load. BitTorrent is the canonical example.

```mermaid
graph LR
    subgraph CS ["Client-Server"]
        SRV["Server (fixed IP, always-on)"]
        C1["Client 1"] -->|request| SRV
        C2["Client 2"] -->|request| SRV
        SRV -->|response| C1
        SRV -->|response| C2
    end

    subgraph P2P ["Peer-to-Peer"]
        P1["Peer 1"] <-->|chunks| P2["Peer 2"]
        P2 <-->|chunks| P3["Peer 3"]
        P3 <-->|chunks| P1
    end
```

---

## Sockets

A **process** is a running program. Two processes on different hosts communicate by sending messages across the network. The process sends and receives through its **socket**, the interface between the application layer and the transport layer.

```mermaid
graph TB
    subgraph HostA ["Host A"]
        APP_A["Application Process"]
        SOCK_A["Socket"]
        TCP_A["TCP / UDP"]
        APP_A <-->|"read / write"| SOCK_A
        SOCK_A <-->|"transport API"| TCP_A
    end

    subgraph HostB ["Host B"]
        APP_B["Application Process"]
        SOCK_B["Socket"]
        TCP_B["TCP / UDP"]
        TCP_B <-->|"transport API"| SOCK_B
        SOCK_B <-->|"read / write"| APP_B
    end

    TCP_A <-->|"Network (IP)"| TCP_B
```

To receive messages, a process needs an address: the **IP address** of the host plus a **port number** identifying the process. Well-known ports: HTTP 80, HTTPS 443, SMTP 25, DNS 53.

---

## TCP vs UDP

**TCP** provides reliable delivery, in-order bytes, flow control (won't overwhelm the receiver), and congestion control (backs off when the network is congested). It's connection-oriented: a three-way handshake before data flows.

**UDP** is connectionless, unreliable, no ordering guarantee, no congestion control. Lighter and faster, useful when dropping a packet is preferable to waiting for a retransmit (VoIP, live video, DNS).

Neither provides encryption natively. **TLS** is built on top of TCP, adding encryption, integrity, and endpoint authentication.

```mermaid
sequenceDiagram
    participant C as Client
    participant S as Server

    Note over C,S: TCP 3-way handshake
    C->>S: SYN (seq=x)
    S->>C: SYN-ACK (seq=y, ack=x+1)
    C->>S: ACK (ack=y+1)
    Note over C,S: Connection open — data flows

    Note over C,S: Teardown (simplified)
    C->>S: FIN
    S->>C: ACK
    S->>C: FIN
    C->>S: ACK
```

---

## HTTP

The **HyperText Transfer Protocol** is the Web's application-layer protocol. It runs over TCP.

**Stateless**: the server stores no state about the client between requests. If a client requests the same object twice, the server re-serves it with no memory of the first request. This simplifies server design enormously; cookies solve the statelessness at the application layer when needed.

### Persistent vs non-persistent connections

**Non-persistent (HTTP/1.0):** one TCP connection per object. Cost per object: **2 RTTs + transmission time** (1 RTT for TCP handshake, 1 RTT for the HTTP request and first byte of response).

**Persistent (HTTP/1.1 default):** the server leaves the TCP connection open after responding. With pipelining, the client sends all requests back-to-back and responses stream back, roughly 1 RTT for the whole page after the initial handshake.

```mermaid
sequenceDiagram
    participant C as Client
    participant S as Server

    rect rgba(100, 160, 255, 0.1)
        Note over C,S: Non-persistent — 2 RTTs per object
        C->>S: TCP SYN
        S->>C: TCP SYN-ACK
        C->>S: GET /index.html
        S->>C: 200 OK (index.html)
        Note over C,S: connection closed
        C->>S: TCP SYN (new connection)
        S->>C: TCP SYN-ACK
        C->>S: GET /image.png
        S->>C: 200 OK (image.png)
    end

    rect rgba(80, 220, 140, 0.1)
        Note over C,S: Persistent + pipelining — 1 RTT after handshake
        C->>S: TCP SYN
        S->>C: TCP SYN-ACK
        C->>S: GET /index.html
        S->>C: 200 OK (index.html)
        C->>S: GET /image1.png
        C->>S: GET /image2.png
        S->>C: 200 OK (image1.png)
        S->>C: 200 OK (image2.png)
    end
```

### Request format

```
GET /somedir/page.html HTTP/1.1\r\n
Host: www.example.com\r\n
Connection: close\r\n
User-Agent: Mozilla/5.0\r\n
\r\n
```

Structure: **request line** (method + URL + version) + **header lines** + **blank line** (`\r\n`) + optional **body**.

The blank line is mandatory and signals end of headers. A missing `\r\n` silently breaks parsing, the server won't know where headers end.

**Methods:** `GET` (retrieve, no body), `POST` (submit data in body), `HEAD` (headers only, no body), `PUT` (upload), `DELETE`.

### Response format

```
HTTP/1.1 200 OK\r\n
Content-Length: 6821\r\n
Content-Type: text/html\r\n
\r\n
<html>...</html>
```

**Common status codes:**

| Code | Meaning |
|------|---------|
| 200 OK | Success, object in body |
| 301 Moved Permanently | Redirect; new URL in `Location:` header |
| 304 Not Modified | Conditional GET: object unchanged, no body sent |
| 400 Bad Request | Server couldn't parse the request |
| 404 Not Found | Object doesn't exist |
| 505 HTTP Version Not Supported | |

---

## Cookies

HTTP is stateless, but websites want to identify users. Cookies use four components:

1. `Set-Cookie:` header in an HTTP response
2. `Cookie:` header in subsequent HTTP requests
3. A cookie file on the user's machine, managed by the browser
4. A back-end database at the website

On first visit, the server creates a unique ID, stores it in its database, and sends `Set-Cookie: 1678` in the response. The browser appends `Cookie: 1678` to every subsequent request to that site. The server looks up 1678 and knows it's you.

---

## Web caches (proxy servers)

A **web cache** has its own disk storage and sits between clients and origin servers. Browsers are configured to send all requests through it. If the cache has a fresh copy, it returns it directly; otherwise it fetches from origin, stores a copy, and forwards it.

Benefits: lower response time for clients (cache is closer), reduced traffic on the access link. CDNs are geographically distributed networks of web caches.

**Conditional GET:** the cache includes `If-Modified-Since: <date>` in its request to origin. If the object hasn't changed, the server returns `304 Not Modified` with no body, saving bandwidth. If it has changed, `200 OK` with the new object.

---

## Key takeaways

- HTTP is stateless, ASCII-based, runs over TCP.
- The blank line (`\r\n`) separating headers from body is mandatory, and missing it silently breaks parsing.
- Persistent connections + pipelining reduce page load time to roughly 1 RTT after the TCP handshake.
- Cookies add a layer of state on top of the stateless protocol.
- Web caches reduce latency and access-link traffic; conditional GET (`304 Not Modified`) avoids re-fetching unchanged objects.
