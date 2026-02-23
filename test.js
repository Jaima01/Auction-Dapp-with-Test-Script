let Auction = artifacts.require("./Auction.sol");

let auctionInstance;

contract('AuctionContract', function (accounts) {
  //accounts[0] is the default account
  //Test case 1
  it("Contract deployment", function() {
    return Auction.deployed().then(function (instance) {
      auctionInstance = instance;
      assert(auctionInstance !== undefined, 'Auction contract should be defined');
    });
  });

  //Sample Test Case
  it("Should set bidders", function() {
    return auctionInstance.register({from:accounts[1]}).then(function(result) {
        return auctionInstance.getPersonDetails(0);
    }).then(function(result) {
      assert.equal(result[2], accounts[1], 'bidder address set');
    })
  });

  //Test Case for checking if the bid is more than the token amount
  it("Should NOT allow to bid more than remaining tokens", function() {
    // TASK 1: Call bid with 6 tokens (User only has 5)
    return auctionInstance.bid(0, 6, {from: accounts[1]})
    .then(function (result) {
      throw("Failed to check remaining tokens less than count");
    }).catch(function (e) {
      var a = e.toString();
      if(e === "Failed to check remaining tokens less than count") {
        // TASK 2: If we reached the 'then' block, the contract failed to revert.
        assert(false);
      } else {
        // TASK 3: If we reached the 'catch' block with a revert error, the test passes.
        assert(true);
      }
    })
  });

  //Modifier Checking
  it("Should NOT allow non owner to reveal winners", function() {
    // TASK 4: Call revealWinners from account 1 (Not the owner)
     return auctionInstance.revealWinners({from: accounts[1]})
     .then(function (instance) {
       throw("Failed to check owner in reveal winners");
     }).catch(function (e) {
       if(e === "Failed to check owner in reveal winners") {
         // TASK 5: The call should have failed; if it reached 'then', assert false.
         assert(false);
       } else {
         // TASK 6: The contract successfully reverted the unauthorized call.
         assert(true);
       }
     })
   })

  it("Should set winners", function() {
    // TASK 7: Register account 2
    return auctionInstance.register({from: accounts[2]})
    .then(function(result) {
      // TASK 8: Register account 3
        return auctionInstance.register({from: accounts[3]});
    }).then(function() {
      // TASK 9: Register account 4
        return auctionInstance.register({from: accounts[4]});
    }).then(function() {
      // TASK 10: Bid 5 tokens on item 0 from account 2
        return auctionInstance.bid(0, 5, {from: accounts[2]});
    }).then(function() {
      // TASK 11: Bid 5 tokens on item 1 from account 3
        return auctionInstance.bid(1, 5, {from: accounts[3]});
    }).then(function() {
      // TASK 12: Bid 5 tokens on item 2 from account 4
        return auctionInstance.bid(2, 5, {from: accounts[4]});
    }).then(function() {
      // TASK 13: Authorized owner (account 0) calls revealWinners
        return auctionInstance.revealWinners({from: accounts[0]});
    }).then(function() {
      // TASK 14: Get winner of item 0
        return auctionInstance.winners(0);
    }).then(function(result) {
      // TASK 15: Assert winner is not the empty address
      assert.notEqual(result, '0x0000000000000000000000000000000000000000', 'Winner of item 0 should be set');
      // TASK 16: Get winner of item 1
      return auctionInstance.winners(1);
    }).then(function(result) {
      // TASK 17: Assert winner of item 1 is set
      assert.notEqual(result, '0x0000000000000000000000000000000000000000', 'Winner of item 1 should be set');
      // TASK 18: Get winner of item 2
      return auctionInstance.winners(2);
    }).then(function(result) {
      // TASK 19: Assert winner of item 2 is set
      assert.notEqual(result, '0x0000000000000000000000000000000000000000', 'Winner of item 2 should be set');
    })
  });
});