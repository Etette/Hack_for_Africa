
// SPDX-License-Identifier: MIT
pragma solidity  0.8.0;

contract GlobalSDG_Projects {
    
    // Define variables for funding goal and current amount raised
    uint256 public fundingGoal;
    uint256 public totalFunds;

    // set minimum amount to contribute
    uint256 public minAmount = 1 ether;

    // Define variable for funding deadline
    uint256 public fundingDeadline;

    string fundingDescription;
    // addresses of all contributors
    address[] public contributors;

    // address of project initiator. also the owner of the crowdfund
    address payable public owner;

    // This mapping will store the contribution amount for each contributor
    mapping(address => uint256) public contributions;

    // Define variable for project completion approval
    mapping(address => bool) public approval;
    mapping(address => bool) public contributed;

     // Define variable for funding goal status
    bool public goalReached = false;

    // Define event for logging contributions
    event Contribution(address indexed contributor, uint256 amount);

    // Define event for logging withdrawals
    event Withdrawal(address indexed recipient, uint256 amount);

    // Constructor function
    constructor(string memory _fundingDescription, uint256 _fundingGoal, uint256 _fundingDeadline) {
        owner = payable(msg.sender);
        fundingGoal = _fundingGoal;
        fundingDeadline = block.timestamp + (_fundingDeadline * 1 minutes);
        fundingDescription = _fundingDescription;
    }

    modifier i_am_a_contributor {
        require(contributed[msg.sender] = true);
        _;
    }
    // Contribute function
    function contribute() public payable {
        require(msg.value > 0, "Contribution must be greater than zero");
        require(block.timestamp <= fundingDeadline, "Funding deadline has passed");
        require(!goalReached, "Funding goal has already been reached");

        // Add contributor to list
        // if (contributions[msg.sender] == 0) {
        //     contributors.push(msg.sender);
        // }

        contributors.push(msg.sender);

        // Add contribution amount to total funds raised
        totalFunds += msg.value;

        // Add contribution amount to contributor's balance
        contributions[msg.sender] += msg.value;
        contributed[msg.sender] = true;

        // Emit the Contribution event
        emit Contribution(msg.sender, msg.value);

        // Check if funding goal has been reached
        if (totalFunds >= fundingGoal) {
            goalReached = true;
            fundingDeadline = 0;
        }
    }

    // Withdraw function for project initiators
    function withdrawFunds() public {
        require(msg.sender == owner, "Only the owner can withdraw funds");
        require(goalReached, "Funding goal has not been reached");
        require(checkApproval(), "Not all contributors have approved project completion");

        // Transfer funds to owner
        payable(owner).transfer(totalFunds);

        // Emit the Withdrawal event
        emit Withdrawal(owner, totalFunds);

        // Reset total funds raised
        totalFunds = 0;
    }

    // Return function for contributors
    function recallContribution() public i_am_a_contributor {
        require(!goalReached, "Funding goal has been reached");
        require(block.timestamp > fundingDeadline, "Funding deadline has not passed");
        require(contributions[msg.sender] > 0, "No contributions to return");

        uint256 contributionAmount = contributions[msg.sender];
        contributions[msg.sender] = 0;
        totalFunds -= contributionAmount;

        // Transfer funds to contributor
        payable(msg.sender).transfer(contributionAmount);

        // Emit the Withdrawal event
        emit Withdrawal(msg.sender, contributionAmount);
    }

    // Approve function for contributors
    function approveCompletion() public i_am_a_contributor {
        require(contributions[msg.sender] > 0, "Must be a contributor to approve project completion");
        approval[msg.sender] = true;
    }

    
    // Check function for project initiators
    function checkApproval() private view returns (bool) {
        for (uint256 i = 0; i < contributors.length; i++) {
            require(contributions[contributors[i]] > 0 && !approval[contributors[i]]);
        }
        return true;
    }

    // Get function for project status
    function getProjectStatus() public view returns (bool, string memory, uint256, uint256, uint256, bool) {
        return (goalReached, fundingDescription, fundingGoal, totalFunds, fundingDeadline, checkApproval());
    }

    // Get function for contributors
    function getContributors() public view returns (address[] memory) {
        return contributors;
    }

    // Get function for contribution amount
    function getContributedAmount(address contributor) public view returns (uint256) {
        return contributions[contributor];
    }

    // Self-destruct function
    function destroy() public {
        require(msg.sender == owner, "Only the owner can self-destruct the contract");
        selfdestruct(owner);
    }
}