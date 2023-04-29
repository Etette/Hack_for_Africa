// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Define the smart contract
contract RecyclingContract {

    // Define the variables
    address public owner;
    mapping(address => uint256) public recyclingCounts;
    mapping(address => uint256) public rewards;
    mapping(address => bool) public redeemed;
    uint256 public rewardThreshold = 100;
    uint256 public maxReward = 100;
    
    // Define the exchange rate
    uint256 public exchangeRate;

    // Define the event for recording point swap transactions
    event rewardsSwapped(address indexed user, uint256 swapAmount, uint256 etherAmount);

    // Define the events
    event RewardRedeemed(address indexed user, uint256 rewardAmount);

    // Define the constructor function
    constructor() {
        owner = msg.sender;
    }

    // Define the function for recycling items
    function recycleItems(uint256 itemCount) public {
        require(itemCount > 0 && itemCount <= 10, "You must recycle between 1 and 10 items.");
        require(!redeemed[msg.sender], "You have already redeemed your rewards.");

        // Check for potential integer overflow
        require(recyclingCounts[msg.sender] + itemCount >= recyclingCounts[msg.sender], "Integer overflow error.");

        // Add the number of items to the recycling count for the user
        recyclingCounts[msg.sender] += itemCount;

        // If the user has recycled enough items, award them tokens
        if (recyclingCounts[msg.sender] >= rewardThreshold) {
            uint256 rewardAmount = 10;
            require(rewards[msg.sender] + rewardAmount <= maxReward, "You have reached the maximum reward amount.");
            rewards[msg.sender] += rewardAmount;
            recyclingCounts[msg.sender] -= rewardThreshold;
        }
    }

    // Define the function for redeeming rewards
    function redeemRewards() public {
        require(rewards[msg.sender] > 0 && !redeemed[msg.sender], "You have no rewards to redeem or have already redeemed your rewards.");

        // Prevent reentrancy attacks
        redeemed[msg.sender] = true;

        // Transfer the rewards to the user
        uint256 rewardAmount = rewards[msg.sender];
        rewards[msg.sender] = 0;
        emit RewardRedeemed(msg.sender, rewardAmount);
        payable(msg.sender).transfer(rewardAmount);
    }

    // // Define the function for destroying the contract
    // function destroy() public {
    //     require(msg.sender == owner, "Only the contract owner can destroy the contract.");
    //     selfdestruct(payable(owner));
    // }

    
    // Define the function for exchanging points for ether
    function swapRewardForEther(uint256 swapAmount) public payable {
        require(swapAmount > 0, "reward amount must be greater than 0.");
        require(rewards[msg.sender] >= swapAmount, "You do not have enough points to make this exchange.");

        // Calculate the amount of ether to transfer
        uint256 etherAmount = swapAmount / exchangeRate;

        require(msg.value >= etherAmount, "Insufficient ether sent.");

        // Deduct the points from the user's account
        rewards[msg.sender] -= swapAmount;

        // Transfer the ether to the user's wallet
        (bool success,) = payable(msg.sender).call{value: etherAmount}("");
        require(success, "Failed to send ether to user.");

        // Record the transaction
        emit rewardsSwapped(msg.sender, swapAmount, etherAmount);

        // Notify the user that the exchange has been completed
        // ...
    }

      // Define a function for the owner to update the exchange rate
    function setExchangeRate(uint256 _exchangeRate) public {
        //require(msg.sender == owner(), "Only the contract owner can update the exchange rate.");
        require(_exchangeRate > 0, "Exchange rate must be greater than 0.");
        exchangeRate = _exchangeRate;
    }

    // Define a function for the owner to withdraw ether from the contract
    function withdrawEther(uint256 amount) public {
        require(msg.sender == owner, "Only the contract owner can withdraw ether.");
        require(address(this).balance >= amount, "Insufficient balance in contract.");
        payable(msg.sender).transfer(amount);
    }

    // Define a function to get the balance of ether in the contract
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // function() payable {}
    receive() external payable {}
}
