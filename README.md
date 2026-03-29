# ROSEN Micro-Task Agent 🤖
## Bridging the Global Talent Gap with AI-Driven Trust & Instant Settlement
ROSEN Micro-Task Agent is a decentralized workforce orchestration protocol built for the AgentKit Hackathon. We enable seamless micro-task collaboration across borders, specifically targeting emerging markets in LatAm, Africa, and South East Asia.

## 🚩 The Problem: The "Borders" of Micro-Tasking
Today’s micro-task platforms are fundamentally broken for global collaboration. Most existing solutions are confined to local activities and services. Why?
1. Language Barriers: High friction in cross-border communication and instruction.
2. Payment Friction: Traditional banking and PayPal are slow, expensive, or unavailable in emerging markets.
3. Trust & Bot-Farming: Without proof-of-personhood, platforms are plagued by Sybil attacks, leading to low-quality data for brands.

## 💡 Our Solution: ROSEN Micro-Task Agent
Architecture Overview (Flowchart)

graph LR
    A[User] --> B{World ID Verify}
    B -- Human --> C[AgentKit Logic]
    C --> D[XMTP Communication]
    D -- Negotiation --> E[x402 Settlement]
    E --> F[Instant Payout]



Flow Description:

User initiates a task.

World ID (IDKit) verifies "Proof of Personhood".

AgentKit (Logic) orchestrates the mission matching.

XMTP (Comm) handles encrypted A2A negotiation and translation.

Coinbase x402 (Settlement) executes the autonomous revenue split.

We’ve built an autonomous AI Agent infrastructure that removes these barriers using a triple-stack of Web3 technologies:
### 1. Proof of Personhood (World ID)
To ensure high-quality data and prevent bot-farming, ROSEN integrates World ID. Only Verified Humans can access premium task pools. This gives global brands the confidence that their tasks are being completed by real people, not scripts.
### 2. Autonomous Negotiation & Translation (XMTP + AgentKit)
Communication is handled by Agent-to-Agent (A2A) interaction via XMTP.
- The Brain: Powered by Coinbase AgentKit, your personal agent finds, negotiates, and accepts tasks on your behalf.
- The Bridge: Built-in AI Translation within the XMTP channel allows a recruiter in Latin America to seamlessly collaborate with a contributor in South East Asia.
### 3. Instant Revenue Sharing (Coinbase x402)
We solve the payment barrier by utilizing the Coinbase x402 protocol for autonomous, on-chain settlement.
- Zero-Friction: No withdrawal requests or bank delays.
- Automatic Split: Upon task completion, the payment is instantly split (e.g., 90% to the User / 10% to ROSEN Protocol Fee) directly on-chain.
  
## 🛠 Tech Stack
- World ID (IDKit): Sybil-resistance gateway.
- XMTP: Encrypted A2A communication & real-time notification layer.
- Coinbase AgentKit: Managing user wallets and orchestrating task logic.
- Coinbase x402: Multi-party revenue sharing and instant USDC settlement on Base.

## 🚀 The User Journey
1. Verify: User verifies their human status via World ID.
2. Match: The Agent negotiates the best-paying tasks globally via XMTP.
3. Work: User completes the task with real-time AI translation support.
4. Earn: Funds are instantly distributed via x402—no middleman, no wait.
