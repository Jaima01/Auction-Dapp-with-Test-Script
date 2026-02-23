Auction Dapp with Test-Driven Development
A decentralized application (Dapp) built with Solidity and the Truffle Suite. This project focuses on implementing a "Chinese Auction" system where bidders use a fixed number of tokens to bid on items, and a randomized winner is selected for each item.
Features:
-Self-Registration: Bidders can register themselves to receive 5 bidding tokens.
-Fixed Item Auction: Supports a set of 3 items (indexed 0-2) .
-Transparent Bidding: Users can distribute their 5 tokens across any of the available items.
-Randomized Winner Selection: Uses block-based entropy to select a winner from the pool of tokens for each item .
-Access Control: A beneficiary (owner) is established to prevent unauthorized users from revealing winners.


Technical Stack: 
Language: Solidity (^0.4.17) 
Framework: Truffle 
Blockchain Environment: Ganache / Truffle Develop 
Testing: JavaScript (Mocha/Chai)
